import React from 'react';

class ImageModal extends React.Component {
    render() {
        const { imageUrl, onClose } = this.props;
        return (
            <div className="modal" role="dialog">
                <div className="modal-content">
                    <div>
                        <div className='modal-header'>
                            <p className='modal-title'></p>
                            <button className="close" onClick={onClose}>&times;</button>
                        </div>
                        <img src={imageUrl} alt="Image" />
                    </div>
                    <div className='modal-footer'>
                        <button className='modal-submit-btn' onClick={onClose}>close</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageModal;
