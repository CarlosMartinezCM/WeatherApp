import React from "react";
import AppMode from "./../AppMode";

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
                        <button>
                            <span role="button" className="button"
                                onClick={this.props.homePage} >&nbsp;Home</span>
                        </button>
                    </div>
            </div>
        )
    }
}

export default NavBar;