import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { bookGenres } from './data';

import { Container } from './components/container/container';
import { Layout } from './components/layout/layout';
import { MainPage } from './pages/main';
import { BookPage } from './pages/book';
import { TermsPage } from './pages/terms';
import { ContractPage } from './pages/contract';

export function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Navigate to='books/all' />} />
          <Route path='/books/all' element={<MainPage bookGenres={bookGenres} />} />
          <Route path='/books/:category' element={<Container />} />
          <Route path='/book/:bookId' element={<BookPage bookGenres={bookGenres} />} />
          <Route path='/terms' element={<TermsPage bookGenres={bookGenres} />} />
          <Route path='/contract' element={<ContractPage bookGenres={bookGenres} />} />
        </Route>
      </Routes>
    </div>
  )
}
