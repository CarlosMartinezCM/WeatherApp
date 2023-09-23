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
                    <div class="navOptions">
                            <div className="navOptions"
                                onClick={this.props.homeweatherPage} >&nbsp;Weather</div>
                    </div>
            </div>
        )
    }
}




export default SiteMap;