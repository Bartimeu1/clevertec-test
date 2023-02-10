import React from 'react';
import './star-rating.scss';

import starFull from '../../assets/images/starFull.svg';
import starEmpty from '../../assets/images/starEmpty.svg';

import { Icon } from '../icon/icon';

export function StarRating({ rating }) {
  return (
    <>
      {rating != null ?
        <div className='rating'>
        <Icon src={starFull} />
        <Icon src={starFull} />
        <Icon src={starFull} />
        <Icon src={starFull} />
        <Icon src={starEmpty} />
        </div> :
        <p className="rating-text">ещё нет оценок</p>
      }
      {/* this comment is a placeholder to use the react fragment */}
    </>
  )
}
