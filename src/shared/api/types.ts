import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IErrorParam {
    msg: string;
    code: number;
    params: string;
    param?: string;
    location: string;
}

export interface ApiErrorResponse {
    code: number;
    error: boolean;
    errors?: IErrorParam[];
    message: string;
    param?: string;
}

export type ApiError<T extends unknown = ApiErrorResponse> = AxiosError<T>;

export type ApiResponse<T = ApiResponseData> = AxiosResponse<T>;

export interface ApiResponseData<T = any> {
    data: T;
    message: string;
}

export type ApiRequestConfig<T = any> = AxiosRequestConfig<T>;
