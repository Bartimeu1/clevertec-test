import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './modal.scss';

export function Modal({ title, text, buttonText, callback, navigatePath }) {
  const navigate = useNavigate();

  return (
    <div className='modal' data-test-id='status-block'>
      <h2 className='modal-title'>{title}</h2>
      <p className='modal-text'>{text}</p>
      <button
        className='modal-button'
        type='button'
        onClick={() => {
          navigate(navigatePath);
          if (callback) {
            callback();
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
