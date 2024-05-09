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
      const userId = action.payload;
      if (state.selectedIdUsers.includes(userId)) {
        state.selectedIdUsers = state.selectedIdUsers.filter((id) => id !== userId);
      } else {
        state.selectedIdUsers.push(userId);
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
        state.users.push(action.payload);
      })
      .addMatcher(userAPI.endpoints.deleteUser.matchFulfilled, (state) => {
        state.users = state.users.filter((user) => !state.selectedIdUsers.includes(user.id));
      });
  },
});
export const { resetUser, addSelectedUserId } = userSlice.actions;

export default userSlice.reducer;
