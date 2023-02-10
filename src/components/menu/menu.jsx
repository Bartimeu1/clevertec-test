import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink, useLocation, useOutletContext } from 'react-router-dom';
import { useClickOutside } from '../../hooks/use-outside-click';
import './menu.scss';

import chevron from '../../assets/images/chevron.svg';

import { MenuLink } from '../menu-link/menu-link';

export function Menu({ bookGenres, onlyMobile }) {
  // Check if the books page is current
  const location = useLocation();
  const isBooksPage = location.pathname.includes('/books');

  // Take burger state from layout context
  const { isBurgerActive, setBurgerActive, burgerItem } = useOutletContext();

  // Dropdown logic
  const [dropdownActive, setDropdownActive] = useState(true);
  const toggleDropdown = () => {
    setDropdownActive((prevState) => !prevState);
  };

  // Hide menu when click was outside the component
  const domNode = useClickOutside(() => {
    setBurgerActive();
  }, burgerItem);

  // Data attrs
  
  const testIdShowcase = window.innerWidth > 768 ? 'navigation-showcase' : 'burger-showcase';
  const testIdAll = window.innerWidth > 768 ? 'navigation-books' : 'burger-books';
  const testIdTerms = window.innerWidth > 768 ? 'navigation-terms' : 'burger-terms';
  const testIdContract = window.innerWidth > 768 ? 'navigation-contract' : 'burger-contract';

  return (
    <menu
      data-test-id='burger-navigation'
      className={classNames('menu', { visible: isBurgerActive, hidden: onlyMobile })}
      ref={isBurgerActive ? domNode : null}
    >
      {isBooksPage ? (
        <button
          type='button'
          data-test-id={testIdShowcase}
          className={dropdownActive ? 'dropdown dropdown--active' : 'dropdown'}
          onClick={() => toggleDropdown()}
        >
          Витрина книг
          <img src={chevron} alt='chevron' className='dropdown-img' />
        </button>
      ) : (
        <MenuLink to='/books/all' className='menu-link'>
          Витрина книг
        </MenuLink>
      )}
      
      <div className={classNames('menu-showcase showcase', {visible: isBooksPage && dropdownActive})}>
        <MenuLink to='/books/all' dataTestId={testIdAll} className='showcase-all'>
          Все книги
        </MenuLink>
        {bookGenres.map((item) => (
          <MenuLink key={item.id} to={`/books/${item.value}`} className='showcase-link'>
            <div className='showcase-link-title'>
              {item.title}
              <span className='showcase-link-amount'>{item.amount}</span>
            </div>
          </MenuLink>
        ))}
      </div>
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
    </menu>
  );
}
