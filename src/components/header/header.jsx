import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { logOut } from '../../store/auth/auth-slice';
import './header.scss';

// Images
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.png';

// Components
import { Burger } from '../burger/burger';
import { Container } from '../container/container';
import { NavMenu } from '../nav-menu/nav-menu';

export function Header() {
  const dispatch = useDispatch();
  // Burger Logic
  const burgerRef = useRef(null);
  const [burgerActive, setBurgerActive] = useState(false);
  const toggleBurger = () => {
    setBurgerActive((prevState) => !prevState);
  };
  // Get category from url params
  const { category } = useParams();

  // Header profile logic
  const [profileActive, setProfileActive] = useState(false);
  const headerProfileExist = window.innerWidth > 1055;

  return (
    <header className='header'>
      <NavMenu mobile={true} burgerActive={burgerActive} burgerRef={burgerRef} toggleBurger={toggleBurger} />
      <Container className='header-container'>
        <div className='header-info'>
          <Link to={`/books/${category}`} className='header-info-link'>
            <img src={logo} alt='logo' className='header-logo' />
          </Link>
          <Burger burgerActive={burgerActive} toggleBurger={toggleBurger} burgerRef={burgerRef} />
          <h1 className='header-title'>Библиотека</h1>
        </div>
        <div className='header-profile'>
          <button
            className='header-profile-toggle'
            onClick={() => setProfileActive((prevState) => !prevState)}
            type='button'
          >
            <p className='header-profile-text'>Привет, Иван!</p>
            <img src={avatar} alt='avatar' className='header-profile-image' />
          </button>
          {headerProfileExist && (
            <div className={classNames('header-profile-menu', { active: profileActive })}>
              <Link to='#' className='header-profile-button'>
                Профиль
              </Link>
              <button
                data-test-id='exit-button'
                type='button'
                className='header-profile-button'
                onClick={() => dispatch(logOut())}
              >
                Выход
              </button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
