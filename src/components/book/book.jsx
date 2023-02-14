import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './book.scss';

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

export function Book({ bookData }) {
  const host = 'https://strapi.cleverland.by';
  // Reviews toggle
  const [reviewsActive, setReviewsActive] = useState(false);
  const toggleReviews = () => {
    setReviewsActive((prevState) => !prevState);
  };

  // Swiper logic
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {bookData ? (
        <div className='book'>
          <Container className='book-container'>
            <div className='book-view'>
              <div className='book-view-block'>
                {bookData.images.length > 0 ? (
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
                      {bookData.images.map((image) => (
                        <SwiperSlide key={Math.random()}>
                          <img src={host + image.url} alt='view' />
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
                      className={classNames('book-slider-2', { hidden: bookData.images.length === 1 })}
                    >
                      {bookData.images.map((image) => (
                        <SwiperSlide key={Math.random()} data-test-id='slide-mini'>
                          <img src={host + image.url} alt='view' />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                ) : (
                  <img data-test-id='slide-big' className='book-view-img--unloaded' alt='book' src={unloaded} />
                )}
                <div className='book-view-info'>
                  <h2 className='book-view-title'>{bookData.title}</h2>
                  <p className='book-view-author'>{bookData.authors.map((item) => item)}</p>
                  {bookData.booking ? (
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
                    <p className='book-about-text'>{bookData.description}</p>
                  </div>
                </div>
              </div>
              <div className='book-about book-about--tablet'>
                <p className='book-about-title book-title'>О книге</p>
                <p className='book-about-text'>{bookData.description}</p>
              </div>
            </div>
            <div className='book-rating'>
              <p className='book-rating-title book-title'>Рейтинг</p>
              <div className='book-rating-block'>
                <StarRating rating={bookData.rating} />
                {bookData.rating != null ? <p className='book-rating-number book-title'>{bookData.rating}</p> : null}
              </div>
            </div>
            <div className='book-info'>
              <p className='book-info-title book-title'>Подробная информация</p>
              <div className='book-info-items'>
                <div className='book-info-block'>
                  <ul className='book-info-column'>
                    <li>
                      <p className='book-info-text'>Издательство</p>
                      <p className='book-info-value'>{bookData.publish}</p>
                    </li>
                    <li>
                      <p className='book-info-text'>Год издания</p>
                      <p className='book-info-value'>{bookData.issueYear}</p>
                    </li>
                    <li>
                      <p className='book-info-text'>Страниц</p>
                      <p className='book-info-value'>{bookData.pages}</p>
                    </li>
                    <li>
                      <p className='book-info-text'>Переплёт</p>
                      <p className='book-info-value'>{bookData.cover}</p>
                    </li>
                    <li>
                      <p className='book-info-text'>Формат</p>
                      <p className='book-info-value'>{bookData.format}</p>
                    </li>
                  </ul>
                </div>
                <div className='book-info-block'>
                  <ul className='book-info-column'>
                    <li>
                      <p className='book-info-text'>Жанр</p>
                      <p className='book-info-value'>{bookData.categories.map((item) => item)}</p>
                    </li>
                    <li>
                      <p className='book-info-text'>Вес</p>
                      <p className='book-info-value'>{bookData.weight}</p>
                    </li>
                    <li>
                      <p className='book-info-text'>ISBN</p>
                      <p className='book-info-value'>{bookData.ISBN}</p>
                    </li>
                    <li>
                      <p className='book-info-text'>Изготовитель</p>
                      <p className='book-info-value'>{bookData.producer}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {bookData.rating != null ? (
              <div className='book-reviews'>
                <button
                  type='button'
                  data-test-id='button-hide-reviews'
                  className={classNames('book-reviews-topper', { active: reviewsActive })}
                  onClick={() => toggleReviews()}
                >
                  <div className='book-reviews-topper-info'>
                    <p className='book-reviews-title book-title'>Отзывы</p>
                    <p className='book-reviews-amount'>{bookData.comments.length}</p>
                  </div>
                  <img src={chevron} alt='chevron' />
                </button>
                {bookData.comments.map((review) => (
                  <div key={review.id} className={classNames('book-reviews-block', { opened: reviewsActive })}>
                    <div className='book-reviews-profile'>
                      <img
                        src={review.user.avatarUrl ? host + review.user.avatarUrl : reviewProfile}
                        alt='profilePhoto'
                      />
                      <div className='book-reviews-info'>
                        <p className='book-reviews-text'>
                          {review.user.firstName} {review.user.lastName}
                        </p>
                        <p className='book-reviews-text'>{review.createdAt}</p>
                      </div>
                    </div>
                    <StarRating rating={4} />
                    <p className='book-reviews-report'>{review.text}</p>
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
      ) : null}
      {/* this comment is a placeholder to use the react fragment */}
    </>
  );
}
