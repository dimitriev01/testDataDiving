import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAppStore } from './store.types';

const initialState: IAppStore = {
  modalCreationUser: false,
  modalConfirmDeleteUser: false,
  modalEditionUser: false,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    resetModals: (state) => {
      state.modalConfirmDeleteUser = false;
      state.modalCreationUser = false;
      state.modalEditionUser = false;
    },
    changeModalCreationUser: (state, action: PayloadAction<boolean>) => {
      state.modalCreationUser = action.payload;
    },
    changeModalConfirmDeleteUser: (state, action: PayloadAction<boolean>) => {
      state.modalConfirmDeleteUser = action.payload;
    },
    changeModalEditionUser: (state, action: PayloadAction<boolean>) => {
      state.modalEditionUser = action.payload;
    },
  },
});

export const { resetModals, changeModalConfirmDeleteUser, changeModalCreationUser, changeModalEditionUser } =
  appSlice.actions;

export default appSlice.reducer;
