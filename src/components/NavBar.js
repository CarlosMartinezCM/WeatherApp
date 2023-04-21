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
            <div>
            <div class="navMenu">
                <h1>Welcome to my Website</h1>
            </div>
            <div class="navHome">
            <a className="navHome"
            onClick={()=>this.props.changeMode(AppMode.HOMEPAGE)}>
          <span className="modebar-text">home</span>
        </a>
                    </div>
            </div>
        )
    }
}

export default NavBar;