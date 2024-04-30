import React, { Component } from 'react';
import { createGIF } from 'gifshot';
import ImageModal from './ImageModal.js';
//const fs = require('fs');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            gifSrc: null,
            now: new Date(),
            gifArray: [],
            imageArray: [],
            selectedGifIndex: 0, // Initialize selectedGifIndex to 0
            selectedGifUrl: null, // Initialize selected GIF URL to null
            imageUrlsArrayAll: [],
            selectedImageUrl: null,
            modalVisible: false,
            imageUrls: [
                'https://services.swpc.noaa.gov/experimental/images/aurora_dashboard/tonights_static_viewline_forecast.png',
                'https://services.swpc.noaa.gov/experimental/images/aurora_dashboard/tomorrow_nights_static_viewline_forecast.png'
            ]
        };
    }

    componentDidMount() {
        this.fetchImageFilenames();
    }


    fetchImageFilenames = async (imageUrls) => {
        try {
            // Array of URLs to fetch
            const urls = [
                'https://services.swpc.noaa.gov/products/animations/ovation_north_24h.json',
                'https://services.swpc.noaa.gov/products/animations/suvi-secondary-304.json',  //
                'https://services.swpc.noaa.gov/products/animations/suvi-secondary-195.json',   // THE SUN (EUV)
                'https://services.swpc.noaa.gov/products/animations/suvi-primary-131.json',        //
                'https://services.swpc.noaa.gov/products/animations/suvi-secondary-171.json',    //
                'https://services.swpc.noaa.gov/products/animations/suvi-secondary-284.json',  //
                'https://services.swpc.noaa.gov/products/animations/suvi-primary-094.json',
                'https://services.swpc.noaa.gov/products/animations/sdo-hmii.json',
                'https://services.swpc.noaa.gov/products/animations/lasco-c3.json',
                'https://services.swpc.noaa.gov/products/animations/lasco-c2.json',
            ];

            // Fetch all resources concurrently using Promise.all
            const responses = await Promise.all(urls.map(url => fetch(url)));

            // Extract JSON data from each response
            const jsonDataArray = await Promise.all(responses.map(response => response.json()));


            /************** Extract the FIRST image URL from each JSON data to show on the landing page****************/
            const imageUrlsArray = jsonDataArray.map(jsonData => {
                const firstItem = jsonData[0]; // Use [0] to get the first item from the URL 
                if (firstItem) {
                    return `https://services.swpc.noaa.gov${firstItem.url}`;
                } else {
                    return null; // or handle empty data accordingly
                }
            });

            // Extract image URLs from the JSON data and store them in an array to access later.
            const imageUrlsArrayAll = jsonDataArray.map(jsonData => jsonData.map(item => `https://services.swpc.noaa.gov${item.url}`));

            console.log('imageUrlsArrayAll:', imageUrlsArrayAll);

            // Filter out any null values (if any)
            const filteredImageUrlsArray = imageUrlsArray.filter(url => url !== null);

            // Set the state with the filtered image URLs
            this.setState({ imageUrlsArray: filteredImageUrlsArray });

            // Append the filtered image URLs to the existing array
            imageUrls.push(...filteredImageUrlsArray);

            // Return the updated array
            return imageUrls;

        } catch (error) {
            console.error('Error fetching images:', error);
            // Handle error accordingly
        }
    }

    handleImageClick = (imageUrls) => {
        this.setState({ selectedImageUrl: imageUrls, modalVisible: true });
    }

    handleCloseModal = () => {
        this.setState({ modalVisible: false });
    }

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
        const { progress, gifArray, selectedGifIndex, imageUrlsArray, imageUrls, modalVisible, selectedImageUrl } = this.state;
        return (
            <div>
                <div className='spaceWeatherHeader'>
                    <h1>Space Weather Prediction Center NOAA</h1>
                </div>
                <div>
                    <div className='aurora'>
                        {/* This prints out the Aurora forecast prediction. */}
                        {
                            imageUrls && imageUrls.map((imageUrl1, index) => ( // Add null check here
                                <div key={index} className="gif-item">
                                    <img src={imageUrl1} alt={`Image ${index}`} style={{ width: '250px' }} />
                                    <div className='infoList' onClick={() => this.handleImageClick(imageUrl1)}>
                                        Click to view image
                                    </div>
                                </div>
                            ))
                        }
                        {/* This prints out the Suns current images. */}
                        {
                            imageUrlsArray && imageUrlsArray.map((imageUrls, index) => ( // Add null check here
                                <div key={index} className="gif-item">
                                    <img src={imageUrls} alt={`Image ${index}`} style={{ width: '250px' }} />
                                    <div className='infoList' onClick={() => this.handleImageClick(imageUrls)}>
                                        Click to view image
                                    </div>
                                </div>
                            ))
                        }
                    </div >
                </div >
                {/* Render the modal*/}
                {modalVisible && selectedImageUrl &&
                    <ImageModal imageUrl={selectedImageUrl} onClose={this.handleCloseModal} />
                }
                {/*Code below was to generate the GIF upon landing on the page. This was very ineffiecient, had to change approach. */}

                < div className='spaceWeatherHeader' >
                    {/*This page will contain gif's of the weather on our Sun. */}
                    < div style={{
                        color: 'Blue',        // temp styling
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }
                    }> {/* Please wait for Gif Generation. */}  </div >
                    {/* Render the selected GIF */}
                    {
                        gifArray.length > 0 && (
                            <div className='selected-gif-container'>
                                <h3>Selected GIF:</h3>
                                <h2>THE SUN (EUV):</h2>
                                <img src={gifArray[selectedGifIndex]} alt={`Selected GIF ${selectedGifIndex}`} />
                                <br></br>
                                <div className='infoList'> Aurora Forecast </div>
                                {/*<div className='infoList' onClick={() => this.handleDownload(selectedGifIndex)}>Download GIF</div >*/}
                                {/* Add any additional content for the selected GIF */}
                            </div>
                        )
                    }
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
                </div >
                <div class="spaceFooter">
                    <h6><i>Last Updated on </i></h6>
                    <p>{this.state.now.toString()}</p>
                    <p class="centered">version 3.1.0</p>
                </div>
            </div >

        );
    }

}

export default App;



// Generate GIFs with the extracted image URLs
/* const gifArray = [];
 for (const imageUrls of imageUrlsArray) {
     const gif = await this.generateGIF(imageUrls);
     gifArray.push(gif);
     //This will call the handledownload to automatically download the gif to downloads folder. 
     //this.handleDownload(gif);
 }

// Now, gifArray contains all the generated GIFs
const gifArray = [];
const numberOfGIFs = gifArray.length;
console.log(`Number of GIFs: ${numberOfGIFs}`);
this.setState({ gifArray, progress: 0 });
} catch (error) {
console.error('Error fetching image filenames:', error);
}*/