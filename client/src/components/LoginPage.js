import React from "react";
import AppMode from "./../AppMode";

class LoginPage extends React.Component {
    render() {
        return (
            <div class="header">
                <h1>Log in please</h1>

                <div>
                    <div id="login-mode-div" className="padded-page">
                        <center>
                            <h1 />
                            <form id="loginInterface">
                                <label htmlFor="emailInput" style={{ padding: 0, fontSize: 24 }}>
                                    Email:
                                    <input
                                        className="form-control login-text"
                                        type="email"
                                        placeholder="Enter Email Address"
                                        id="emailInput"
                                        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                                        required={true}
                                    />
                                </label>
                                <p />
                                <label htmlFor="passwordInput" style={{ padding: 0, fontSize: 24 }}>
                                    Password:
                                    <input
                                        className="form-control login-text"
                                        type="password"
                                        placeholder="Enter Password"
                                        pattern="[A-Za-z0-9!@#$%^&*()_+\-]+"
                                        required={true}
                                    />
                                </label>
                                <p className="bg-danger" id="feedback" style={{ fontSize: 16 }} />
                                <button
                                    type="submit"
                                    className="btn-color-theme btn btn-primary btn-block login-btn">
                                    <span id="login-btn-icon" className="fa fa-sign-in" />
                                    &nbsp;Log In
                                </button>
                                <br />
                                <a role="button" className="login-btn">
                                    <img src="https://drive.google.com/uc?export=view&id=1YXRuG0pCtsfvbDSTzuM2PepJdbBpjEut" />
                                </a>
                                <a role="button" className="login-btn">
                                    <img src="https://drive.google.com/uc?export=view&id=1ZoySWomjxiCnC_R4n9CZWxd_qXzY1IeL" />
                                </a>

                            </form>
                        </center>
                        <br />
                        <br />
                        <br />
                    </div>
                    <div class="header">
                        <button>
                            <span role="button" className="button"
                                onClick={this.props.homePage} >&nbsp;Home</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;