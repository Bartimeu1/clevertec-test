import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '../../store/data/data.api';
import './book-page.scss';

import { Navigation } from '../../components/navigation/navigation';
import { Book } from '../../components/book/book';
import { Loader } from '../../components/loader/loader';
import { Toast } from '../../components/toast/toast';

export function BookPage() {
  // Get params from url
  const { bookId } = useParams();
  // Get data by id
  const { data, isLoading, error } = useGetBookByIdQuery(bookId);

  return (
    <div className='book-page'>
      {isLoading ? <Loader /> : null}
      <Navigation title={data?.title} />
      {error ? <Toast /> : <Book bookData={data} />}
    </div>
  );
}
