import React, { useState } from 'react';
import './products.scss';

import { books } from '../../data';

import { Controls } from '../controls/controls';
import { ProductsList } from '../products-list/products-list';

export function Products() {
  const [productsView, setProductsView] = useState('tile');

  return (
    <div className='products'>
      <Controls 
        productsView={productsView}
        setProductsView={setProductsView}
      />
      <ProductsList 
        productsView={productsView}
        products={books}
      />
    </div>
  )
}
