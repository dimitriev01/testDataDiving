import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appAPI } from '../api/redux.api';

export const rootReducer = combineReducers({
  [appAPI.reducerPath]: appAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(appAPI.middleware),
});
