import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../store/auth/auth-slice';

import { Header } from '../header/header';
import { Footer } from '../footer/footer';

export function Layout() {
  const token = useSelector(selectCurrentToken);
  
  return token ? (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  ) : (
    <Navigate to='/auth' replace={true} />
  );
}
