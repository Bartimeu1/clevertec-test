import React from 'react';
import classNames from 'classnames';
import './star-rating.scss';

import starFull from '../../assets/images/starFull.svg';
import starEmpty from '../../assets/images/starEmpty.svg';

import { Icon } from '../icon/icon';

export function StarRating({ rating }) {
  return (
    <>
      {rating != null ? (
        <div className='rating'>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return ratingValue <= rating ? (
              <Icon src={starFull} key={ratingValue} />
            ) : (
              <Icon src={starEmpty} key={ratingValue} />
            );
          })}
        </div>
      ) : (
        <p className='rating-text'>ещё нет оценок</p>
      )}
      {/* this comment is a placeholder to use the react fragment */}
    </>
  );
}
