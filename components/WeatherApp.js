class WeatherForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {latitude: this.props.latitude,
                     longitude: this.props.longitude,
                };
    }
    componentDidMount = () => {
        this.getForecast();
    }
    getForecast = async() => {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+
         this.state.latitude + '&lon=' +
         this.state.longitude + '&appid=26a5f25cabf9b11d8b970976611bc138');
         const currentWea = await response.json();
         this.setState({place: currentWea.name,
                        retrieved: (new Date()).toLocaleDateString() + " at " + (new Date().toLocaleTimeString()),
                        conditions: currentWea.weather[0].description,
                        //Celsius is given from subtracting Kelvins from retrieved data
                        temp: Math.round(currentWea.main.temp - 273.15),                        
                        humidity: currentWea.main.humidity,
                        wind: currentWea.wind.speed,
                        windUnits: (currentWea.wind * 2.237),
                        barometer: currentWea.main.pressure,
                        //dewpoint: currentWea.main.
                        //visibility: currentWea.weather.visibility,
                        visibility: currentWea.visibility,
                        visibilityUnits: "Meters",
                        timeZone: currentWea.timezone
                        });
    } 
toggleUnits = () => {
        if(this.state.tempUnit == "F") {
            this.setState({tempUnit: "C", temp: Math.round((this.state.temp - 32) * 5/9)});
        } else {
            this.setState({tempUnit: "F", temp: Math.round((this.state.temp *9/5) + 32)});
        }
    }
    convertUnitsF = () => {
        this.setState({tempUnit: "F", temp: Math.round((this.state.temp *9/5) + 32)});
        {this.state.tempUnit};
    }
    render() {
        return (
            <div>
                <h4>Current conditions at </h4> 
                <h2> {this.state.place}</h2>
                <h6>Lat: {this.state.latitude} Lon: {this.state.longitude}</h6>           
                <h5>{this.state.conditions}</h5>
                <h3>{(this.state.temp *9/5) + 32} F</h3>
                <h5>{this.state.temp} C</h5>
                <h6>Humidity {this.state.humidity}%</h6>
                <h6>Wind Speed {this.state.wind} MPH</h6>
                <h6>Barometer {this.state.barometer} </h6>
                <h6>Visibility {this.state.visibility + " " + this.state.visibilityUnits}</h6>
                <h6>Wind Chill </h6>
                <h6><i>Last Updated on {this.state.retrieved}</i></h6>
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
        this.state = {station: null};
    }
    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(this.getLocSuccess,this.getLocError);
    }
    getLocSuccess = (position) => {
        this.setState({station: {lat: position.coords.latitude, long: position.coords.longitude}});       
    }
    getLocError = (err) => {
        this.setState({station: {lat: 46.26955, long: 119.11813}});
    }
    render() {
        if(this.state.station != null) {
            return (
            <div id="main">
                <div align="center" className="jumbotron">
                    <WeatherForecast latitude={this.state.station.lat} longitude={this.state.station.long} />
                </div>
            </div>
            );
            } else { 
                return null;
             }
    }
}

ReactDOM.render(
<CurrentWeather />,
document.getElementById('root')
);