import { api } from "@/lib/api/axios";
import type {
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResetPassword,
  ResetPasswordResponse,
  ChangePassword,
  ChangePasswordResponse,
  InviteUser,
  InviteUserResponse,
} from "@/types/auth";

export const authService = {

  login(payload: LoginRequest): Promise<LoginResponse> {
    return api.post<LoginResponse>("/auth/login", payload).then(res => res.data);
  },

  forgotPassword(
    payload: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    return api
      .post<ForgotPasswordResponse>("/auth/forgot-password", payload)
      .then((res) => res.data);
  },

  verifyOtp(payload: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return api
      .post<VerifyOtpResponse>("/auth/verify-otp", payload)
      .then((res) => res.data);
  },

  resetPassword(payload: ResetPassword): Promise<ResetPasswordResponse> {
    return api
      .post<ResetPasswordResponse>("/auth/reset-password", payload)
      .then((res) => res.data);
  },

  changePassword(payload: ChangePassword): Promise<ChangePasswordResponse> {
    return api
      .post<ChangePasswordResponse>("/auth/change-password", payload)
      .then((res) => res.data);
  },

  inviteUser(payload: InviteUser): Promise<InviteUserResponse> {
    return api
      .post<InviteUserResponse>("/users/invite", payload)
      .then((res) => res.data);
  },
};

