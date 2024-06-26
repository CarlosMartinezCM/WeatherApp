import React from "react";
import AppMode from "./../AppMode.js";

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            color: "black"
        };
    }
    handleChange = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.HOMEPAGE);
    }
    render() {
        return (
            <div>
                <div className="navTitle">
                    <h1>The National Oceanic and Atmospheric Administration (NOAA)</h1>
                </div>
                <div class="navOptionsTop">
                    {/*  Can add web navigation buttons under the Wether App title*/}
                    <div div class='navOptionsTop-but' type="submit"
                        onClick={this.props.homeweatherPage} >&nbsp;Weather Forecast</div>
                    <div div class='navOptionsTop-but' type="submit"
                        onClick={this.props.Space} >&nbsp;Space Weather</div>
                    <div className="navOptionsTop-but"
                        onClick={this.props.gif} >&nbsp;Create GIF</div>
                    <div div class='navOptionsTop-but' type="submit"
                        onClick={this.props.OtherSiteMode} >&nbsp;Other Sites</div>
                </div>
            </div>
        )
    }
}
export default NavBar;