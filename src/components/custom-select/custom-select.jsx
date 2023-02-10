import React from 'react';
import './custom-select.scss';

import sort from '../../assets/images/sort.svg';

import { Icon } from '../icon/icon';

export function CustomSelect() {
  return (
    <div className='select'>
      <Icon src={sort} alt='sort' />
      <p className="select-text">По рейтингу</p>
    </div>
  )
}
