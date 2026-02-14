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

export interface ApiErrorResponse {
  ok: false;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

// types/auth.ts

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
