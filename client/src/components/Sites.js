import React from "react";
import AppMode from "../AppMode";

class otherSites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coolWebsites: [
                { name: 'NOAA (National Oceanic and Atmospheric Administration)', url: 'https://forecast.weather.gov/MapClick.php?lat=47.6036&lon=-122.3294' },
                { name: 'Stars Chrome Expirements', url: 'https://stars.chromeexperiments.com/' },
                { name: 'Zoom Earth Radar', url: 'https://zoom.earth/maps/satellite/#view=39.4,-119.4,6z/overlays=radar' },
                { name: 'NWS Radar', url: 'https://radar.weather.gov/?settings=v1_eyJhZ2VuZGEiOnsiaWQiOm51bGwsImNlbnRlciI6Wy05NSwzN10sImxvY2F0aW9uIjpudWxsLCJ6b29tIjo0fSwiYW5pbWF0aW5nIjpmYWxzZSwiYmFzZSI6InN0YW5kYXJkIiwiYXJ0Y2MiOmZhbHNlLCJjb3VudHkiOmZhbHNlLCJjd2EiOmZhbHNlLCJyZmMiOmZhbHNlLCJzdGF0ZSI6ZmFsc2UsIm1lbnUiOnRydWUsInNob3J0RnVzZWRPbmx5IjpmYWxzZSwib3BhY2l0eSI6eyJhbGVydHMiOjAuOCwibG9jYWwiOjAuNiwibG9jYWxTdGF0aW9ucyI6MC44LCJuYXRpb25hbCI6MC42fX0%3D' },
            ],
            dataSites: [
                { name: 'NOAA API', url: 'https://www.weather.gov/documentation/services-web-api' },
                { name: 'Open Weather API', url: 'https://openweathermap.org/api' },
                { name: 'Sun Images', url: 'https://services.swpc.noaa.gov/' },
                ],
        };
    }

    render() {
        return (
            <card>
                <div className="sitesHeader" >
                    <h1>More Information</h1>
                </div>
                <div className="sites">
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
                        <h3>Data site</h3>
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