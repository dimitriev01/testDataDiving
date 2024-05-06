import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appAPI = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({}),
});

export const {} = appAPI;
