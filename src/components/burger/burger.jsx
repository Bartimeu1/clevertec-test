import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import './burger.scss';

export function Burger({ burgerActive, toggleBurger, setBurgerRef }) {
  // Send burger ref to layout component
  const burgerRef = useRef(null);
  useEffect(() => {
    setBurgerRef(burgerRef);
  }, [setBurgerRef]);

  return (
    <button
      type='button'
      data-test-id='button-burger'
      ref={burgerRef}
      className={classNames('burger', { active: burgerActive })}
      onClick={() => toggleBurger()}
    >
      <span />
    </button>
  );
}
