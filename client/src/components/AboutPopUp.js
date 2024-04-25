// Modal for about pop up
import React from 'react';

class AboutPopUp extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  render() {

    return (
      <div className="modal" role="dialog">
        <div className="about-modal-content">
          <div className='modal-header'>
            <p className='modal-title'>About</p>
            <button id='modalClose' className='close' onClick={this.props.hideAbout}>
              &times;</button>
          </div>
          <div className='modalBody'>
            <center>
              <h1>Weather Application using React.js</h1>
              <p>Static site deployed on Vercel from GitHub.</p>
              <p>Weather Forecast and Gif generator!!</p>
              <div>
                <p>My name is Carlos Martinez</p>
                <p>You can check out the code and other projects at</p>
                <a href="https://github.com/CarlosMartinezCM?tab=repositories" target="_blank" rel="noopener noreferrer">
                  My GitHub Repo
                </a>
                <p style={{ fontStyle: "italic" }}><br></br>Version 3.4 </p>
              </div>
            </center>
            <div className='modal-footer'>
              <button className='modal-submit-btn' onClick={this.props.hideAbout}>close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AboutPopUp;