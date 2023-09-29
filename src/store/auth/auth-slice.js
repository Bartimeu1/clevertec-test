import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, jwt: null },
  reducers: {
    setCredentials: (state, action) => {
      const { name, jwt } = action.payload;
      state.user = name; // eslint-disable-line no-param-reassign
      state.jwt = jwt; // eslint-disable-line no-param-reassign
    },
    logOut: (state, action) => {
      state.user = null; // eslint-disable-line no-param-reassign
      state.jwt = null; // eslint-disable-line no-param-reassign
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.jwt;
