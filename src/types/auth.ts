export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  departmentId: string;
  positionId: string;
}

export interface LoginResponse {
  ok: true;
  data: {
    user: AuthUser;
    token: string;
    refreshToken: string;
  };
}

export interface ApiErrorResponse {
  ok: false;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  ok: true;
  data: {
    ok: true;
  };
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  ok: true;
  data: {
    ok: true;
  };
}

export interface ResetPassword {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  ok: true;
  data: {
    ok: true;
  };
}

export interface ChangePassword {
  email: string;
  password: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  ok: true;
  data: {
    ok: true;
  };
}

export type UserRole = "super_admin" | "manager" | "supervisor" | "staff";
export interface InviteUser {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  departmentId?: string;
  positionId?: string;
}

export interface InviteUserResponse {
  ok: true;
  data: {
    userId: "65f1b9b0e9d3f2c2c0a0f111";
    email: "staff1@fairm.test";
  };
}
