import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dogAPIUrl = 'https://random.dog';

export const dogAPI = createApi({
  reducerPath: 'woofAPI',
  baseQuery: fetchBaseQuery({ baseUrl: dogAPIUrl }),
  endpoints: (builder) => ({
    getWoof: builder.query<string[], void>({
      query: () => ({
        url: '/doggos',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetWoofQuery } = dogAPI;
