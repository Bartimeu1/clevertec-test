import { configureStore } from '@reduxjs/toolkit';

import { dataApi } from './data/data.api';
import { controlsSlice } from "./controls/controls";

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    controls: controlsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataApi.middleware),
});