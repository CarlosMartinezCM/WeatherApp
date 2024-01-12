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
        this.props.changeMode(AppMode.WEATHER);
    }
    render() {
        return (
            <div >
                    <div class="navOptions">
                            <div className="navOptions"
                                onClick={this.props.homeweatherPage} >&nbsp;Weather</div>
                                {/*<div className="navOptions"
                                onClick={this.handleChange} >&nbsp;Weather using handle change</div>*/}
                    </div>
            </div>
        )
    }
}




export default SiteMap;