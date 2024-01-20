import React from 'react';
import ReactPlayer from 'react-player';

class SpaceVideos extends React.Component {
    constructor() {
        super();
        this.state = {
            color: "black"
        };
    }

    render() {
        return (
            <div >
                <div class="videos">
                    <div>
                        <p>Live stream of Earth from Space.</p>
                    </div>
                    <div className="App">
                        <ReactPlayer url='<https://youtu.be/xRPjKQtRXR8>'
                            controls={true}
                            width="100%"
                        />
                        <div>
                            <p>Timelapse of the entire Universe.</p>
                        </div>
                        <ReactPlayer url='<https://youtu.be/TBikbn5XJhg>'
                            controls={true}
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default SpaceVideos;