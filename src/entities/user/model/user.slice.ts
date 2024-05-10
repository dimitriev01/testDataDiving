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
    addSelectedUsersId: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (state.selectedIdUsers.includes(userId)) {
        state.selectedIdUsers = state.selectedIdUsers.filter((id) => id !== userId);
      } else {
        state.selectedIdUsers.push(userId);
      }
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // matchFulfilled
      .addMatcher(userAPI.endpoints.getUsers.matchFulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload.sort(
          (a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime(),
        );
      })
      .addMatcher(userAPI.endpoints.createUser.matchFulfilled, (state, action: PayloadAction<IUser>) => {
        state.users.push(action.payload);
      })
      .addMatcher(userAPI.endpoints.deleteUser.matchFulfilled, (state, action: PayloadAction<IUser>) => {
        state.users = state.users.filter((user) => user.id !== action.payload.id);
      })
      .addMatcher(userAPI.endpoints.deleteUsers.matchFulfilled, (state) => {
        state.users = state.users.filter((user) => !state.selectedIdUsers.includes(user.id));
      })
      .addMatcher(userAPI.endpoints.changeUserInfo.matchFulfilled, (state, action: PayloadAction<IUser>) => {
        console.log(action.payload);
        state.users = state.users.map((user) => (user.id === action.payload.id ? action.payload : user));
      });
  },
});
export const { setUser, addSelectedUsersId } = userSlice.actions;

export default userSlice.reducer;
