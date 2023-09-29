import React, { useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/auth/auth-slice';
import { useGetCategoriesQuery, useGetBooksQuery } from '../../store/data/data.api';
import { useClickOutside } from '../../hooks/use-outside-click';
import './nav-menu.scss';

import { MenuLink } from '../menu-link/menu-link';

import chevron from '../../assets/images/chevron.svg';

export function NavMenu({ mobile, burgerActive, toggleBurger, burgerRef }) {
  const dispatch = useDispatch();
  // Check if the books page is current
  const location = useLocation();
  const isBooksPage = location.pathname.includes('/books');

  // Get data information
  const { data: booksData, error: booksError } = useGetBooksQuery();
  const { data: categoriesData, error: categoriesError } = useGetCategoriesQuery();

  // Dropdown logic
  const [dropdownActive, setDropdownActive] = useState(true);
  const toggleDropdown = () => {
    setDropdownActive((prevState) => !prevState);
  };

  // Calculate amount of books for categories
  const calcAmount = (name) => {
    let filteredArr = [];
    if (booksData) {
      filteredArr = booksData.filter((book) => book.categories.includes(name));
    }
    return filteredArr.length;
  };

  // Hide menu when click was outside the component
  const domNode = useClickOutside(() => {
    toggleBurger();
  }, burgerRef);

  // Data attrs
  const testIdShowcase = window.innerWidth > 768 ? 'navigation-showcase' : 'burger-showcase';
  const testIdTerms = window.innerWidth > 768 ? 'navigation-terms' : 'burger-terms';
  const testIdContract = window.innerWidth > 768 ? 'navigation-contract' : 'burger-contract';

  return (
    <nav
      data-test-id='burger-navigation'
      ref={burgerActive ? domNode : null}
      className={classNames('menu', { mobile, visible: burgerActive })}
    >
      {isBooksPage ? (
        <button
          type='button'
          data-test-id={testIdShowcase}
          className={dropdownActive ? 'dropdown dropdown--active' : 'dropdown'}
          onClick={() => toggleDropdown()}
        >
          Витрина книг
          <img
            src={chevron}
            alt='chevron'
            className={classNames('dropdown-img', { hidden: categoriesError || booksError })}
          />
        </button>
      ) : (
        <MenuLink to='/books/all' className='menu-link'>
          Витрина книг
        </MenuLink>
      )}
      {!categoriesError && !booksError && categoriesData ? (
        <div className={classNames('menu-showcase showcase', { visible: isBooksPage && dropdownActive })}>
          <MenuLink
            to='/books/all'
            dataTestId={mobile ? `burger-books` : `navigation-books`}
            className='showcase-all'
            filter='Все книги'
            closeToggle={mobile && toggleBurger}
          >
            Все книги
          </MenuLink>
          {categoriesData.map((item) => (
            <MenuLink
              key={item.id}
              to={`/books/${item.path}`}
              className='showcase-link'
              filter={item.name}
              closeToggle={mobile && toggleBurger}
            >
              <div className='showcase-link-title'>
                <span
                  className='showcase-link-name'
                  data-test-id={mobile ? `burger-${item.path}` : `navigation-${item.path}`}
                >
                  {item.name}
                </span>
                <span
                  className='showcase-link-amount'
                  data-test-id={
                    mobile ? `burger-book-count-for-${item.path}` : `navigation-book-count-for-${item.path}`
                  }
                >
                  {calcAmount(item.name)}
                </span>
              </div>
            </MenuLink>
          ))}
        </div>
      ) : null}
      <MenuLink to='/terms' className='menu-link' dataTestId={testIdTerms}>
        Правила пользования
      </MenuLink>
      <MenuLink to='/contract' className='menu-link' dataTestId={testIdContract}>
        Договор оферты
      </MenuLink>
      <div className='menu-profile'>
        <MenuLink to='#' className='menu-link'>
          Профиль
        </MenuLink>
        <button data-test-id='exit-button' type='button' className='menu-link' onClick={() => dispatch(logOut())}>
          Выход
        </button>
      </div>
    </nav>
  );
}
