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
            <div className="nav-wrapper">
  <div className="navTitle">
    <h1>The National Oceanic and Atmospheric Administration (NOAA)</h1>
  </div>

  <div className="navOptionsTop">
    <div className="navOptionsTop-but" onClick={this.props.homeweatherPage}>
      &nbsp;Weather Forecast
    </div>
    <div className="navOptionsTop-but" onClick={this.props.Space}>
      &nbsp;Space Weather
    </div>
    <div className="navOptionsTop-but" onClick={this.props.gif}>
      &nbsp;Create GIF
    </div>
    <div className="navOptionsTop-but" onClick={this.props.OtherSiteMode}>
      &nbsp;Other Sites
    </div>
  </div>
</div>


        )
    }
}
export default NavBar;