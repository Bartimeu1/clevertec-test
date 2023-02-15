import React, { useState } from 'react';
import './toast.scss';

import warning from '../../assets/images/warning.svg';
import toastClose from '../../assets/images/toastClose.svg';

export function Toast() {
  const [toastActive, setToastActive] = useState(true);

  return (
    <React.Fragment>
      {toastActive ? (
        <div className='toast' data-test-id='error'>
          <div className='toast-content'>
            <img src={warning} alt='warning' className='toast-warning' />
            <p className='toast-text'>Что-то пошло не так. Обновите страницу через некоторое время.</p>
          </div>
          <button type='button' className='toast-close' onClick={() => setToastActive(false)}>
            <img src={toastClose} alt='close' className='toast-close-img' />
          </button>
        </div>
      ) : null}
      {/* this comment is a placeholder to use the react fragment */}
    </React.Fragment>
  );
}
