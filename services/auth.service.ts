import { api } from "@/lib/api/axios";
import type {
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/types/auth";

export const authService = {
  login(payload: LoginRequest): Promise<LoginResponse> {
    return api.post<LoginResponse>("/auth/login", payload).then(res => res.data);
  },

  forgotPassword(
    payload: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    return api
      .post<ForgotPasswordResponse>("/auth/forgot-password", payload)
      .then(res => res.data);
  },

  verifyOtp(payload: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return api
      .post<VerifyOtpResponse>("/auth/verify-otp", payload)
      .then(res => res.data);
  },
};
