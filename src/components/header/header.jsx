import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.png';

import { Burger } from '../burger/burger';
import { Container } from '../container/container';
import { NavMenu } from '../nav-menu/nav-menu';

export function Header() {
  // Burger Logic
  const burgerRef = useRef(null);
  const [burgerActive, setBurgerActive] = useState(false);
  const toggleBurger = () => {
    setBurgerActive((prevState) => !prevState);
  };

  return (
    <header className='header'>
      <NavMenu mobile={true} burgerActive={burgerActive} burgerRef={burgerRef} toggleBurger={toggleBurger} />
      <Container className='header-container'>
        <div className='header-info'>
          <Link to='/' className='header-info-link'>
            <img src={logo} alt='logo' className='header-logo' />
          </Link>
          <Burger burgerActive={burgerActive} toggleBurger={toggleBurger} burgerRef={burgerRef} />
          <h1 className='header-title'>Библиотека</h1>
        </div>
        <div className='header-profile'>
          <p className='header-profile-text'>Привет, Иван!</p>
          <img src={avatar} alt='avatar' className='header-profile-image' />
        </div>
      </Container>
    </header>
  );
}
