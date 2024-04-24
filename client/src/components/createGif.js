import React, { Component } from 'react';
import gifshot from 'gifshot';

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            gifDataUrl: '',
            frameDuration: '',
            customSpeed: '',
            newValue: ''
        };
    }

    handleImageUpload = (event) => {
        const files = Array.from(event.target.files);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = (event) => {
                this.setState(prevState => ({
                    images: [...prevState.images, event.target.result],
                }));
            };

            reader.readAsDataURL(file);
        });
    }

    createGif = () => {
        const { customSpeed } = this.state;
        const frameDuration = parseFloat(customSpeed); // Convert customSpeed to a float
        // Check if frameDuration is a positive number
    if (frameDuration <= 0 || isNaN(frameDuration)) {
        alert('Please enter a positive number for the speed and clock on Create GIF again.');
        return; // Exit the function if the speed is not valid
    }

        gifshot.createGIF({
            images: this.state.images,
            gifWidth: 200,
            gifHeight: 200,
            numWorkers: 10,
            frameDuration: frameDuration,
            sampleInterval: 12,
        }, (obj) => {
            if (!obj.error) {
                this.setState({ gifDataUrl: obj.image });
            }
        });
    }

    render() {
        return (
            <div className='GifContainer'>
                <input type="file" accept="image/*" multiple onChange={this.handleImageUpload} />
                <button onClick={() => this.createGif(this.state.frameDuration)}>Create GIF</button>
                <div>
                    {this.state.images.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                    ))}
                </div>
                {this.state.gifDataUrl && (
                    <div>
                        <img src={this.state.gifDataUrl} alt="Generated GIF" />
                        <a href={this.state.gifDataUrl} download="generated.gif">Download GIF</a>
                    </div>
                )}
                {/* Input field for custom speed */}
                <input
                    type="text"
                    value={this.state.customSpeed}
                    onChange={(e) => {
                        //Ensure that only positive numbers are allowed
                        const newValue = e.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except for dot
                        this.setState({ customSpeed: e.target.value });
                    }}
                    pattern="[0-9]*" // Accept only numbers
                    placeholder="Enter custom speed (seconds)"
                    className="custom-input" // Apply custom styling class
                />

            </div>
        );
    }

}

export default ImageUploader;
