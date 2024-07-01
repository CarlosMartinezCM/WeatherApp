import React from 'react';
import Modal from 'react-modal'; // Assuming you're using react-modal

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Custom Modal"
      className="customModalContent"
      overlayClassName="customModalOverlay"
    >
      <button onClick={onRequestClose}>Close Modal</button>
      <div className="modal-content">
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
