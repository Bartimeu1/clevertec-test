import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../auth/auth-slice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://strapi.cleverland.by/api/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { jwt } = getState().auth;
    if (jwt) {
      headers.set('Authorization', `Bearer ${jwt}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (build) => ({}),
});
