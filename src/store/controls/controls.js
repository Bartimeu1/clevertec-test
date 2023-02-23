import { createSlice } from '@reduxjs/toolkit';

export const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    currentSearch: '',
    currentFilter: 'Все книги',
    sortAscending: true,
  },
  reducers: {
    changeSearch(state, action) {
      state.currentSearch = action.payload; // eslint-disable-line no-param-reassign
    },
    changeFilter(state, action) {
      state.currentFilter = action.payload; // eslint-disable-line no-param-reassign
    },
    toggleSort(state, action) {
      state.sortAscending = !state.sortAscending; // eslint-disable-line no-param-reassign
    },
  },
});

export const { toggleSort, changeSearch, changeFilter } = controlsSlice.actions;
