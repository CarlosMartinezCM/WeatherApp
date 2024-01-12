/*
The numbers values for timezoneShift is in seconds from UTC calculate that to get the time zones

Add more of the json responce to the webpage. The ones that dont match with NOAA add to the bottom
Look into pagation, changing pages to se emore content. 

I am still working out the dotenv to hide my API key for the implementation of search by city. 

*/
import React from 'react';
import AppMode from "./../AppMode";
import axios from "axios";
require('dotenv').config();

class WeatherForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            showForecast: "",
            forecastUrl: "",
            hourlyUrl: "",
            now: new Date(),
            forecastPeriods: [],
            station: null,
            icon: null,
        };
    }
    componentDidMount = () => {
        this.getWeatherForecast();
    }

    // Function to ensure that the state has updated after the first API call. 
    componentDidUpdate(prevProps, prevState) {
        if (prevState.stationIdentifier !== this.state.stationIdentifier) {
            this.getCurrentObservations();
        }
    }

    //This function will make an API call to the NOAA API weather service and fetch forecast data
    getWeatherForecast = async () => {
        const response = await fetch(`https://api.weather.gov/points/${this.state.latitude},${this.state.longitude}`);
        const data = await response.json();
        const forecastLink = data.properties.forecast;
        const forecastResponce = await fetch(forecastLink);
        const forecastData = await forecastResponce.json();
        const obs = data.properties.observationStations;
        const observationResponce = await fetch(obs);
        const observationData = await observationResponce.json();

        this.setState({
            city: data.properties.relativeLocation.properties.city,
            state: data.properties.relativeLocation.properties.state,
            station: data.properties.cwa,
            gridX: data.properties.gridX,
            gridY: data.properties.gridY,
            gridId: data.properties.gridId,
            forecast: forecastData.properties.periods[0],
            forecastPeriods: forecastData.properties.periods,
            temperature: forecastData.properties.periods[0].temperature,
            temperatureUnit: forecastData.properties.periods[0].temperatureUnit,
            isDaytime: forecastData.properties.periods[0].isDaytime,
            windDirection: forecastData.properties.periods[0].windDirection,
            windSpeed: forecastData.properties.periods[0].windSpeed,
            shortForecast: forecastData.properties.periods[0].shortForecast,
            forecastHourly: forecastData.properties.periods[0],
            units: forecastData.properties.units,
            updated: forecastData.properties.updated,
            stationIdentifier: observationData.features[0].properties.stationIdentifier,
        })


        //this.getCurrentObservations(); 
    }

    getCurrentObservations = async () => {

        try {
            const response = await fetch(`https://api.weather.gov/stations/${this.state.stationIdentifier}/observations/latest`);
            const data = await response.json();

            this.setState({
                textDescription: data.properties.textDescription,
                temp: data.properties.temperature.value,
                icon: data.properties.icon,
                elev: data.properties.elevation.value,
                unitCode: data.properties.elevation.unitCode[8],
                relativeHumidity: data.properties.relativeHumidity.value,
                windSpeed: data.properties.windSpeed.value,
                barometricPressure: data.properties.barometricPressure.value,
                dewpoint: data.properties.dewpoint.value,
                //visibility is in meters need to convert it
                visibility: data.properties.visibility.value,
                //WindChill is in C need to convert it
                windChill: data.properties.windChill.value,
                //Timestamp needs to be converted
                timestamp: data.properties.timestamp,
            });
        } catch (error) {
            console.error('Error fetching current observations:', error);
        }
        // console.log('is daytime',this.state.isDaytime);
    }

    toggleUnits = () => {
        if (this.state.tempUnit === "F") {
            this.setState({ tempUnit: "C", temp: Math.round((this.state.temp - 32) * 5 / 9) });
        } else {
            this.setState({ tempUnit: "F", temp: Math.round((this.state.temp * 9 / 5) + 32) });
        }
    }
    convertUnitsF = () => {
        this.setState({ tempUnit: "F", temp: Math.round((this.state.temp * 9 / 5) + 32) });
        // { this.state.tempUnit };
    }
    //Udate the current weather conditions
    updateWeather = async () => {
        this.getWeatherForecast();
        //alert("updating weather");
    }

    handleChange = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.WEATHER);
    }

    handleForecastClick = async () => {
        try {
            this.setState({ loading: true });
            const response = await axios.get(this.state.forecastUrl);
            const forecastData = response.data;
            this.setState({ forecastData, loading: false });
        } catch (error) {
            this.setState({ error, loading: false });
        }
    };
    handlehourlyClick = async () => {
        try {
            this.setState({ loading: true });
            const response = await axios.get(this.state.hourlyUrl);
            const hourlyData = response.data;
            this.setState({ hourlyData, loading: false });
        } catch (error) {
            this.setState({ error, loading: false });
        }
    };

    handleTodayClick = async () => {
        alert("Alert Today");
    };

    handlehourlyClick = async () => {

        alert("Alert Hourly");
    };


    handleDailyClick = async () => {

        alert("Alert Daily");
    };

    handleRadarClick = async () => {
        alert("Alert Radar");
    };

    render() {
        const { icon } = this.state;
        const { forecast } = this.state;
        if (!forecast) {
            return <div>No data available. Please refresh the page!</div>
        }
        return (
            <div>
                <div class="current-heading">
                    <b>Current conditions at </b>
                    <div class="current-City">
                        <h2> {this.state.city}, {this.state.state} ({this.state.stationIdentifier})</h2>
                    </div>
                    <div class="lat-lon-elev">
                        <span>Lat: {this.state.latitude}°N</span>
                        <span>Lon: {this.state.longitude}°W</span>
                        <span>Elev: {this.state.elev} {this.state.unitCode}</span>
                    </div>
                </div>
                <div class='navOptions'>
                    {/* Conditionally render the forecast and hourly when selected make sure to load new page */}
                    <div class='navOptionsTop-but' type="submit" onClick={this.handleTodayClick}>TODAY&nbsp;</div>
                    <div class='navOptionsTop-but' type="submit" onClick={this.handlehourlyClick}>HOURLY&nbsp;</div>
                    <div class='navOptionsTop-but' type="submit" onClick={this.handleDailyClick}>DAILY&nbsp;</div>
                    <div class='navOptionsTop-but' type="submit" onClick={this.handleRadarClick}>RADAR&nbsp;</div>
                </div>
                <div class="currentData" >
                    <div class="temp-container">
                        <div>
                            {icon && <img src={icon} alt="Weather Icon" />}
                        </div>
                        <div>
                            <div class="temp-description-font">
                                <p> {this.state.textDescription} </p>
                            </div>
                            <div class="locationDatafahrenheit">
                                <p> {Math.round((this.state.temp * 9 / 5) + 32)} °F</p>
                            </div >
                            <div class="temp-celcius-font">
                                <div class="locationDataCelcius">
                                    <p> {this.state.temp} °C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="center-current-data">
                        <div class="center-data-item">
                            <strong>Humidity:</strong> {Math.round(this.state.relativeHumidity)}
                        </div>
                        <div class="center-data-item">
                            <strong>Wind Speed:</strong> {this.state.windSpeed}
                        </div>
                        <div class="center-data-item">
                            <strong>Barometer:</strong> {this.state.barometricPressure}
                        </div>
                        <div class="center-data-item">
                            <strong>Dewpoint:</strong> {this.state.dewpoint}
                        </div>
                        <div class="center-data-item">
                            <strong>Visibility:</strong> {this.state.visibility}
                        </div>
                        <div class="center-data-item">
                            <strong>Wind Direction:</strong> {this.state.windDirection}
                        </div>
                        <div class="center-data-item">
                            <strong>Last updated:</strong> {this.state.timestamp}
                        </div>
                    </div>
                </div>
                <div className="Extended-Forecast-header">
                    <div class="ext-fore">
                        <p>Extended Forecast for</p>
                        <div class="ext-city-name">
                            <p> {this.state.city}, {this.state.state}</p>
                        </div>
                    </div>
                </div>
                {/* Render the forecast by mapping the periods */}
                <div class="ExFo-container ">
                    <div className="forecast-card-container">
                        {this.state.forecastPeriods.slice(0, 8).map((period, index) => (
                            <div key={period.number} className="periodItem">
                                <p>{period.name}</p>
                                <p>  {period.icon && <img src={period.icon} alt="Weather Icon" />}</p>
                                <p>{period.shortForecast}</p>
                                {/* Conditionally check if it is daytime or night time to get the High or Low temperature*/}
                                {period.isDaytime ? (
                                    <div>
                                        <p>High {period.temperature} °{period.temperatureUnit}</p>
                                    </div>) : (
                                    <p>Low {period.temperature} °{period.temperatureUnit}</p>)}
                                <p></p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Render the detailed forecast by mapping the periods */}
                <div class="card">
                    <div className='subHeader'>
                        <h2>Detailed Forecast</h2>
                    </div>
                    {/* Conditionally set each period to display in different colors */}
                    {this.state.forecastPeriods.map((period, index) => (
                        <div key={period.number}
                            className={index % 2 === 0 ? 'even-item' : 'odd-item'} >
                            <div>
                                <h2>{period.name}</h2>
                                <p>{period.detailedForecast}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div class="card">
                    <div class="footer">
                        <div className='modalFooter'>
                        </div>
                    </div>
                    <h6><i>Last Updated on </i></h6>
                    <p>{this.state.now.toString()}</p>
                    <p class="centered">version 3.0</p>
                </div>
            </div>

        );
    }
}

//Weather App, note if trying to run react-dom.development.js:82 
//Warning: The tag <currentWeather> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
//in currentWeather
class CurrentWeather extends React.Component {

    constructor(props) {
        super(props);
        this.citySearch = React.createRef();
        this.state = {
            searchButton: "Seach",
            station: null
        };
    }

    componentDidMount = () => {
        //Get users location if allowed
        navigator.geolocation.getCurrentPosition(this.getLocSuccess, this.getLocError);
    }
    //If the user allows to get location, the weather is set to the users current GeoLocation position. 
    getLocSuccess = (position) => {

        this.setState({ station: { lat: position.coords.latitude, lon: position.coords.longitude } });
    }
    //This fucntion is called if the user denies to give their current Geolocation and initializes the default location. 
    getLocError = (err) => {
        this.setState({ station: { lat: 46.26955, lon: -119.11813 } });
    }
    //This function is called when the user wants to search by city. Working on hiding the APIkey. 
    searchLocation = async () => {
        var data = this.citySearch.current.value;
        if (data != null) {
            this.setState({ station: null });
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=` +
                data + `&appid=${process.env.REACT_APP_API_KEY}`);
            const currentStation = await response.json();
            if (currentStation != null && currentStation.hasOwnProperty('coord')) {
                this.setState({ station: { lat: currentStation.coord.lat, lon: currentStation.coord.lon } });
            } else { alert("no station for this loation"); }
        }
    }
    //Instantiating WeatherForecast components in CurrentWeather to pass in functions as props
    //To implement the hourly I should create another page using an api to retrieve that info and display the hourly info
    //or try doing what weather channel does and 
    render() {
        if (this.state.station != null) {
            return (
                <div id="main">
                    <div class="cardSearch" align="left" >
                        <form >
                            <input
                                ref={this.citySearch}
                                type="text"
                                id="cName"
                                name="cName"
                                placeholder="Enter City name" />
                            <button
                                type="submit"
                                class="btn-color-theme" onClick={this.searchLocation} >
                                <span id="login-btn-icon" className={this.state.searchButton} />&nbsp;{this.state.searchButton}
                            </button>
                        </form>
                    </div>
                    <div class="card" >
                        <WeatherForecast latitude={this.state.station.lat} longitude={this.state.station.lon} />
                    </div>

                </div>
            );
        } else {
            return null;
        }
    }
}

export default CurrentWeather;