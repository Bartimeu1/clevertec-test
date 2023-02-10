import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.png';

import { Burger } from '../burger/burger';
import { Container } from '../container/container';

export function Header({ burgerActive, toggleBurger, setBurgerRef }) {
  return (
    <header className='header'>
      <Container className='header-container'>
        <div className='header-info'>
          <Link to='/' className='header-info-link'>
            <img src={logo} alt='logo' className='header-logo' />
          </Link>
          <Burger burgerActive={burgerActive} toggleBurger={toggleBurger} setBurgerRef={setBurgerRef} />
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
