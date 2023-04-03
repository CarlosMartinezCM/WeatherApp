/*
The numbers values for timezoneShift is in seconds from UTC calculate that to get teh time zones

Add more of the json responce to the webpage. The ones that dont match with NOAA add to the bottom
Look into pagation, changing pages to se emore content. 

*/
import React from 'react';

class WeatherForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: this.props.latitude,
            longitude: this.props.longitude
        };
    }
    componentDidMount = () => {
        this.getCurrentWeather();
        //this.getFiveDayForecast();
    }

    getCurrentWeather = async () => {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' +
            this.state.latitude + '&lon=' +
            this.state.longitude + '&appid=26a5f25cabf9b11d8b970976611bc138');
        const currentWea = await response.json();
        this.setState({
            place: currentWea.name,
            country: currentWea.sys.country,
            retrieved: (new Date()).toLocaleDateString() + " at " + (new Date().toLocaleTimeString()),
            conditions: currentWea.weather[0].description,
            //Celsius is given from subtracting Kelvins from retrieved data
            temp: Math.round(currentWea.main.temp - 273.15),
            windChill: Math.round(currentWea.main.feels_like - 273.15),
            humidity: currentWea.main.humidity,
            wind: currentWea.wind.speed,
            windUnits: (currentWea.wind * 2.237),
            barometer: currentWea.main.pressure,
            visibility: currentWea.visibility,
            visibilityUnits: "Meters",
            timeZone: currentWea.timezone
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
    }

    render() {

        return (
            <div>
                <div class="card">
                    <div class="header">
                        <p>Home</p>
                    </div>
                </div>
            <div>
                <div class="card" >
                    <div class="tCity" >
                        <b>Current conditions at </b>
                        <h2> {this.state.place}, {this.state.country}</h2>
                        <h6>Lat: {this.state.latitude} Lon: {this.state.longitude}</h6>
                    </div>
                </div>
                <div class="card" >
                    <div class="currWeatherLeft" >
                        <h5>{this.state.conditions}</h5>
                        <h3>{(this.state.temp * 9 / 5) + 32}&deg;&nbsp; F</h3>
                        <h5>{this.state.temp}&deg;&nbsp; C</h5>
                        <div class="currWeatherCenter">
                            <h6>Humidity {this.state.humidity}%</h6>
                            <h6>Wind Speed {this.state.wind} MPH</h6>
                            <h6>Barometer {this.state.barometer} </h6>
                            <h6>Visibility {this.state.visibility + " " + this.state.visibilityUnits}</h6>
                            <h6>Feels Like {(this.state.windChill * 9 / 5) + 32}&deg;&nbsp; C</h6>
                            <h6><i>Last Updated on {this.state.retrieved}</i></h6>
                            <div class="centered"><input class="button" id="refresh" type="button" value="refresh" onClick={this.updateWeather} /></div>

                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="footer">
                        <p>About</p>
                    </div>
                    <p class="centered">version 2</p>
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