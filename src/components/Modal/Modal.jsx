import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

function Modal({ closeModal, picture, alt }) {
  useEffect(() => {
    const handleEscape = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeModal]);

  const handleCloseModal = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="Overlay" onClick={handleCloseModal}>
      <div className="Modal">
        <img src={picture} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export { Modal };
