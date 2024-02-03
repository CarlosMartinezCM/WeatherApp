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
    //making a async gif, 
    generateGIF = (imageUrls) => {
        const options = {
            images: imageUrls,
            gifWidth: 400,
            gifHeight: 400,
            numWorkers: 10,
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
            <div className="card">
                <div className='spaceWeatherHeader'>
                    <h1>Space Weather Prediction Center NOAA</h1>
                </div>
                <div className="summaryStyle">
                    <p>This page will contain gif's of the weather on our Sun.</p>
                </div>
                <div>
                <div className='gifCard'>
                    {progress !== 0 && <label>Loading... {progress}%</label>}
                    {gifSrc && (
                        <div>
                            <h4>The Sun (EUV):</h4>
                            <img src={gifSrc} alt="Generated GIF" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
                </div>
                 </div>
                <div className='spaceFooter'>
                    <p>About this page.</p>
                </div>
            </div>
        );
    }
}

export default App;
