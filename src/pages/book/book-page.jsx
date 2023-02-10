import React from 'react';
import './book-page.scss';

import { Navigation } from '../../components/navigation/navigation';
import { Book } from '../../components/book/book';

export function BookPage({ bookGenres }) {
  return (
    <div className='book-page'>
      <Navigation />
      <Book bookGenres={bookGenres} />
    </div>
  )
}
