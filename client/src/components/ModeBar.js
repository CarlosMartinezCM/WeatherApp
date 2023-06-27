import React from 'react';
import AppMode from "./../AppMode.js";

class ModeBar extends React.Component {

  // Mode bar is the bottom navigation bar whcih can be split into smaller sections. see .css file mode bar
  render() {
    return (
      <div class="modebar">
        <div>
        <a className="modebarbtn"
          onClick={() => this.props.changeMode(AppMode.WEATHER)}>
          <span className="modebar-text">Weather</span>
        </a>
        <a className="modebarbtn"
          onClick={() => this.props.changeMode(AppMode.SITEMAP)}>
          <span className="modebar-text">Site Map</span>
        </a>
        <a className="modebarbtn"
          onClick={this.props.showAbout}>
          <span className="modebar-text">About</span>
        </a>
        </div>
      </div>
      
    );
  }
}

export default ModeBar;