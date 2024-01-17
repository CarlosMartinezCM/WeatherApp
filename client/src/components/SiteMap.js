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
                    <div className="siteMap"
                        onClick={this.props.homeweatherPage} >&nbsp;Weather</div>
                    <div className="siteMap"
                        onClick={this.props.Space} >&nbsp;Space Weather</div>
                    <div className="siteMap"
                        onClick={this.props.SpaceUrls} >&nbsp;Space Videos</div>
                    {/*<div className="siteMap"
                                onClick={this.handleChange} >&nbsp;Weather using handle change</div>*/}
                </div>
            </div>
        )
    }
}




export default SiteMap;