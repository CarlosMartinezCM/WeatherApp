import React from 'react';
import CurrentWeather from './CurrentWeather.js';
import NavBar from './NavBar.js';
import ModeBar from './ModeBar.js';
import LoginPage from './LoginPage.js';
import homePage from './homePage.js';
import AppMode from './../AppMode.js';
import AboutPopUp from './AboutPopUp.js';
import Football from './Football.js';
import SiteMap from './SiteMap.js';

const modeTitle = {};
modeTitle[AppMode.HOMEPAGE] = "Welcome!!";
modeTitle[AppMode.LOGIN] = "Login Page";
modeTitle[AppMode.WEATHER] = "Current Weather!!";
modeTitle[AppMode.FOOTBALL] = "Football!!!";
modeTitle[AppMode.SITEMAP] = "Site Map!!!";

const modeToPage = {};
modeToPage[AppMode.HOMEPAGE] = homePage;
modeToPage[AppMode.WEATHER] = CurrentWeather;
modeToPage[AppMode.LOGIN] = LoginPage;
modeToPage[AppMode.FOOTBALL] = Football;
modeToPage[AppMode.SITEMAP] = SiteMap;

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            mode: AppMode.HOMEPAGE,
            showAbout: false,
            menuOpen: false
        };
    }

    toggleAbout = () => {
        this.setState(prevState => ({ showAbout: !prevState.showAbout }));
    }

    handleChangeMode = (newMode) => {
        this.setState({ mode: newMode });
    }

    openMenu = () => {
        this.setState({ menuOpen: true })
    }

    closeMenu = () => {

        this.setState({ menuOpen: false })
    }

    render() {
        const ModePage = modeToPage[this.state.mode];
        return (
            <div>
                {this.state.showAbout ? <AboutPopUp hideAbout={this.toggleAbout} /> : null}
                <NavBar
                    title={modeTitle[this.state.mode]}
                    changeMode={this.handleChangeMode}
                    mode={this.state.mode}
                    menuOpen={this.state.menuOpen}
                    weatherPage={() => this.handleChangeMode(AppMode.WEATHER)}
                    homePage={() => this.handleChangeMode(AppMode.HOMEPAGE)}
                    loginPage={() => this.handleChangeMode(AppMode.LOGIN)}
                    FootballMode={() => this.handleChangeMode(AppMode.FOOTBALL)}
                    SiteMode={() => this.handleChangeMode(AppMode.SITEMAP)}
                />
                <ModeBar
                    mode={this.state.mode}
                    menuOpen={this.state.menuOpen}
                    changeMode={this.handleChangeMode}
                />
                <ModePage
                    menuOpen={this.state.menuOpen}
                    changeMode={this.handleChangeMode}
                    weatherPage={() => this.handleChangeMode(AppMode.WEATHER)}
                    homePage={() => this.handleChangeMode(AppMode.HOMEPAGE)}
                    loginPage={() => this.handleChangeMode(AppMode.LOGIN)}
                    FootballMode={() => this.handleChangeMode(AppMode.FOOTBALL)}
                    SiteMode={() => this.handleChangeMode(AppMode.SITEMAP)}
                />


            </div>
        );
    }

}


export default App;