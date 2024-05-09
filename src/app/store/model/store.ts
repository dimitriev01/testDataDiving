import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userAPI, userSlice } from 'src/entities/user';
import { dogAPI } from 'src/entities/dog';
import { modalSlice } from 'src/shared/ui/modal';

const rootReducer = combineReducers({
  userReducer: userSlice.reducer,
  modalReducer: modalSlice.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [dogAPI.reducerPath]: dogAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(dogAPI.middleware, userAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
