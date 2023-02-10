import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './book.scss';

// import required modules
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';

// import Reviews Data
import { reviews } from '../../data';

// import images
import unloaded from '../../assets/images/bookUnloaded.png';
import reviewProfile from '../../assets/images/reviewProfile.svg';
import chevron from '../../assets/images/chevronDark.svg';

// Components
import { StarRating } from '../star-rating/star-rating';
import { Icon } from '../icon/icon';
import { Container } from '../container/container';
import { Menu } from '../menu/menu';

export function Book({ bookGenres }) {
  // Take Data From Location State
  const location = useLocation();
  const { bookInfo } = location.state;
  const { title, author, rating, gallery, booked, view, id } = bookInfo;

  // Reviews toggle
  const [reviewsActive, setReviewsActive] = useState(false);
  const toggleReviews = () => {
    setReviewsActive((prevState) => !prevState);
  };

  // Swiper logic
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className='book'>
      <Menu onlyMobile={true} bookGenres={bookGenres} />
      <Container className='book-container'>
        <div className='book-view'>
          <div className='book-view-block'>
            {gallery.length > 0 ? (
              <div className='book-view-sliders'>
                <Swiper
                  data-test-id='slide-big'
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation={false}
                  pagination={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs, Pagination]}
                  className='book-slider-1'
                >
                  {gallery.map((image) => (
                    <SwiperSlide key={Math.random()}>
                      <img src={image} alt='view' />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={30}
                  slidesPerView={5}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className={classNames('book-slider-2', { hidden: gallery.length === 1 })}
                >
                  {gallery.map((image) => (
                    <SwiperSlide key={Math.random()} data-test-id='slide-mini'>
                      <img src={image} alt='view' />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <img data-test-id='slide-big' className='book-view-img--unloaded' alt='book' src={unloaded} />
            )}
            <div className='book-view-info'>
              <h2 className='book-view-title'>{title}</h2>
              <p className='book-view-author'>{author}</p>
              {booked ? (
                <button type='button' className='book-view-button book-view-button--booked'>
                  Занята до 03.05
                </button>
              ) : (
                <button type='button' className='book-view-button'>
                  Забронировать
                </button>
              )}
              <div className='book-about'>
                <p className='book-about-title book-title'>О книге</p>
                <p className='book-about-text'>
                  Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были
                  кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального
                  Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на
                  это свое время?
                </p>
                <p className='book-about-text'>
                  Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
                  алгоритмы — это веселое и увлекательное занятие.
                </p>
              </div>
            </div>
          </div>
          <div className='book-about book-about--tablet'>
            <p className='book-about-title book-title'>О книге</p>
            <p className='book-about-text'>
              Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
              решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
              изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
              время?
            </p>
            <p className='book-about-text'>
              Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
              алгоритмы — это веселое и увлекательное занятие.
            </p>
          </div>
        </div>
        <div className='book-rating'>
          <p className='book-rating-title book-title'>Рейтинг</p>
          <div className='book-rating-block'>
            <StarRating rating={rating} />
            {rating != null ? <p className='book-rating-number book-title'>{rating}</p> : null}
          </div>
        </div>
        <div className='book-info'>
          <p className='book-info-title book-title'>Подробная информация</p>
          <div className='book-info-items'>
            <div className='book-info-block'>
              <ul className='book-info-column'>
                <li>
                  <p className='book-info-text'>Издательство</p>
                  <p className='book-info-value'>Питер</p>
                </li>
                <li>
                  <p className='book-info-text'>Год издания</p>
                  <p className='book-info-value'>2019</p>
                </li>
                <li>
                  <p className='book-info-text'>Страниц</p>
                  <p className='book-info-value'>288</p>
                </li>
                <li>
                  <p className='book-info-text'>Переплёт</p>
                  <p className='book-info-value'>Мягкая обложка</p>
                </li>
                <li>
                  <p className='book-info-text'>Формат</p>
                  <p className='book-info-value'>70х100</p>
                </li>
              </ul>
            </div>
            <div className='book-info-block'>
              <ul className='book-info-column'>
                <li>
                  <p className='book-info-text'>Жанр</p>
                  <p className='book-info-value'>Компьютерная литература</p>
                </li>
                <li>
                  <p className='book-info-text'>Вес</p>
                  <p className='book-info-value'>370 г</p>
                </li>
                <li>
                  <p className='book-info-text'>ISBN</p>
                  <p className='book-info-value'>978-5-4461-0923-4</p>
                </li>
                <li>
                  <p className='book-info-text'>Изготовитель</p>
                  <p className='book-info-value'>
                    ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {rating != null ? (
          <div className='book-reviews'>
            <button
              type='button'
              data-test-id='button-hide-reviews'
              className={classNames('book-reviews-topper', { active: reviewsActive })}
              onClick={() => toggleReviews()}
            >
              <div className='book-reviews-topper-info'>
                <p className='book-reviews-title book-title'>Отзывы</p>
                <p className='book-reviews-amount'>3</p>
              </div>
              <img src={chevron} alt='chevron' />
            </button>
            {reviews.map((review) => (
              <div key={review.id} className={classNames('book-reviews-block', { opened: reviewsActive })}>
                <div className='book-reviews-profile'>
                  <Icon src={reviewProfile} alt='photo' />
                  <div className='book-reviews-info'>
                    <p className='book-reviews-text'>{review.name}</p>
                    <p className='book-reviews-text'>{review.date}</p>
                  </div>
                </div>
                <StarRating rating={4} />
                <p className='book-reviews-report'>{review.report}</p>
              </div>
            ))}
            <button type='button' data-test-id='button-rating' className='book-reviews-button'>
              оценить книгу
            </button>
          </div>
        ) : (
          <div className='book-reviews book-reviews--empty'>
            <div className='book-reviews-topper'>
              <p className='book-reviews-title book-title'>Отзывы</p>
              <p className='book-reviews-amount'>0</p>
            </div>
            <button type='button' className='book-reviews-button'>
              оценить книгу
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
