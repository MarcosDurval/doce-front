import axios, { AxiosRequestConfig } from "axios";

import { token } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (token && config?.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
