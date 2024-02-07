import React, { Component } from 'react';
import { createGIF } from 'gifshot';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            gifSrc: null,
            now: new Date(),
            gifArray: [],
        };
    }

    componentDidMount() {
        this.fetchImageFilenames();
    }

    fetchImageFilenames = async () => {
        try {
            // Array of URLs to fetch, I want to change thsi
            const urls = [
                //'https://services.swpc.noaa.gov/products/animations/suvi-primary-094.json',
                'https://services.swpc.noaa.gov/products/animations/suvi-primary-131.json',
                'https://services.swpc.noaa.gov/products/animations/suvi-secondary-171.json',
                'https://services.swpc.noaa.gov/products/animations/suvi-secondary-195.json',
                'https://services.swpc.noaa.gov/products/animations/suvi-secondary-284.json',
                'https://services.swpc.noaa.gov/products/animations/suvi-secondary-304.json',
                // Add more URLs as needed
            ];

            // Fetch all resources concurrently using Promise.all
            const responses = await Promise.all(urls.map(url => fetch(url)));

            // Extract JSON data from each response
            const jsonDataArray = await Promise.all(responses.map(response => response.json()));

            // Extract image URLs from the JSON data
            const imageUrlsArray = jsonDataArray.map(jsonData => jsonData.map(item => `https://services.swpc.noaa.gov${item.url}`));


            // Generate GIFs with the extracted image URLs
            const gifArray = [];
            for (const imageUrls of imageUrlsArray) {
                const gif = await this.generateGIF(imageUrls);
                gifArray.push(gif);
            }

            console.log('gifArray:', gifArray);

            // Now, gifArray contains all the generated GIFs

            const numberOfGIFs = gifArray.length;
            console.log(`Number of GIFs: ${numberOfGIFs}`);

            this.setState({ gifArray, progress: 0 });

        } catch (error) {
            console.error('Error fetching image filenames:', error);
        }
    };
    //generate Gifs of the sun from the PNGs
    generateGIF = (imageUrls) => {
        return new Promise((resolve, reject) => {
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
                    console.log('Generated GIF:', obj.image);
                    resolve(obj.image);
                } else {
                    console.error('Error generating GIF:', obj.error);
                    reject(obj.error);
                }
            });
        });
    };


    render() {
        const { progress, gifArray } = this.state;

        return (
            <div className='container'>
                <div className='content'>
                    <div className='spaceWeatherHeader'>
                        <h1>Space Weather Prediction Center NOAA</h1>
                    </div>

                    <div className='spaceWeatherHeader'>
                        This page will contain gif's of the weather on our Sun.
                        <div style={{
                            color: 'red',        // temp styling
                            fontSize: '16px',   
                            fontWeight: 'bold',
                        }}>Content is slow to display, working on a solution, takes about 15 seconds.</div>
                        <div>
                            {progress !== 0 && <label>Loading... {progress}%</label>}

                            {gifArray && gifArray.length > 0 && (
                                <div className="gifContainer">
                                    {gifArray.map((gif, index) => (
                                        <img key={index} src={gif} alt={`Generated GIF ${index}`} className="gifImage" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div class="card">
                        <div class="footer">
                            <div className='modalFooter'>
                            </div>
                        </div>
                        <h6><i>Last Updated on </i></h6>
                        <p>{this.state.now.toString()}</p>
                        <p class="centered">version 3.0</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
