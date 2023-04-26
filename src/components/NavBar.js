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
                <div class="navMenu">
                    <h1>Welcome to my Website</h1>
                    <div class="navHome">
                    <button>
                        <span role="button" className="button"
                            onClick={this.props.homePage} >&nbsp;Home</span>
                    </button>
                    <button>
                        <span role="button" className="button"
                            onClick={this.props.weatherPage} >&nbsp;Weather</span>
                    </button>
                    <button>
                        <span role="button" className="button"
                            onClick={this.props.FootballMode} >&nbsp;Football</span>
                    </button>
                    <button>
                        <span role="button" className="button"
                            onClick={this.props.SiteMode} >&nbsp;Site Map</span>
                    </button>
                    <button>
                        <span role="button" className="button" 
                            onClick={this.props.loginPage} >&nbsp;Login</span>
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;