import { useState } from 'react';
import './products.scss';
import { useGetBooksQuery } from '../../store/data/data.api';

import { Controls } from '../controls/controls';
import { ProductsList } from '../products-list/products-list';

export function Products() {
  // Cards view
  const [productsView, setProductsView] = useState('tile');

  // Books data
  const {data: booksData} = useGetBooksQuery();

  return (
    <div className='products'>
      <Controls 
        productsView={productsView}
        setProductsView={setProductsView}
      />
      <ProductsList 
        productsView={productsView}
        booksData={booksData}
      />
    </div>
  )
}
