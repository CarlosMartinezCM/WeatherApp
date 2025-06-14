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
import GIF from './createGif.js';
import CONTACTME from './contactMe.js';
import TopButton from './topButton.js';

const modeTitle = {};
modeTitle[AppMode.WEATHER] = "Current Weather!!";
modeTitle[AppMode.SITEMAP] = "Site Map!!!";
modeTitle[AppMode.OTHERSITE] = "Other Sites!!!";
modeTitle[AppMode.SPACE] = "Space Weather!!!";
modeTitle[AppMode.SPACEURLS] = "Space Videos!!!";
modeTitle[AppMode.GIF] = "Create Gifs!!!";
modeTitle[AppMode.CONTACTME] = "Contact Me!!!";

const modeToPage = {};
modeToPage[AppMode.WEATHER] = CurrentWeather;
modeToPage[AppMode.SITEMAP] = SiteMap;
modeToPage[AppMode.OTHERSITE] = OTHERSITE;
modeToPage[AppMode.SPACE] = SPACE;
modeToPage[AppMode.SPACEURLS] = SPACEURLS;
modeToPage[AppMode.GIF] = GIF;
modeToPage[AppMode.CONTACTME] = CONTACTME;

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
        window.addEventListener('beforeunload', this.saveModeToLocalStorage);
        window.addEventListener('unload', this.clearLocalStorage);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.saveModeToLocalStorage);
        window.removeEventListener('unload', this.clearLocalStorage);
    }

    //this function saves the current mode to Local Storage
    saveModeToLocalStorage = () => {
        localStorage.setItem('mode', this.state.mode);
    }

    // Clear mode from localStorage on browser close or unload
    clearLocalStorage = () => {
        localStorage.removeItem('mode');
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
            <div className='body'>
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
                    gif={() => this.handleChangeMode(AppMode.GIF)}
                    contactMe={() => this.handleChangeMode(AppMode.CONTACTME)}
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
                    gif={() => this.handleChangeMode(AppMode.GIF)}
                    contactMe={() => this.handleChangeMode(AppMode.CONTACTME)}
                    showAbout={this.toggleAbout}
                />
                <TopButton />
            </div>
        );
    }

}
export default App;