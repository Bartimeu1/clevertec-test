import { apiSlice } from '../api/api-slice';

export const restoreApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    sendLetter: build.mutation({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    restorePass: build.mutation({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendLetterMutation, useRestorePassMutation } = restoreApiSlice;
