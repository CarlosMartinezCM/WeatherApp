import React from 'react';

class ImageModal extends React.Component {
    render() {
        const { imageUrl, onClose } = this.props;
        return (
            <div className='body' >
            <div className="modal" role="dialog">
                <div className="modal-content">
                    <div className='modal-header'>
                        <p className='modal-title'></p>
                        <button className="close" onClick={onClose}>&times;</button>
                    </div>
                    <img 
                        className='expanded-image'
                        src={imageUrl} alt="Generated GIF" />
                    <div className='modal-footer'>
                        <button className='modal-submit-btn' onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default ImageModal;
