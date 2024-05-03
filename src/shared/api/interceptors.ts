import { ApiRequestConfig, ApiResponse } from './types';

export const requestHandler = (config: ApiRequestConfig) => {
    const headers = config.headers || {};

    return { ...config, headers };
};

export const responseHandler = (res: ApiResponse) => res;
