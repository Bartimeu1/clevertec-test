import React, { useState } from 'react';
import './nav-menu.scss';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useGetCategoriesQuery, useGetBooksQuery } from '../../store/data/data.api';
import { useClickOutside } from '../../hooks/use-outside-click';

import { MenuLink } from '../menu-link/menu-link';

import chevron from '../../assets/images/chevron.svg';

export function NavMenu({ mobile, burgerActive, toggleBurger, burgerRef }) {
  // Check if the books page is current
  const location = useLocation();
  const isBooksPage = location.pathname.includes('/books');

  // Get data information
  const { error: booksError } = useGetBooksQuery();
  const { data: categoriesData, error: categoriesError } = useGetCategoriesQuery();

  // Dropdown logic
  const [dropdownActive, setDropdownActive] = useState(true);
  const toggleDropdown = () => {
    setDropdownActive((prevState) => !prevState);
  };

  // Hide menu when click was outside the component
  const domNode = useClickOutside(() => {
    toggleBurger();
  }, burgerRef);

  // Data attrs
  const testIdShowcase = window.innerWidth > 768 ? 'navigation-showcase' : 'burger-showcase';
  const testIdAll = window.innerWidth > 768 ? 'navigation-books' : 'burger-books';
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
          <img src={chevron} alt='chevron' className={classNames('dropdown-img', { hidden: categoriesError || booksError})} />
        </button>
      ) : (
        <MenuLink to='/books/all' className='menu-link'>
          Витрина книг
        </MenuLink>
      )}
      {!categoriesError && !booksError && categoriesData ? (
        <div className={classNames('menu-showcase showcase', { visible: isBooksPage && dropdownActive })}>
          <MenuLink to='/books/all' dataTestId={testIdAll} className='showcase-all'>
            Все книги
          </MenuLink>
          {categoriesData.map((item) => (
            <MenuLink key={item.id} to={`/books/${item.path}`} className='showcase-link'>
              <div className='showcase-link-title'>
                {item.name}
                <span className='showcase-link-amount'>{5}</span>
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
        <MenuLink to='/profile' className='menu-link'>
          Профиль
        </MenuLink>
        <MenuLink to='/exit' className='menu-link'>
          Выход
        </MenuLink>
      </div>
    </nav>
  );
}
