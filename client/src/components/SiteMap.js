import React from "react";
import AppMode from "./../AppMode";

class SiteMap extends React.Component {
    constructor() {
        super();
        this.state = {
            color: "black"
        };
    }
    render() {
        return (
            <div classname="home_pagetitle">
                <center>
                    <div>
                        <button>
                            <span role="button" className="button"
                                onClick={this.props.homeweatherPage} >&nbsp;Weather</span>
                        </button>
                    </div>
                    <div>
                        <button>
                            <span role="button" className="button"
                                onClick={this.props.loginPage} >&nbsp;Login</span>
                        </button>
                    </div>

                </center>
            </div>
        )
    }
}




export default SiteMap;