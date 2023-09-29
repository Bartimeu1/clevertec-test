import { apiSlice } from '../api/api-slice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (body) => ({
        url: 'auth/local',
        method: 'POST',
        body,
      })
    }),
  }),
});

export const { useLoginUserMutation } = authApiSlice;