/*
The numbers values for timezoneShift is in seconds from UTC calculate that to get the time zones

Add more of the json responce to the webpage. The ones that dont match with NOAA add to the bottom
Look into pagation, changing pages to se emore content. 

I am still working out the dotenv to hide my API key for the implementation of search by city. 

*/
import React from 'react';
import AppMode from "./../AppMode";
import axios from "axios";

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
            forecastPeriods:[],
        };
    }
    componentDidMount = () => {
        this.getCurrentWeather();
        //this.getFiveDayForecast();
    }

    getCurrentWeather = async () => {
        const response = await fetch(`https://api.weather.gov/points/${this.state.latitude},${this.state.longitude}`);
        const data = await response.json();
        const forecastLink = data.properties.forecast;
        const forecastResponce = await fetch(forecastLink);
        const forecastData = await forecastResponce.json();

        this.setState({
            city: data.properties.relativeLocation.properties.city,
            state: data.properties.relativeLocation.properties.state,
            forecast: forecastData.properties.periods[0],
            forecastPeriods: forecastData.properties.periods,
            temperature: forecastData.properties.periods[0].temperature,
            windDirection: forecastData.properties.periods[0].windDirection,
            windSpeed: forecastData.properties.periods[0].windSpeed,
            shortForecast: forecastData.properties.periods[0].shortForecast,
            forecastHourly: forecastData.properties.periods[0],
            hourlyPeriods: forecastData.properties.periods,
            units: forecastData.properties.units,
            updated: forecastData.properties.updated,
        })
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
        this.getCurrentWeather();
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

        const { forecast } = this.state;
        if (!forecast) {
            return <div>No data available.....</div>
        }
        return (
            <div>
                <div><p>More Information:</p></div>
                <div class='navOptions'>
                    {/* Conditionally render the forecast and hourly when selected make sure to load new page */}
                    <div class='navOptionsTop-but' type="submit" onClick={this.handleTodayClick}>TODAY&nbsp;</div>
                    <div class='navOptionsTop-but' type="submit" onClick={this.handlehourlyClick}>HOURLY&nbsp;</div>
                    <div class='navOptionsTop-but' type="submit" onClick={this.handleDailyClick }>DAILY&nbsp;</div>
                    <div class='navOptionsTop-but' type="submit" onClick={this.handleRadarClick}>RADAR&nbsp;</div>
                </div>
                <div class="tCity" >
                    {/*add the current weather ICON and curr temp*/}
                    <b>Current conditions at </b>
                    <h1> {this.state.city}, {this.state.state}</h1>
                    <h6>Lat: {this.state.latitude} Lon: {this.state.longitude}</h6>
                    <h2>Today's High {this.state.temperature} °F</h2>
                    {/*<p>add Celcius units and move the short forecast above temp</p>*/}
                    <h4> {this.state.shortForecast} </h4>
                    <h5>Wind Speed: {this.state.windSpeed} {this.state.windDirection} </h5>
                    {/*<h5>units: {this.state.units}  </h5>*/}
                    {/* <h5>Updated: {this.state.updated}  </h5>*/}
                    <h4> {this.state.timestamp} </h4>
                </div>
                <div className='subHeader'>
                    <h4>Extended Forecast for</h4>
                    <h3> {this.state.city}, {this.state.state}</h3>
                </div>
                <div class="ExFo-container ">
                    <div className="forecast-card-container">
                        {this.state.forecastPeriods.map((period) => (
                            <div key={period.number} className="forecast-card">
                                <p>  {period.icon && <img src={period.icon} alt="Weather Icon" />}</p>
                                <h2>{period.name}</h2>
                                <p>{period.shortForecast}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div class="card">
                    <div className='subHeader'>
                        <h2>Detailed Forecast</h2>
                    </div>
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
            const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' +
                data + '&appid=efac9c071bf33433694d3860d9d1b6f1');
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