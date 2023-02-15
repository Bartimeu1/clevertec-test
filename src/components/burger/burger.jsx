import React from 'react';
import classNames from 'classnames';
import './burger.scss';

export function Burger({ burgerActive, toggleBurger, burgerRef }) {
  return (
    <button
      type='button'
      ref={burgerRef}
      data-test-id='button-burger'
      className={classNames('burger', { active: burgerActive })}
      onClick={() => toggleBurger()}
    >
      <span />
    </button>
  );
}
