import React from 'react';
import { Outlet } from 'react-router-dom';

import { NavMenu } from '../nav-menu/nav-menu';
import { Container } from '../container/container';

export function LayoutMainPage() {
  return (
    <Container className='container--main'>
      <NavMenu mobile={false} />
      <Outlet />
    </Container>
  );
}
