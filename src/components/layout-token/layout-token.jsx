import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../store/auth/auth-slice';

export function LayoutToken() {
  const token = useSelector(selectCurrentToken);

  return (
    token ? <Navigate to='/' /> : <Outlet />
  )
}
