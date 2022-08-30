import axios, { AxiosRequestConfig } from "axios";

import { token } from "./auth";

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 1000,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (token && config?.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
