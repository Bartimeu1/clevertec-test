import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';

import { Layout } from './components/layout/layout';
import { LayoutMainPage } from './components/layout-main-page/layout-main-page';
import { MainPage } from './pages/main';
import { Container } from './components/container/container';
import { BookPage } from './pages/book';
import { TermsPage } from './pages/terms';
import { ContractPage } from './pages/contract';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<LayoutMainPage />}>
            <Route path='/' element={<Navigate to='books/all' />} />
            <Route path='/books/all' element={<MainPage />} />
            {/* <Route path='/books/:category' element={<Container />} /> */}
            <Route path='/terms' element={<TermsPage />} />
            <Route path='/contract' element={<ContractPage />} />
          </Route>
          <Route path='/books/all/:bookId' element={<BookPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
