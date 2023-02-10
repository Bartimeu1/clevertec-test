import React from 'react';
import './products-list.scss';

import { ProductsItem } from '../products-item/products-item';

export function ProductsList({ products, productsView }) {
  return (
    <div 
      className={productsView === 'tile' ? 
      'products-view--tile' : 'products-view--list'}
    >
      {products.map((product) => (
        <ProductsItem
          view={productsView}
          key={product.id}
          id={product.id}
          title={product.title}
          author={product.author}
          rating={product.rating}
          gallery={product.gallery}
          booked={product.booked}
        />
      ))}
    </div>
  )
}
