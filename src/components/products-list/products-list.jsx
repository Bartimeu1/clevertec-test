import React from 'react';
import './products-list.scss';

import { ProductsItem } from '../products-item/products-item';

export function ProductsList({ booksData, productsView }) {
  return (
    <div className={productsView === 'tile' ? 'products-view--tile' : 'products-view--list'}>
      {booksData ? (
        <React.Fragment>
          {booksData.map((product) => (
            <ProductsItem
              view={productsView}
              key={product.id}
              id={product.id}
              title={product.title}
              authors={product.authors}
              rating={product.rating}
              image={product.image}
              booking={product.booking}
            />
          ))}
        </React.Fragment>
      ) : null}
    </div>
  );
}
