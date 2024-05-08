import { type BaseQueryFn, type FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

interface CustomFetchArgs extends RequestInit {
  url: string;
  params?: Record<string, any>;
  body?: any;
}

export const BaseQueryInterceptor = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: `http://localhost:3001`,
      prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
      },
    })(args, api, extraOptions);
    return result;
  },
  { maxRetries: 0 },
) as BaseQueryFn<string | CustomFetchArgs, unknown, unknown>;
