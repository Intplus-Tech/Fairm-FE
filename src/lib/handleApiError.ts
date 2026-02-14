// lib/api/handleApiError.ts
import axios, { AxiosError } from "axios";

interface ApiError {
  message?: string;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data?.message || fallback;
  }

  return fallback;
}
