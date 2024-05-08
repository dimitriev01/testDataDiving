import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseQueryInterceptor } from './query';

export const api = createApi({
  reducerPath: 'baseAPI',
  baseQuery: BaseQueryInterceptor,
  endpoints: () => ({}),
});
