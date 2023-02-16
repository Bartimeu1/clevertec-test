import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../header/header';
import { Footer } from '../footer/footer';

export function Layout() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}
