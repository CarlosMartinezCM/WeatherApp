// Modal for about pop up
import React from 'react';

class AboutPopUp extends React.Component {
    render() {
        return (
            <div className="modal" role="dialog">
                <div className="modal-content">
                    <div className='modal-header'>
                        <p className='modal-title'>About</p>
                        <button id='modalClose' className='close' onClick={this.props.hideAbout}>
                            &times;</button>
                    </div>
                    <div className='modalBody'>
                        <center>
                            <h1>Weather Application using ReactJS.</h1>
                            <p>Static site deployed on Vercel from GitHub.</p>
                            <p style={{ fontStyle: "italic" }}>Version 3.1; Weather Forecast Project</p>
                        </center>
                        <div className='modalFooter'>
                            <button className='btn btn-two' onClick={this.props.hideAbout}>close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default AboutPopUp;