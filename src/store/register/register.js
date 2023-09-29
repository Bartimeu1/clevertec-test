import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerSlice = createApi({
  reducerPath: 'registerSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://strapi.cleverland.by/api/',
  }),
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (body) => ({
        url: 'auth/local/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = registerSlice;