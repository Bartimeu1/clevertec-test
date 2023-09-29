import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { controlsSlice } from './controls/controls';
import { registerSlice } from './register/register';
import { apiSlice } from './api/api-slice';
import { authSlice } from './auth/auth-slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [registerSlice.reducerPath]: registerSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice.reducer,
  controls: controlsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([registerSlice.middleware, apiSlice.middleware]),
});

export const persistor = persistStore(store);
