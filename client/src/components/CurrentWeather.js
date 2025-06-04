/*
****Author: Carlos Martinez
*/
import React from 'react';
import AppMode from "./../AppMode";
import Modal from 'react-modal';
import ImageModal from './ImageModal.js';

require('dotenv').config();
const apiKey = process.env.REACT_APP_API_KEY;

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
            icon: ' ',
            modalOpen: false,
            hourlyModalOpen: false,
            showAlertModal: false,
            modalData: {
                description: '',
                instruction: '',
                area: ''
            },
            modalIsOpen: false,
            baseImageUrl: 'https://radar.weather.gov/ridge/standard/',
            gifRadar: '',
            errorMessage: '',
            modalVisible: false, // Initialize modal visibility to false
        };
        // Set the app element in the constructor
        Modal.setAppElement('#root'); // This is required for accessibility, to hide other content when the modal is open
    }

    showAlertModal = (description, instruction, area) => {
        this.setState({
            showModal: true,
            modalData: {
                description,
                instruction,
                area
            }
        });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };
    componentDidMount = () => {
        this.getWeatherForecast();

    }

    // Function to ensure that the state has updated after the first API call. 
    componentDidUpdate(prevProps, prevState) {
        if (prevState.stationIdentifier !== this.state.stationIdentifier) {
            this.getCurrentObservations();
            this.getWarningAlerts();
            const { baseImageUrl } = this.state;
            const gifRadar = `${baseImageUrl}K${this.state.station}_loop.gif`;
            this.setState({ gifRadar });
        }

    }

    //This function will make an API call to the NOAA API weather service and fetch forecast data
    getWeatherForecast = async () => {
        try {
            const response = await fetch(`https://api.weather.gov/points/${this.state.latitude},${this.state.longitude}`);
            const data = await response.json();

            const forecastLink = data.properties.forecast;
            const forecastResponce = await fetch(forecastLink);
            const forecastData = await forecastResponce.json();

            const obs = data.properties.observationStations;
            const observationResponce = await fetch(obs);
            const observationData = await observationResponce.json();

            const zone = data.properties.forecastZone;
            const zoneResponce = await fetch(zone);
            const zoneData = await zoneResponce.json();

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
                //zoneData: data.properties.forecastZone,
                warnzone: zoneData.properties.id,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({
                errorMessage: 'Error fetching weather data. Please refresh the page or try again later.',
            });
        }
    }

    //This function will make an API call to the NOAA API weather service and fetch current observation data
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
                visibility: data.properties.visibility.value,
                windChill: data.properties.windChill.value,
                timestamp: data.properties.timestamp,
            });
        } catch (error) {
            console.error('Error fetching current observations:', error);
        }

    }

    getWarningAlerts = async () => {
        try {
            const response = await fetch(`https://api.weather.gov/alerts/active/zone/${this.state.warnzone}`);
            const data = await response.json();

            this.setState({
                area: data.features[0].properties.areaDesc,
                event: data.features[0].properties.event,
                headline: data.features[0].properties.headline,
                description: data.features[0].properties.description,
                instruction: data.features[0].properties.instruction,
            });
        } catch (error) {
        }
    }

    getRadar = async () => {
        try {
            const response = await fetch(`https://api.weather.gov/alerts/active/zone/${this.state.station}`);
            const data = await response.json();

            this.setState({
                area: data.features[0].properties.areaDesc,
                event: data.features[0].properties.event,
                headline: data.features[0].properties.headline,
                description: data.features[0].properties.description,
                instruction: data.features[0].properties.instruction,
            });
        } catch (error) {
        }
    }

    //Toggle units from F to C, not yet implemented.    
    toggleUnits = () => {
        if (this.state.tempUnit === "F") {
            this.setState({ tempUnit: "C", temp: Math.round((this.state.temp - 32) * 5 / 9) });
        } else {
            this.setState({ tempUnit: "F", temp: Math.round((this.state.temp * 9 / 5) + 32) });
        }
    }
    //convert the timestamp to a readable format before rendering
    formatTimestamp = (timestamp) => {
        const timestampUTC = new Date(timestamp);
        const formattedTimestamp = timestampUTC.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZoneName: 'short',
            timeZone: 'America/Los_Angeles',
        });
        return formattedTimestamp;
    };
    //Udate the current weather conditions
    updateWeather = async () => {
        this.getWeatherForecast();
        // alert("updating weather");
    }
    // handleAlertClick = (description, instruction, area) => {
    //     this.setState({
    //         alertDescription: description,
    //         alertInstruction: instruction,
    //         alertArea: area,
    //         modalIsOpen: true,
    //     });
    // };
    handleForecastClick = (tempF, tempU, unitF, shortF) => {
        this.setState({
            forecastTemp: tempF,
            forecastTempUnit: tempU,
            forecastUnit: unitF,
            shortForecast: shortF,
            modalIsOpen: true,
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false,
            modalIsOpen: false
        });

    };

    handleCloseImageModal = () => {
        this.setState({ modalVisible: false });
    }

    handleImageClick = () => {
        this.setState({ modalVisible: true });
    }
    //adding weather alerts, if true display, else skip
    render() {
        const { icon, modalVisible, forecast, gifRadar } = this.state;

        if (!forecast) {
            return <div>{this.state.errorMessage && <p>{this.state.errorMessage}</p>}</div>
        }
        const formattedTimestamp = this.formatTimestamp(this.state.timestamp);

        // Function to split description into sentences
        const splitDescriptionIntoSentences = (description) => {
            return description.split(/[.!?]+/).filter(Boolean);
        };
        return (
            <div className="globalMedia">
                <div className="weatherAlerts">
                    <h3>{this.state.event}</h3>
                    <div className="warnZone">
                        <p> {this.state.errorMessage && <p>{this.state.errorMessage}</p>} </p>
                    </div>
                    <div>
                        <div className="alertText" onClick={() => this.showAlertModal(this.state.description, this.state.instruction, this.state.area)}>
                            <p> {this.state.headline}</p>
                        </div>
                        {/* Modal component for the Alerts */}
                        <Modal
                            isOpen={this.state.showModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Weather Alerts Modal"
                            className="customModalContent"
                        >
                            {/* Modal Header */}
                            <div className="modalHeader">
                                <h2>Alert Details</h2>
                                <button onClick={this.closeModal}>Close</button>
                            </div>

                            {/* Modal Body */}
                            <div className="modalBody">
                                <div className="alertModal">
                                    <p><strong>Area:</strong></p>
                                    <ul>
                                        {this.state.modalData.area.split(';').map((area, index) => (
                                            <li key={index}>{area.trim()}</li>
                                        ))}
                                    </ul>
                                    <p><strong>Description:</strong></p>
                                    {splitDescriptionIntoSentences(this.state.modalData.description).map((sentence, index) => (
                                        <p key={index}>{sentence}</p>
                                    ))}
                                    <p><strong>Instruction:</strong></p>
                                    <p>{this.state.modalData.instruction}</p>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="modalFooter">
                                <button onClick={this.closeModal}>Close</button>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className='ForecastOptions'>
                    <div className="ModalForecastText" onClick={() => this.handleForecastClick(this.state.temperature, this.state.temperatureUnit, this.state.icon, this.state.shortForecast)}>
                        <p>7 Day Forecast</p>
                    </div>
                    {/*************** 7 Day Forecast Modal component **********************/}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="7 Day forecast Modal"
                        className="customModalContent"
                    >
                        {/* Forecast Modal Styles  */}
                        <button onClick={this.closeModal}>Close Modal</button>
                        <div className="forecast-card-container">
                            {this.state.forecastPeriods.map((period, index) => (
                                <div key={period.number} className="periodItem">
                                    <p>{period.name}</p>
                                    <p>  {period.icon && <img src={period.icon} alt="Weather Icon" />}</p>
                                    <p>{period.shortForecast}</p>
                                    {/* Conditionally check if it is daytime or night time to get the High or Low temperature*/}
                                    {period.isDaytime ? (
                                        <div>
                                            <p>High: {period.temperature} °{period.temperatureUnit}</p>
                                        </div>) : (
                                        <p>Low: {period.temperature} °{period.temperatureUnit}</p>)}
                                    <p></p>
                                </div>
                            ))}
                        </div>
                    </Modal>
                </div>
                <div className='currentWeatherContainer'>
                    <div className="current-heading">
                        <b>Current conditions at </b>
                        <div className="current-City">
                            <h2> {this.state.city}, {this.state.state} ({this.state.stationIdentifier})</h2>
                        </div>
                        <div class="lat-lon-elev">
                            <span>Lat: {this.state.latitude}°N</span>
                            <span>Lon: {this.state.longitude}°W</span>
                            <span>Elev: {Math.round((this.state.elev * 3.28084).toFixed(2))} ft. {/*this.state.unitCode*/}</span>
                        </div>
                    </div>
                    <div class="currentData">
                        <div class="temp-container">
                            <div>
                                {icon && <img src={icon} alt="Weather Icon" />}
                            </div>
                            <div class="text-descriptionContainer">
                                <div>
                                    <p>{this.state.textDescription}</p>
                                </div>
                                <div class="temp-description-font">
                                    <p class="locationDatafahrenheit">{Math.round((this.state.temp * 9 / 5) + 32)}°F</p>
                                </div>
                                <p class="locationDataCelcius">{Math.round(this.state.temp)}°C</p>
                            </div>
                        </div>
                        <div class="center-current-data">
                            <div class="center-data-item">
                                <strong>Humidity:</strong> {Math.round(this.state.relativeHumidity)}%
                            </div>
                            <div class="center-data-item">
                                <strong>Wind Speed:</strong> {this.state.windDirection} {(Math.round(this.state.windSpeed * .621371))} MPH
                            </div>
                            <div class="center-data-item">
                                {/* Convert to inches and round to nearest tenth then convert to millibars */}
                                <strong>Barometer:</strong> {((this.state.barometricPressure * .0002953).toFixed(2))} in ({(this.state.barometricPressure / 100).toFixed(2)}mb)
                            </div>
                            <div class="center-data-item">
                                <strong>Dewpoint:</strong> {Math.round((this.state.dewpoint * 9 / 5) + 32)}°F ({Math.round(this.state.dewpoint)}°C)
                            </div>
                            <div class="center-data-item">
                                <strong>Visibility:</strong> {(Math.round(this.state.visibility * .000621371).toFixed(2))} mi
                            </div>
                            <div class="center-data-item">
                                <strong>Wind Chill:</strong> { }{Math.round((this.state.windChill * 9 / 5) + 32)}°F ({Math.round(this.state.windChill)}°C)
                            </div>
                            <div class="center-data-item">
                                <strong>Last updated:</strong> {formattedTimestamp}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='currentWeatherContainer'>
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
                                    <div class="shortForecastText">
                                        <p>{period.shortForecast}</p>
                                    </div>
                                    {/* Conditionally check if it is daytime or night time to get the High or Low temperature*/}
                                    {period.isDaytime ? (
                                        <div>
                                            <p>High: {period.temperature} °{period.temperatureUnit}</p>
                                        </div>) : (
                                        <p>Low: {period.temperature} °{period.temperatureUnit}</p>)}
                                    <p></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='currentWeatherContainer'>
                    <div className='radarHeader'>
                        <h4>Current Weather Radar</h4>
                    </div>
                    <div className='radar'>
                        <img
                            src={this.state.gifRadar} // Assuming the image is at index 0
                            alt="Weather Radar"
                            // Add cursor style for indicating clickability
                            onClick={() => this.handleImageClick(this.state.gifRadar)} // Attach onClick event handler
                        />
                    </div>
                </div>
                {/***************************Render radar the modal ***************************/}
                {modalVisible && gifRadar &&
                    <ImageModal imageUrl={gifRadar} onClose={this.handleCloseImageModal} />
                }
                {/* Render the detailed forecast by mapping the periods */}
                <div className='detailedForecastHeader'>
                    <div className='detailedForecastHeaderStyle'>
                        <h5>Detailed Forecast</h5>
                    </div>
                    {/* Conditionally set each period to display in different colors */}
                    {this.state.forecastPeriods.map((period, index) => (
                        <div key={period.number}
                            className={index % 2 === 0 ? 'even-item' : 'odd-item'} >
                            <div>
                                <h5>{period.name}</h5>
                                <p>{period.detailedForecast}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div class="footer">
                    <h6><i>Last Updated on </i></h6>
                    <p>{this.state.now.toString()}</p>
                    <p class="centered">version 3.1</p>
                </div>
            </div>

        );
    }
}

class CurrentWeather extends React.Component {

    constructor(props) {
        super(props);
        this.citySearch = React.createRef();
        this.state = {
            searchButton: "Seach",
            station: null, 
            result: null
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
    searchLocation = async (event) => {
  event.preventDefault();
  const data = this.citySearch.current.value;

  if (data) {
    this.setState({ station: null });

    const apiKey = process.env.REACT_APP_API_KEY;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${apiKey}&units=imperial`
      );
      const result = await response.json();

      if (result.cod === 200) {
        this.setState({
          station: {
            lat: result.coord.lat,
            lon: result.coord.lon
          }
        });
      } else {
        alert("City not found: " + result.message);
      }

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error getting weather data.");
    }
  }
};


    handleChange = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.SITEMAP);
    }
    //Instantiating WeatherForecast components in CurrentWeather to pass in functions as props
    //To implement the hourly I should create another page using an api to retrieve that info and display the hourly info
    //or try doing what weather channel does and 
    render() {
        if (this.state.station != null) {
            return (
                <div id="main">
                    <div class="SearchContainer">
                        <div class="cardSearch" >
                            <form >
                                <input
                                    ref={this.citySearch}
                                    type="text"
                                    id="cName"
                                    name="cName"
                                    placeholder="Enter City Name" />
                                <button
                                    type="submit"
                                    class="btn-color-theme" onClick={this.searchLocation} >
                                    <span id="login-btn-icon" className={this.state.searchButton} />&nbsp;{this.state.searchButton}
                                </button>
                            </form>
                        </div>
                        <div className="moreInfo">
                            <p>More Information:</p>
                            <div class="infoList"
                                onClick={this.handleChange} >&nbsp;Site Map
                            </div>
                        </div>
                    </div>
                    <div>
                        <WeatherForecast latitude={this.state.station.lat} longitude={this.state.station.lon} />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export { WeatherForecast, CurrentWeather };
export default CurrentWeather; // Default export