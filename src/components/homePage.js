import React from "react";
import AppMode from "./../AppMode";

class homePage extends React.Component {
constructor() {
    super();
    this.state = {color: "black"
                    };
                }

                handleChange = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.WEATHER);

    }

    render() {
        return(
            <div classname="padded-page">
                <center>
                     <h1>Hello World</h1>
                     <p>Im hoping this works</p>
                     <br/>
                     <br/>
                     <br/>
                     <br/>
                     <br/>
                     <br/>
                     <br/>
                     <br/>
                     <a id="weatherBtn" className="switch-2weather"
                        onClick={this.props.weatherPage} >&nbsp;Weather</a>
                </center>

            </div>
        )
    }
}




export default homePage;