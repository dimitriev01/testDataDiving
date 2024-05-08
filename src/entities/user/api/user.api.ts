import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseQueryInterceptor } from 'src/shared/api/query';
import { IUser } from '../../../entities/user';

// export const BASE_URL = 'https://cataas.com';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: BaseQueryInterceptor,
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    getUser: build.query<IUser, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation } = userAPI;
