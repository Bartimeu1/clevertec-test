import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './products.scss';
import { useGetBooksQuery } from '../../store/data/data.api';

import { Controls } from '../controls/controls';
import { ProductsList } from '../products-list/products-list';

export function Products() {
  // Cards view
  const [productsView, setProductsView] = useState('tile');

  // Books data
  const { data: booksData } = useGetBooksQuery();

  // Filtering and sorting of products
  const [visibleBooks, setVisibleBooks] = useState(booksData);
  const [emptyMessage, setEmptyMessage] = useState('');

  const currentFilter = useSelector((state) => state.controls.currentFilter);
  const currentSearch = useSelector((state) => state.controls.currentSearch);
  const sortAscending = useSelector((state) => state.controls.sortAscending);

  useEffect(() => {
    if (booksData) {
      let books = [];
      // Filtration of items
      books =
        currentFilter !== 'Все книги' ? booksData.filter((item) => item.categories.includes(currentFilter)) : booksData;
      if (books.length !== 0) {
        // Searching in items
        books =
          currentSearch !== ''
            ? books.filter((item) => item.title.toLowerCase().includes(currentSearch.toLowerCase()))
            : books;
        if (books.length !== 0) {
          // Show by rating
          books = sortAscending
            ? [...books].sort((a, b) => (a.rating < b.rating ? 1 : -1))
            : [...books].sort((a, b) => (a.rating > b.rating ? 1 : -1));
        } else {
          setEmptyMessage('По запросу ничего не найдено');
        }
      } else {
        setEmptyMessage('В этой категории книг ещё нет');
      }
      setVisibleBooks(books);
    }
  }, [booksData, currentFilter, currentSearch, sortAscending]);

  const testIdEmpty = emptyMessage === 'В этой категории книг ещё нет' ? 'empty-category' : 'search-result-not-found';

  return (
    <div className='products'>
      <Controls productsView={productsView} setProductsView={setProductsView} />
      {visibleBooks && visibleBooks.length > 0 ? (
        <ProductsList productsView={productsView} visibleBooks={visibleBooks} currentSearch={currentSearch} />
      ) : (
        <h3 className='products-empty' data-test-id={testIdEmpty}>
          {emptyMessage}
        </h3>
      )}
    </div>
  );
}
