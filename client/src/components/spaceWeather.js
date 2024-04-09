import React, { Component } from 'react';
import { createGIF } from 'gifshot';
//const fs = require('fs');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            gifSrc: null,
            now: new Date(),
            gifArray: [],
            selectedGifIndex: 0, // Initialize selectedGifIndex to 0
        };
    }

    componentDidMount() {
        this.fetchImageFilenames();
    }

    fetchImageFilenames = async () => {
        try {
            // Array of URLs to fetch
            const urls = [
               // 'https://services.swpc.noaa.gov/products/animations/ovation_north_24h.json',
              //  'https://services.swpc.noaa.gov/products/animations/suvi-secondary-304.json',  //
               // 'https://services.swpc.noaa.gov/products/animations/suvi-secondary-195.json',   // THE SUN (EUV)
               // 'https://services.swpc.noaa.gov/products/animations/suvi-primary-131.json',        //
               // 'https://services.swpc.noaa.gov/products/animations/suvi-secondary-171.json',    //
               // 'https://services.swpc.noaa.gov/products/animations/suvi-secondary-284.json',  //
              //  'https://services.swpc.noaa.gov/products/animations/suvi-primary-094.json',
              //  'https://services.swpc.noaa.gov/products/animations/sdo-hmii.json',
              //  'https://services.swpc.noaa.gov/products/animations/lasco-c3.json',
             //   'https://services.swpc.noaa.gov/products/animations/lasco-c2.json',

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
                //This will call the handledownload to automatically download the gif to downloads folder. 
                //this.handleDownload(gif);
            }

            // Now, gifArray contains all the generated GIFs
            const numberOfGIFs = gifArray.length;
            console.log(`Number of GIFs: ${numberOfGIFs}`);
            this.setState({ gifArray, progress: 0 });
        } catch (error) {
            console.error('Error fetching image filenames:', error);
        }
    };

    //generate Gifs of the sun from the PNGs or jpg
    generateGIF = (imageUrls) => {
        return new Promise((resolve, reject) => {

            // Check if there are no images provided
            if (!imageUrls || imageUrls.length === 0) {
                resolve('No images provided. Skipping GIF generation.');
                return; // Exit the function
            }
    
            const options = {
                images: imageUrls,
                gifWidth: 800,
                gifHeight: 800,
                numWorkers: 10,
                frameDuration: 0.15,
                sampleInterval: 12,
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

    handleDownload = (gifUrl) => {
        const link = document.createElement('a');
        link.href = gifUrl;
        link.download = 'generated_gif.gif';
        link.click();
    };

    render() {
        const { progress, gifArray, selectedGifIndex } = this.state;

        return (
            <div >
                <div className='spaceWeatherHeader'>
                    <h1>Space Weather Prediction Center NOAA</h1>
                </div>
                <div >
                    <div className='aurora'>
                        <img
                            src='https://services.swpc.noaa.gov/experimental/images/aurora_dashboard/tonights_static_viewline_forecast.png'
                            alt='NOAA Aurora Dashboard'
                            style={{ width: '225px' }}
                        />
                        <img
                            src='https://services.swpc.noaa.gov/experimental/images/aurora_dashboard/tomorrow_nights_static_viewline_forecast.png'
                            alt='NOAA Aurora Dashboard'
                            style={{ width: '225px' }}
                        />
                        <img
                            src='https://services.swpc.noaa.gov/images/animations/suvi/primary/131/or_suvi-l2-ci131_g16_s20240409T122800Z_e20240409T123200Z_v1-0-1.png'
                            alt='NOAA Suvi131'
                            style={{ width: '225px' }}
                        />
                        <img
                            src='https://services.swpc.noaa.gov/images/animations/suvi/primary/094/or_suvi-l2-ci094_g16_s20240409T123200Z_e20240409T123600Z_v1-0-1.png'
                            alt='NOAA Suvi094'
                            style={{ width: '225px' }}
                        />
                        <img
                            src='https://services.swpc.noaa.gov/images/animations/sdo-hmii/20240327_182238_512_HMII.jpg'
                            alt='NOAA HMII'
                            style={{ width: '225px' }}
                        />
                        <img
                            src='https://services.swpc.noaa.gov/images/animations/lasco-c3/20240327_1618_c3_512.jpg'
                            alt='NOAA Lasco-C3'
                            style={{ width: '225px' }}
                        />
                        <img
                            src='https://services.swpc.noaa.gov/images/animations/lasco-c2/20240327_1624_c2_512.jpg'
                            alt='NOAA Lasco-C2'
                            style={{ width: '225px' }}
                        />
                    </div>
                </div>
                <div className='spaceWeatherHeader'>
                  {/*This page will contain gif's of the weather on our Sun. */}  
                    <div style={{
                        color: 'Blue',        // temp styling
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}> {/* Please wait for Gif Generation. */}  </div>
                    {/* Render the selected GIF */}
                    {gifArray.length > 0 && (
                        <div className='selected-gif-container'>
                            <h3>Selected GIF:</h3>
                            <h2>THE SUN (EUV):</h2>
                            <img src={gifArray[selectedGifIndex]} alt={`Selected GIF ${selectedGifIndex}`} />
                            <br></br>
                            <div className='infoList'> Aurora Forecast </div>
                            {/*<div className='infoList' onClick={() => this.handleDownload(selectedGifIndex)}>Download GIF</div >*/}
                            {/* Add any additional content for the selected GIF */}
                        </div>
                    )}
                    <div class="gif-container">
                        {progress !== 0 && <label>Loading... {progress}%</label>}
                        <div className="gif-container">
                            {gifArray.map((gif, index) => (
                                <div key={index} className="gif-item">
                                    <img src={gif} alt={`Generated GIF ${index}`} />
                                    <br></br>
                                    <div className='infoList' onClick={() => this.handleDownload(gif)}>Download GIF</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div class="spaceFooter">
                    <h6><i>Last Updated on </i></h6>
                    <p>{this.state.now.toString()}</p>
                    <p class="centered">version 3.1.0</p>
                </div>
            </div>

        );
    }

}

export default App;
