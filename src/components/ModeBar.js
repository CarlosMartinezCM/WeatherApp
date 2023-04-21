import React from 'react';
import AppMode from "./../AppMode.js";

class ModeBar extends React.Component {
   
  // can split this into sections but for now I will keep 1 section
  render() {
      return(
        <div class="modebar">
                    <a className="modebarbtn"
                        onClick={() => this.props.changeMode(AppMode.HOMEPAGE)}>
                        <span className="modebar-text">home</span>
                    </a>
                </div>
      );
    }
}

export default ModeBar;