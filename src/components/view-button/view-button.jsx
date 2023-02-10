import React from 'react';
import './view-button.scss';

export function ViewButton({ children, active, mark, setProductsView }) {
  return (
    // <button 
    //   type='button'
    //   className={active ? 'view-button--active' : 'view-button'}
    //   data-test-id='button-menu-view-list'
    //   onClick={() => setProductsView(mark)}
    // >
    //   {children}
    // </button>
    <>
      {mark === 'tile' ?
        <button
          data-test-id='button-menu-view-window'
          className={active ? 'view-button--active' : 'view-button'}
          type='button'
          onClick={() => setProductsView(mark)}
        >
          {children}
        </button> :
        <button
          data-test-id='button-menu-view-list'
          className={active ? 'view-button--active' : 'view-button'}
          type='button'
          onClick={() => setProductsView(mark)}
        >
          {children}
        </button>
      }
      {/* this comment is a placeholder to use the react fragment */}
    </>
  )
}
