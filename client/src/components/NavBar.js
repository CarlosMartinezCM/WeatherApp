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
                <div className="navMenu">
                    <h1>Weather Service</h1>
                    <div class="navHome">
                        {/*  Can add web navigation buttons under the Wether App title*/}
                        <button>
                            <span role="button" className="button"
                                onClick={this.props.homeweatherPage} >&nbsp;Forecast</span>
                        </button>
                        <button>
                            <span role="button" className="button"
                                onClick={this.props.SiteMode} >&nbsp;Site Map</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default NavBar;