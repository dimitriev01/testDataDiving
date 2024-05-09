import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IModalStore } from './modal.types';

const initialState: IModalStore = {
  modalCreationUser: false,
  modalConfirmDeleteUser: false,
  modalEditionUser: false,
  modalEditionAvatar: false,
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    changeModalCreationUser: (state, action: PayloadAction<boolean>) => {
      state.modalCreationUser = action.payload;
    },
    changeModalConfirmDeleteUser: (state, action: PayloadAction<boolean>) => {
      state.modalConfirmDeleteUser = action.payload;
    },
    changeModalEditionUser: (state, action: PayloadAction<boolean>) => {
      state.modalEditionUser = action.payload;
    },
    changeModalEditionAvatar: (state, action: PayloadAction<boolean>) => {
      state.modalEditionAvatar = action.payload;
    },
  },
});

export const {
  changeModalConfirmDeleteUser,
  changeModalCreationUser,
  changeModalEditionUser,
  changeModalEditionAvatar,
} = modalSlice.actions;

export default modalSlice.reducer;
