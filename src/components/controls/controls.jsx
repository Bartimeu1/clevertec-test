import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { toggleSort, changeSearch } from '../../store/controls/controls';
import './controls.scss';

import search from '../../assets/images/search.svg';
import cross from '../../assets/images/cross.svg';
import sort from '../../assets/images/sort.svg';
import sortDescending from '../../assets/images/sortDescending.svg';

import { ViewButton } from '../view-button/view-button';
import { Icon } from '../icon/icon';

export function Controls({ productsView, setProductsView }) {
  const dispatch = useDispatch();
  // Mobile input toggle
  const [inputActive, setInputActive] = useState(false);
  // Current sort
  const sortAscending = useSelector((state) => state.controls.sortAscending);

  return (
    <div className='controls'>
      <div className='controls-block'>
        <div className={classNames('controls-search', { active: inputActive })}>
          <input
            type='text'
            data-test-id='input-search'
            className='controls-search-input'
            style={{ backgroundImage: `url(${search})` }}
            onChange={(e) => dispatch(changeSearch(e.target.value))}
            placeholder='Поиск книги или автора…'
            value={useSelector((state) => state.controls.currentSearch)}
          />
          <button
            type='button'
            data-test-id='button-search-open'
            className='controls-search-button--mobile'
            onClick={() => setInputActive(true)}
          >
            <img src={search} alt='search' />
          </button>
          <button
            type='button'
            data-test-id='button-search-close'
            onClick={() => setInputActive(false)}
            className='controls-search-button--close'
          >
            <img src={cross} alt='close' />
          </button>
        </div>
        <button
          type='button'
          className='controls-select'
          data-test-id='sort-rating-button'
          onClick={() => dispatch(toggleSort())}
        >
          {sortAscending ? <Icon src={sort} alt='sort' /> : <Icon src={sortDescending} alt='sort' />}
          <p className='controls-select-text'>По рейтингу</p>
        </button>
      </div>
      <div className='controls-view'>
        <ViewButton
          type='button'
          mark='tile'
          active={productsView === 'tile' ? true : false}
          setProductsView={setProductsView}
        >
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.14773 3.5C3.79 3.5 3.5 3.79 3.5 4.14773V9.32955C3.5 9.68728 3.79 9.97727 4.14773 9.97727H9.32955C9.68728 9.97727 9.97727 9.68728 9.97727 9.32955V4.14773C9.97727 3.79 9.68728 3.5 9.32955 3.5H4.14773ZM4.79545 8.68182V4.79545H8.68182V8.68182H4.79545ZM11.9205 3.5C11.5627 3.5 11.2727 3.79 11.2727 4.14773V9.32955C11.2727 9.68728 11.5627 9.97727 11.9205 9.97727H17.1023C17.46 9.97727 17.75 9.68728 17.75 9.32955V4.14773C17.75 3.79 17.46 3.5 17.1023 3.5H11.9205ZM12.5682 8.68182V4.79545H16.4545V8.68182H12.5682ZM3.5 11.9205C3.5 11.5627 3.79 11.2727 4.14773 11.2727H9.32955C9.68728 11.2727 9.97727 11.5627 9.97727 11.9205V17.1023C9.97727 17.46 9.68728 17.75 9.32955 17.75H4.14773C3.79 17.75 3.5 17.46 3.5 17.1023V11.9205ZM4.79545 12.5682V16.4545H8.68182V12.5682H4.79545ZM11.9205 11.2727C11.5627 11.2727 11.2727 11.5627 11.2727 11.9205V17.1023C11.2727 17.46 11.5627 17.75 11.9205 17.75H17.1023C17.46 17.75 17.75 17.46 17.75 17.1023V11.9205C17.75 11.5627 17.46 11.2727 17.1023 11.2727H11.9205ZM12.5682 16.4545V12.5682H16.4545V16.4545H12.5682Z'
              fill='#A7A7A7'
            />
          </svg>
        </ViewButton>
        <ViewButton
          data-test-id='button-menu-view-list'
          type='button'
          mark='list'
          active={productsView === 'list' ? true : false}
          setProductsView={setProductsView}
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M1.3335 8.00004C1.3335 7.63185 1.63197 7.33337 2.00016 7.33337H14.0002C14.3684 7.33337 14.6668 7.63185 14.6668 8.00004C14.6668 8.36823 14.3684 8.66671 14.0002 8.66671H2.00016C1.63197 8.66671 1.3335 8.36823 1.3335 8.00004Z'
              fill='#A7A7A7'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M1.3335 4.00004C1.3335 3.63185 1.63197 3.33337 2.00016 3.33337H14.0002C14.3684 3.33337 14.6668 3.63185 14.6668 4.00004C14.6668 4.36823 14.3684 4.66671 14.0002 4.66671H2.00016C1.63197 4.66671 1.3335 4.36823 1.3335 4.00004Z'
              fill='#A7A7A7'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M1.3335 12C1.3335 11.6319 1.63197 11.3334 2.00016 11.3334H14.0002C14.3684 11.3334 14.6668 11.6319 14.6668 12C14.6668 12.3682 14.3684 12.6667 14.0002 12.6667H2.00016C1.63197 12.6667 1.3335 12.3682 1.3335 12Z'
              fill='#A7A7A7'
            />
          </svg>
        </ViewButton>
      </div>
    </div>
  );
}
