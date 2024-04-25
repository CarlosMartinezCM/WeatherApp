import React from "react";
import AppMode from "./../AppMode";

class SiteMap extends React.Component {
    constructor() {
        super();
        this.state = {
            color: "black"
        };
    }
    handleChange = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.SPACEURLS);
    }

    render() {
        return (
            <div >
                <div class="siteMap">
                    <div class="siteMap">
                        <div className="sites" onClick={this.props.homeweatherPage}>
                            &nbsp;Weather
                        </div>
                        <div className="sites" onClick={this.props.Space}>
                            &nbsp;Space Weather
                        </div>
                        <div className="sites" onClick={this.props.gif}>
                            &nbsp;Create a Gif!!
                        </div>
                        <div className="sites" onClick={this.props.SpaceUrls}>
                            &nbsp;Space Videos
                        </div>
                        <div className="sites" onClick={this.props.contactMe}>
                            &nbsp;Contact Me
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SiteMap;