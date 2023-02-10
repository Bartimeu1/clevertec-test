import React from 'react';
import './container.scss';

export function Container({ children, className }) {
  return (
    <div className={`container ${className ? className : 'container--empty'}`}>
      {children}
    </div>
  )
}
