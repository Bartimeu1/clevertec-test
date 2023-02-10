import React from 'react';
import { Link } from 'react-router-dom';
import './products-item.scss';

import unloaded from '../../assets/images/bookUnloaded.png';

import { StarRating } from '../star-rating/star-rating';

export function ProductsItem(props) {
  const { title, author, rating, gallery, booked, view, id } = props;

  return (
    <>
      {view === 'tile' ? (
        <Link
          state={{ bookInfo: props }}
          className='products-item products-item--tile'
          data-test-id='card'
          to={`/book/${id}`}
        >
          {gallery.length > 0 ? (
            <img src={gallery[0]} alt='book' className='item-image item-image--tile' />
          ) : (
            <img src={unloaded} alt='unloaded' className='item-image item-image--tile' />
          )}
          <StarRating rating={rating} />
          <h3 className='item-title item-title--tile'>{title}</h3>
          <p className='item-author item-author--tile'>{author}</p>
          {booked ? (
            <button type='button' disabled={true} className='item-button item-button--tile item-button--booked'>
              Забронирована
            </button>
          ) : (
            <button type='button' className='item-button item-button--tile'>
              Забронировать
            </button>
          )}
        </Link>
      ) : (
        <Link
          state={{ bookInfo: props }}
          className='products-item products-item--list'
          data-test-id='card'
          to={`/book/${id}`}
        >
          {gallery.length > 0 ? (
            <img src={gallery[0]} alt='book' className='item-image item-image--list' />
          ) : (
            <img src={unloaded} alt='unloaded' className='item-image item-image--list' />
          )}
          <div className='item-info'>
            <div className='item-info-text'>
              <h3 className='item-title item-title--list'>{title}</h3>
              <p className='item-author item-author--list'>{author}</p>
            </div>
            <div className='item-info-block'>
              <StarRating rating={rating} />
              {booked ? (
                <button type='button' disabled={true} className='item-button item-button--list item-button--booked'>
                  Забронирована
                </button>
              ) : (
                <button type='button' className='item-button item-button--list'>
                  Забронировать
                </button>
              )}
            </div>
          </div>
        </Link>
      )}
      {/* this comment is a placeholder to use the react fragment */}
    </>
  );
}
