import React from "react";
import AppMode from "../AppMode";

class otherSites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coolWebsites: [
                { name: 'NOAA', url: 'https://forecast.weather.gov/MapClick.php?lat=47.6036&lon=-122.3294' },
                { name: 'Stars Chrome Expirements', url: 'https://stars.chromeexperiments.com/' },
                { name: 'Zoom Earth', url: 'https://zoom.earth/maps/satellite/#view=39.4,-119.4,6z/overlays=radar' },
            ],
            dataSites: [
                { name: 'NOAA', url: 'https://forecast.weather.gov/MapClick.php?lat=47.6036&lon=-122.3294' },
                { name: 'Open Weather API', url: 'https://openweathermap.org/api' },
                { name: 'earth', url: 'https://zoom.earth/maps/satellite/#view=39.4,-119.4,6z/overlays=radar' },
            ],
        };
    }

    render() {
        return (
            <card>
                <div className="sitesHeader" >
                    <h1>More Information</h1>
                </div>
                <div className="container">
                    <div>
                        <h3>Cool Websites</h3>
                        <div>
                            <ul>
                                {this.state.coolWebsites.map((coolWebsites, index) => (
                                    <ul key={index}>
                                        {/* target_blank attribute opens the link in a new tab, while noopener noreferrer ensures privacy and security */}
                                        <a href={coolWebsites.url} target="_blank" rel="noopener noreferrer" >
                                            {coolWebsites.name}
                                        </a>
                                    </ul>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3>Weather data collected from the following sites.</h3>
                        <div>
                            <ul>
                                {this.state.dataSites.map((dataSites, index) => (
                                    <ul key={index}>
                                        <a href={dataSites.url} target="_blank" rel="noopener noreferrer" >
                                            {dataSites.name}
                                        </a>
                                    </ul>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </card>
        )
    }
}

export default otherSites;