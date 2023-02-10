import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navigation.scss';

export function Navigation() {
  // Take Data From Location State
  const location = useLocation();
  const { bookInfo } = location.state;
  const { title, id } = bookInfo;

  return (
    <nav className='navigation'>
      <div className='navigation-container'>
        <Link 
          to='/' 
          className='navigation-link'
        >Бизнес книги</Link>
        <span>/</span>
        <Link 
          to='/'
          className='navigation-link' 
          onClick={(event) => event.preventDefault()}
        >{title}</Link>
      </div>
    </nav>
  )
}
