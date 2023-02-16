import React from 'react';
import './loader.scss';

import loader from '../../assets/images/loader.png';

export function Loader() {
  return (
    <div className='loader' data-test-id='loader'>
      <div className='loader-content'>
        <img src={loader} alt='loader' className='loader-img' />
      </div>
    </div>
  );
}
