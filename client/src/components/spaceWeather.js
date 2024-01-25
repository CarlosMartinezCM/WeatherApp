import React, { Component } from 'react';

import { createGIF } from 'gifshot';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            gifSrc: null,
        };
    }

    componentDidMount() {
        this.fetchImageFilenames();
    }

    fetchImageFilenames = async () => {
        try {
            const response = await fetch('https://services.swpc.noaa.gov/products/animations/suvi-secondary-195.json');
            const jsonData = await response.json();

            // Extract image URLs from the JSON data
            const imageUrls = jsonData.map(item => `https://services.swpc.noaa.gov${item.url}`);

            // Generate GIF with the extracted image URLs
            this.generateGIF(imageUrls);
        } catch (error) {
            console.error('Error fetching image filenames:', error);
        }
    };

    //Function to create the GIF
    generateGIF = (imageUrls) => {
        const options = {
            images: imageUrls,
            gifWidth: 300,
            gifHeight: 300,
            numWorkers: 5,
            frameDuration: 0.01,
            sampleInterval: 10,
            progressCallback: (e) => this.setState({ progress: parseInt(e * 100) }),
        };

        createGIF(options, (obj) => {
            if (!obj.error) {
                this.setState({ gifSrc: obj.image, progress: 0 });
            }
        });
    };

    render() {
        const { progress, gifSrc } = this.state;

        return (
            <div className="App">
                <h3>Create a GIF from images in React</h3>
                {progress !== 0 && <label>Creating GIF... {progress}%</label>}

                {gifSrc && (
                    <div>
                        <h4>Generated GIF:</h4>
                        <img src={gifSrc} alt="Generated GIF" style={{ maxWidth: '100%' }} />
                    </div>
                )}
            </div>
        );
    }
}

export default App;
