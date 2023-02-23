import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './menu-link.scss';

import { changeFilter } from '../../store/controls/controls';

export function MenuLink({ children, to, className, dataTestId, filter, closeToggle }) {
  const dispatch = useDispatch();

  return (
    <NavLink
      to={to}
      data-test-id={dataTestId}
      onClick={() => {
        dispatch(changeFilter(filter));
        if (closeToggle) {
          closeToggle()
        }
      }}
      className={({ isActive }) => (isActive ? `${className} ${className}--active` : `${className}`)}
    >
      {children}
    </NavLink>
  );
}
