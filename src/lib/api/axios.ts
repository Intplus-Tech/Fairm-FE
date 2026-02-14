import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { tokenStorage } from "./token";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? "/api/v1";

// Extend AxiosRequestConfig to include _retry
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Type your token refresh response
interface RefreshTokenResponse {
  accessToken: string;
}

export const api = axios.create({
  baseURL: `${BASE_URL}${API_VERSION}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<unknown, CustomAxiosRequestConfig>) => {
    // Make sure originalRequest exists and is typed correctly
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

    if (!originalRequest) {
      // If no config, just reject
      return Promise.reject(error);
    }

    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post<RefreshTokenResponse>(
          `${BASE_URL}${API_VERSION}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        if (!newAccessToken) {
          tokenStorage.clear();
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
          return Promise.reject(error);
        }

        tokenStorage.set(newAccessToken);

        // Update header safely
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        tokenStorage.clear();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
