import React from 'react';
import './Modal.css';  // You can style your modal using this file

export const Modal =  ({ closeModal, title, subtitle }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="close-button" onClick={closeModal}>&times;</div>
{
    title &&         <h2>{title}</h2>
}
        {
            subtitle && <p>{subtitle}</p>
        }
      </div>
    </div>
  );
}

