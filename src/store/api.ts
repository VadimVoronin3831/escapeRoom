import axios, { AxiosError, AxiosInstance } from 'axios';

const BACKEND_URL = 'https://grading.design.htmlacademy.pro/v1/escape-room/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    },
  );

  return api;
};
