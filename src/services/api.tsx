import axios, { AxiosRequestConfig } from "axios";

import { token as getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 1000,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();
  if (token && config?.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
