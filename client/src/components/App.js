import React from 'react';
import CurrentWeather from './CurrentWeather.js';
import NavBar from './NavBar.js';
import ModeBar from './ModeBar.js';
import AppMode from './../AppMode.js';
import AboutPopUp from './AboutPopUp.js';
import SiteMap from './SiteMap.js';
import SPACE from './spaceWeather.js';
import SPACEURLS from './videos.js';
import OTHERSITE from './Sites.js';
//import DailyWeather from './DailyWeather.js'; 

const modeTitle = {};
modeTitle[AppMode.WEATHER] = "Current Weather!!";
modeTitle[AppMode.SITEMAP] = "Site Map!!!";
modeTitle[AppMode.OTHERSITE] = "Other Sites!!!";
modeTitle[AppMode.SPACE] = "Space Weather!!!";
modeTitle[AppMode.SPACEURLS] = "Space Videos!!!";
//modeTitle[AppMode.DAILYWEATHER] = "Daily Weather!!!";

const modeToPage = {};
modeToPage[AppMode.WEATHER] = CurrentWeather;
modeToPage[AppMode.SITEMAP] = SiteMap;
modeToPage[AppMode.OTHERSITE] = OTHERSITE;
modeToPage[AppMode.SPACE] = SPACE;
modeToPage[AppMode.SPACEURLS] = SPACEURLS;
//modeToPage[AppMode.DAILYWEATHER] = DailyWeather;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            mode: localStorage.getItem('mode') || AppMode.WEATHER,  // this sets the initial mode from localStorage 
            showAbout: false,
            menuOpen: false
        };
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.saveModeToLocalStorage); // Save mode to localStorage before refresh
       // window.addEventListener('unload', this.clearLocalStorage); // Clear mode from localStorage on browser close
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.saveModeToLocalStorage);
       // window.removeEventListener('unload', this.clearLocalStorage);
    }

    saveModeToLocalStorage = () => {
        localStorage.setItem('mode', this.state.mode); // Save current mode to localStorage
    }

    clearLocalStorage = () => {
        if (localStorage.getItem('mode')) {
            localStorage.removeItem('mode'); // Clear mode from localStorage on browser close
        }
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
                    homeweatherPage={() => this.handleChangeMode(AppMode.WEATHER)}
                    SiteMode={() => this.handleChangeMode(AppMode.SITEMAP)}
                    OtherSiteMode={() => this.handleChangeMode(AppMode.OTHERSITE)}
                    Space={() => this.handleChangeMode(AppMode.SPACE)}
                    SpaceUrls={() => this.handleChangeMode(AppMode.SPACEURLS)}
                    showAbout={this.toggleAbout}
                />
                <ModeBar
                    mode={this.state.mode}
                    menuOpen={this.state.menuOpen}
                    changeMode={this.handleChangeMode}
                    showAbout={this.toggleAbout}
                />
                <ModePage
                    menuOpen={this.state.menuOpen}
                    changeMode={this.handleChangeMode}
                    homeweatherPage={() => this.handleChangeMode(AppMode.WEATHER)}
                    SiteMode={() => this.handleChangeMode(AppMode.SITEMAP)}
                    OtherSiteMode={() => this.handleChangeMode(AppMode.OTHERSITE)}
                    Space={() => this.handleChangeMode(AppMode.SPACE)}
                    SpaceUrls={() => this.handleChangeMode(AppMode.SPACEURLS)}
                    showAbout={this.toggleAbout}
                />
            </div>
        );
    }

}
export default App;