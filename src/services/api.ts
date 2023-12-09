import { toast } from 'react-toastify';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AppRoute, BACKEND_URL, REQUEST_TIMEOUT, browserHistory } from '../const';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {

      if (error.response?.status === StatusCodes.NOT_FOUND) {
        browserHistory.push(AppRoute.Root);
      }

      if (error.response?.status === StatusCodes.UNAUTHORIZED) {
        toast.warn(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
