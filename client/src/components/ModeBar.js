import React from 'react';
import AppMode from "./../AppMode.js";

class ModeBar extends React.Component {

  // Mode bar is the bottom navigation bar which can be split into smaller sections. 
  // See .css file navOptionsTop **Should be changed to be global css use for reusability and readabilty
  render() {
    return (
      <div class="modebar">
        <div>
          <a className="navOptionsTop"
            onClick={() => this.props.changeMode(AppMode.WEATHER)}>
            <span className="modebar-text">Weather</span>
          </a>
          <a className="navOptionsTop"
            onClick={() => this.props.changeMode(AppMode.SITEMAP)}>
            <span className="modebar-text">Site Map</span>
          </a>
          <a className="navOptionsTop"
            onClick={() => this.props.changeMode(AppMode.OTHERSITE)}>
            <span className="modebar-text">other sites</span>
          </a>
          <a className="navOptionsTop"
            onClick={this.props.showAbout}>
            <span className="modebar-text">About</span>
          </a>
        </div>
      </div>

    );
  }
}

export default ModeBar;