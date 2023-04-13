import React from 'react';
import CurrentWeather from './CurrentWeather.js';
import NavBar from './NavBar.js';
import LoginPage from './LoginPage.js';
import homePage from './homePage.js';
import AppMode from './../AppMode.js';
import AboutPopUp from './AboutPopUp.js';

const modeTitle = {};
modeTitle[AppMode.HOMEPAGE] = "Welcome!!";
modeTitle[AppMode.LOGIN] = "Login Page";
modeTitle[AppMode.WEATHER] = "Current Weather!!";

const modeToPage = {};
modeToPage[AppMode.HOMEPAGE] = homePage;
modeToPage[AppMode.WEATHER] = CurrentWeather;
modeToPage[AppMode.LOGIN] = LoginPage;

class App extends React.Component {

    constructor() {
        super();
        this.state = {mode: AppMode.HOMEPAGE,
                      showAbout: false              
        };
    }

    toggleAbout = () => {
        this.setState(prevState => ({showAbout: !prevState.showAbout}));
    }

    handleChangeMode = (newMode) => {
        this.setState({mode: newMode});
    }

    render() {
        const ModePage = modeToPage[this.state.mode];
        return (
            <div>
                {this.state.showAbout ? <AboutPopUp hideAbout={this.toggleAbout}/> : null}
            <NavBar
                title={modeTitle[this.state.mode]}
                mode={this.state.mode}
                />
            <ModePage 
                 changeMode={this.handleChangeMode}
                 weatherPage={() => this.handleChangeMode(AppMode.WEATHER)}
                 homePage={() => this.handleChangeMode(AppMode.HOMEPAGE)}
                 />
            
            
            </div>
        );
    }

}


export default App;