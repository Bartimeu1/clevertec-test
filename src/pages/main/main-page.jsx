import React, { useEffect } from 'react';
import { useGetBooksQuery, useGetCategoriesQuery } from '../../store/data/data.api';
import './main-page.scss';

import { Products } from '../../components/products/products';
import { Loader } from '../../components/loader/loader';
import { Toast } from '../../components/toast/toast';

export function MainPage() {
  // Data logic
    const { isLoading: booksLoading, error: booksError, refetch } = useGetBooksQuery();
    const { isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className='main'>
      {booksLoading || categoriesLoading ? <Loader /> : null}
      {booksError || categoriesError ? <Toast /> : <Products />}
    </div>
  );
}
