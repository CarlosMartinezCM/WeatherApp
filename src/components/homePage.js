import React from "react";
import AppMode from "./../AppMode";

class homePage extends React.Component {
    constructor() {
        super();
        this.state = {
            color: "black"
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.WEATHER);

    }

    render() {
        return (
            <div classname="home_pagetitle">
                <center>
                    <p>Starting to add more pages then more functionality!!</p>
                    <br />
                    <br />
                    <button>
                        <span role="button" className="button"
                            onClick={this.props.weatherPage} >&nbsp;Weather</span>
                    </button>
                    <br />
                    <br />
                    <button>
                        <span role="button" className="button"
                            onClick={this.props.loginPage} >&nbsp;login</span>
                    </button>
                </center>
            </div>
        )
    }
}




export default homePage;