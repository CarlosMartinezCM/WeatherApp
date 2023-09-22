import React from "react";

class SiteMap extends React.Component {
    constructor() {
        super();
        this.state = {
            color: "black"
        };
    }
    render() {
        return (
            <div >
                    <div class="forecastText">
                            <span role="button" className="button"
                                onClick={this.props.homeweatherPage} >&nbsp;Weather</span>
                    </div>
            </div>
        )
    }
}




export default SiteMap;