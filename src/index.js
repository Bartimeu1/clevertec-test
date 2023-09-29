import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store/store';

import { Layout } from './components/layout/layout';
import { LayoutMainPage } from './components/layout-main-page/layout-main-page';
import { LayoutToken } from './components/layout-token/layout-token';
import { MainPage } from './pages/main';
import { BookPage } from './pages/book';
import { TermsPage } from './pages/terms';
import { ContractPage } from './pages/contract';
import { AuthPage } from './pages/auth/auth-page';
import { RegisterPage } from './pages/register/register-page';
import { ForgotPassPage } from './pages/forgot-pass/forgot-pass-page';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to='books/all' />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/terms' element={<TermsPage />} />
              <Route path='/contract' element={<ContractPage />} />
            </Route>
            <Route path='/books/:category/:bookId' element={<BookPage />} />
          </Route>
          <Route element={<LayoutToken />}>
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/registration' element={<RegisterPage />} />
            <Route path='/forgot-pass' element={<ForgotPassPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </PersistGate>
  </Provider>
);
