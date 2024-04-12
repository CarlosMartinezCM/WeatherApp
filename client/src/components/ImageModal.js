import React from 'react';

class ImageModal extends React.Component {
    render() {
        const { imageUrl, onClose } = this.props;
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <img src={imageUrl} alt="Image" />
                </div>
            </div>
        );
    }
}

export default ImageModal;
