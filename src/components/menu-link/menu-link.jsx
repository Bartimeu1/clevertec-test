import React from 'react';
import './menu-link.scss';
import { NavLink } from 'react-router-dom';

export function MenuLink({ children, to, className, dataTestId }) {
  return (
    <NavLink
      to={to}
      data-test-id={dataTestId}
      className={({ isActive }) => 
        isActive ? `${className} ${className}--active` : `${className}`
      }
    >{children}</NavLink>
  )
}
