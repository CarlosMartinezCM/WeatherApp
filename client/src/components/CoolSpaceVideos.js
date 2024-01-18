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
                <div class="siteMap">
                    <div className="App">
                        <ReactPlayer url='<https://www.youtube.com/watch?v=EceyCgxG1c8>'
                            controls={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default SpaceVideos;