import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../header/header';
import { Footer } from '../footer/footer';

export function Layout() {
  const [burgerActive, setBurgerActive] = useState(false);

  const toggleBurger = () => {
    setBurgerActive((prevState) => !prevState);
  };

  const [burgerRef, setBurgerRef] = useState(null);

  return (
    <>
      <Header burgerActive={burgerActive} toggleBurger={toggleBurger} setBurgerRef={setBurgerRef} />
      <Outlet context={{ isBurgerActive: burgerActive, setBurgerActive: toggleBurger, burgerItem: burgerRef }} />
      <Footer />
    </>
  );
}
