import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { userAPI } from '../api/user.api';
import { IUser, IUserStore } from './user.types';

const initialState: IUserStore = {
  users: [],
  user: null,
  selectedIdUsers: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
    addSelectedUserId: (state, action: PayloadAction<string>) => {
      const idAlreadySelected = state.selectedIdUsers.includes(action.payload);
      if (!idAlreadySelected) {
        state.selectedIdUsers = [...state.selectedIdUsers, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // matchFulfilled
      .addMatcher(userAPI.endpoints.getUsers.matchFulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
      })
      .addMatcher(userAPI.endpoints.createUser.matchFulfilled, (state, action: PayloadAction<IUser>) => {
        state.users = [...state.users, action.payload];
      });
  },
});
export const { resetUser, addSelectedUserId } = userSlice.actions;

export default userSlice.reducer;
