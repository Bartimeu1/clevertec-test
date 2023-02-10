import React from 'react';
import './main-page.scss';

import { Menu } from '../../components/menu/menu';
import { Products } from '../../components/products/products';
import { Container } from '../../components/container/container';

export function MainPage({ bookGenres }) {

  return (
    <div className='main'>
      <Container className='container--main'>
        <Menu bookGenres={bookGenres} current='books' />
        <Products />
      </Container>
    </div>
  )
}
