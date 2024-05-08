import { createSlice } from '@reduxjs/toolkit';
import { IUserStore } from './user.types';

const initialState: IUserStore = {
  users: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
