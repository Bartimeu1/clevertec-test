import React from 'react';
import { useParams } from 'react-router-dom';
import './products-list.scss';

import { ProductsItem } from '../products-item/products-item';

export function ProductsList({ visibleBooks, productsView, currentSearch }) {
  // Choice category from router params
  const { category } = useParams();

  return (
    <div className={productsView === 'tile' ? 'products-view--tile' : 'products-view--list'}>
      {visibleBooks &&
        visibleBooks.map((product) => (
          <ProductsItem
            currentSearch={currentSearch}
            category={category}
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
    </div>
  );
}
