/*
The numbers values for timezoneShift is in seconds from UTC calculate that to get teh time zones

Add more of the json responce to the webpage. The ones that dont match with NOAA add to the bottom
Look into pagation, changing pages to se emore content. 
*/
import React from 'react';
import AppMode from "./../AppMode.js";
import 'dotenv/config';
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
            
        };
    }
    componentDidMount = () => {
        this.getCurrentWeather();
    }

    getCurrentWeather = async () => {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' +
            this.state.latitude + '&lon=' +
            this.state.longitude + '&appid=' + process.env.OPENWEATHERMAP_API_KEY);
        const data = await response.json();
        //const obsLink = data.properties.forecastGridData;
       // const obsResponce = await fetch(obsLink);
        //const obsData = await obsResponce.json();

        this.setState({
            location: data.name,
            temp: Math.round( data.main.temp - 273.15),
            
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
    updateWeather = () => {
        this.getCurrentWeather();
        alert("updating weather");
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

    handleRadarClick = async () => {
        alert("Alert Radar");
    };

    render() {

        const { forecast, forecastData, hourlyData,  } = this.state;
        if (forecast) {
            return <div>No data available.....</div>
        }
        return (
            <div>
                <div>
                    <div align="center">
                        <button onClick={this.handleTodayClick}>TODAY</button>
                        <button onClick={this.handlehourlyClick}>HOURLY</button>
                        <button onClick={this.handleForecastClick}>DAILY</button>
                        <button onClick={this.handleRadarClick}>RADAR</button>
                    </div>
                    <div class="card" >
                        <div class="tCity" >
                            <b>Current conditions at </b>
                            <h1> {this.state.location}, {this.state.state}</h1>
                            <h6>Lat: {this.state.latitude} Lon: {this.state.longitude}</h6>
                            <h2>timestamp: {this.state.timestamp}</h2>
                            <h2>{this.state.temp} °F</h2>
                            <h4> {this.state.shortForecast} </h4>
                            <h5>Wind Speed: {this.state.windSpeed} {this.state.windDirection} </h5>
                        </div>
                        <h6><i>Last Updated on </i></h6>
                        <p>{this.state.now.toString()}</p>
                    </div>
                    <div class="centered"><input class="button" id="refresh" type="button" value="refresh" onClick={this.updateWeather} /></div>
                    <div>
                        {/* Conditionally render the forecast */}
                        {forecastData && (
                            <div>
                                <h3>DAILY</h3>
                                <div class="forecast-card">
                                    {this.state.forecastPeriods.map((period) => (
                                        <div key={period.number}>
                                            <h2>{period.name}</h2>
                                            <p>{period.detailedForecast}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Conditionally render the forecast */}
                    {hourlyData && (
                        <div class="Fcard">
                            <h2>Hourly Forecast</h2>
                            {this.state.hourlyPeriods.map((period) => (
                                <div key={period.number}>
                                    <h6>Humidity {period.relativeHumidity.value}</h6>
                                    <h4>{period.temperature}</h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div class="card">
                    <div class="footer">
                    </div>
                    <p class="centered">version 3.1</p>
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
    //Called when user searches for a city 
    searchLocation = async () => {
        var data = this.citySearch.current.value;
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        if (data != null) {
            this.setState({ station: null });
            const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' +
                data + process.env.OPENWEATHERMAP_API_KEY);
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
                    <div class="cardSearch" align="center" >
                        <form >
                            <input
                                ref={this.citySearch}
                                type="text"
                                id="cName"
                                name="cName"
                                placeholder="Enter City name" />
                            <button
                                type="submit"
                                className="btn-color-theme" onClick={this.searchLocation} >
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


 /* const forecastLink = data.properties.forecast;
        const forecastResponce = await fetch(forecastLink);
        const forecastData = await forecastResponce.json();

        this.setState({
            city: data.properties.relativeLocation.properties.city,
            state: data.properties.relativeLocation.properties.state,
            stationName: data.properties.gridId,
            timestamp: data.properties.observationStations.timestamp,
            forecast: forecastData.properties.periods[0],
            forecastPeriods: forecastData.properties.periods,
            temperature: forecastData.properties.periods[0].temperature,
            windDirection: forecastData.properties.periods[0].windDirection,
            windSpeed: forecastData.properties.periods[0].windSpeed,
            shortForecast: forecastData.properties.periods[0].shortForecast,
            forecastHourly: forecastData.properties.periods[0],
            hourlyPeriods: forecastData.properties.periods,
        }) */
