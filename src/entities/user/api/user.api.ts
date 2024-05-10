import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../model/user.types';

// export const BASE_URL = 'https://cataas.com';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      transformResponse: (response: IUser[]) =>
        response.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()),
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    deleteUsers: build.mutation<IUser, string>({
      query: (ids) => ({
        url: `/users/${ids}`,
        method: 'DELETE',
      }),
    }),
    deleteUser: build.mutation<IUser, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    changeUserInfo: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useChangeUserInfoMutation,
  useDeleteUserMutation,
  useDeleteUsersMutation,
} = userAPI;
