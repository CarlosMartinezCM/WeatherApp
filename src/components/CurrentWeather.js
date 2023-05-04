/*
The numbers values for timezoneShift is in seconds from UTC calculate that to get teh time zones

Add more of the json responce to the webpage. The ones that dont match with NOAA add to the bottom
Look into pagation, changing pages to se emore content. 

*/
import React from 'react';
import AppMode from "./../AppMode";

class WeatherForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            now: new Date()
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
            forecastPeriods: forecastData.properties.periods
        })

        const stationLink = data.properties.forecast;
        const currentResponce = await fetch(stationLink);
        const temperaturedata = await currentResponce.json();
        
        this.setState({
            temperature: temperaturedata.properties.periods[0].temperature,
            windDirection: temperaturedata.properties.periods[0].windDirection,
            windSpeed: temperaturedata.properties.periods[0].windSpeed,
            shortForecast: temperaturedata.properties.periods[0].shortForecast
            
        });
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
        //alert("updating weather");
    }

    handleChange = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.HOMEPAGE);
    }

    render() {
        
        const { forecast  } = this.state;
        if (!forecast) {
            return <div>No data available.....</div>
        }
        return (
            <div>
                <div>
                    <div class="card" >
                        <div class="tCity" >
                            <b>Current conditions at </b>
                            <h1> {this.state.city}, {this.state.state}</h1>
                            <h6>Lat: {this.state.latitude} Lon: {this.state.longitude}</h6>
                            <h2>{this.state.temperature} °F</h2>
                            <h4> {this.state.shortForecast} </h4>
                            <h5>Wind Speed: {this.state.windSpeed} {this.state.windDirection} </h5>
                            <h4> {this.state.timestamp} </h4>
                        </div>
                        <h6><i>Last Updated on </i></h6>
                       <p>{this.state.now.toString()}</p>
                                <div class="centered"><input class="button" id="refresh" type="button" value="refresh" onClick={this.updateWeather} /></div>
                    </div>
                    
                    <div class="card.container">
                        <div class="forecast-card">
                            {this.state.forecastPeriods.map((period) => (
                                <div key={period.number}>
                                    <h2>{period.name}</h2>
                                    <p>{period.detailedForecast}</p>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                    <div class="card">
                        <div class="footer">
                            <p>About</p>
                        </div>
                        <p class="centered">version 2.1</p>
                    </div>
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
        if (data != null) {
            this.setState({ station: null });
            const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' +
                data + '&appid=26a5f25cabf9b11d8b970976611bc138');
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
                    <div class="card">
                        <div class="header">
                            <button>
                                <span role="button" className="button"
                                    onClick={this.props.homePage} >&nbsp;Home</span>
                            </button>
                        </div>
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

/* 


const HourlyLink = data.properties.forecastHourly;
        const hourlyResponce = await fetch(HourlyLink);
        const hourlyData = await hourlyResponce.json();

        this.setState({
            forecastHourly: hourlyData.properties.periods[0],
            hourlyPeriods: hourlyData.properties.periods
        })

<div>
                <div>
                    <div class="card" >
                        <div class="tCity" >
                            <b>Current conditions at </b>
                            <h2> {this.state.city}, {this.state.state}</h2>
                            <h6>Lat: {this.state.latitude} Lon: {this.state.longitude}</h6>
                        </div>
                    </div>
                    <div class="card.container">
                        <div class="Fcard">
                            {this.state.forecastPeriods.map((period) => (
                                <div key={period.number}>
                                    <h2>{period.name}</h2>
                                    <p>{period.detailedForecast}</p>
                                </div>
                            ))}
                        </div>
                        <div class="Fcard">
                            <h2>Hourly Forecast</h2>
                            {this.state.hourlyPeriods.map((period) => (
                                <div key={period.number}>
                                    <h6>Humidity {period.relativeHumidity.value}</h6>
                                    <h4>{period.temperature}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div class="card">
                        <div class="footer">
                            <p>About</p>
                        </div>
                        <p class="centered">version 2.1</p>
                    </div>
                </div>
            </div>
    /**
      <div class="currWeatherCenter">
                                    <h6>Humidity {this.state.humidity}%</h6>
                                    <h6>Wind Speed {this.state.wind} MPH</h6>
                                    <h6>Barometer {this.state.barometer} </h6>
                                    <h6>Visibility {this.state.visibility + " " + this.state.visibilityUnits}</h6>
                                    <h6>Feels Like {(this.state.windChill * 9 / 5) + 32}&deg;&nbsp; C</h6>
                                    <h6><i>Last Updated on {this.state.retrieved}</i></h6>
                                    <div class="centered"><input class="button" id="refresh" type="button" value="refresh" onClick={this.updateWeather} /></div>
    
                                </div> 
    **/
