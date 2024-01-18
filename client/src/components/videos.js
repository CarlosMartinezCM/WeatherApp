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
                    <div className="App">
                        <ReactPlayer url='<https://www.youtube.com/watch?v=EceyCgxG1c8>'
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