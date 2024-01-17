import React, { useState, useEffect } from 'react';
import AppMode from "./../AppMode.js";

class SpaceWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageFilenames: [],
        };
    }

    fetchImageFilenames = async () => {
        try {
            const response = await fetch('https://services.swpc.noaa.gov/images/animations/suvi/primary/304/');
            const html = await response.text();

            // Extract image filenames from HTML content (you may need to adjust this based on the actual HTML structure)
            const filenames = html.match(/[a-zA-Z0-9_-]+\.png/g) || [];

            // Filter out filenames that lead to a "Not Found" error
            const filteredFilenames = await Promise.all(filenames.map(async (filename) => {
                const imageUrl = `https://services.swpc.noaa.gov/images/animations/suvi/primary/304/${filename}`;

                try {
                    const imageResponse = await fetch(imageUrl);

                    if (imageResponse.ok) {
                        return filename; // Include the filename in the list
                    }
                } catch (error) {
                    console.error(`Error checking image existence for ${filename}:`, error);
                }

                return null; // Exclude the filename
            }));

            // Remove null values (filenames that led to a "Not Found" error)
            const validFilenames = filteredFilenames.filter(Boolean);

            // Set the valid image filenames in state
            this.setState({ imageFilenames: validFilenames });
        } catch (error) {
            console.error('Error fetching image filenames:', error);
        }
    };

    componentDidMount() {
        // Fetch the list of image filenames
        this.fetchImageFilenames();
    }

    handleChange = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.SPACEURLS);
    }

    render() {
        return (
            <div>
                  <div className="siteMap" onClick={this.handleChange} >&nbsp;Space Videos</div>
                {this.state.imageFilenames.length > 0 ? (
                    <div>
                        <h2>Image Gallery</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {this.state.imageFilenames.map((filename, index) => (
                                <img
                                    key={index}
                                    src={`https://services.swpc.noaa.gov/images/animations/suvi/primary/304/${filename}`}
                                    alt={`Image ${index + 1}`}
                                    style={{ width: '300px', height: '300px', margin: '5px' }}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

              
            </div>
        );
    }
}

export default SpaceWeather;