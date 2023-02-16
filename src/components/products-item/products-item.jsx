import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './products-item.scss';

import unloaded from '../../assets/images/bookUnloaded.png';

import { HOST } from '../../config';

import { StarRating } from '../star-rating/star-rating';

export function ProductsItem(props) {
  const { view, title, authors, rating, image, id, booking } = props;
  
  return (
    <Link className={`card card--${view}`} data-test-id='card' to={`/books/all/${id}`}>
      <div className='card-cover'>
        <img src={image ? HOST + image.url : unloaded} alt='unloaded' className='card-cover-image' />
      </div>
      <div className='card-info'>
        <div className='card-info-text'>
          <h3 className='card-info-title'>{title}</h3>
          <p className='card-info-author'>{authors.map((author) => author)}</p>
        </div>
        <div className='card-info-controls'>
          <div className="card-info-rating">
            <StarRating rating={rating} />
          </div>
          <button
            type='button'
            disabled={booking && true}
            className={classNames('card-info-button card-info-button--list', { booked: booking })}
          >
            {booking ? 'забронирована' : 'забронировать'}
          </button>
        </div>
        <button
            type='button'
            disabled={booking && true}
            className={classNames('card-info-button card-info-button--tile', { booked: booking })}
          >
            {booking ? 'забронирована' : 'забронировать'}
          </button>
      </div>
    </Link>
  );
}