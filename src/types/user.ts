export type UserRole =
  | "super_admin"
  | "manager"
  | "supervisor"
  | "staff";

export interface InviteUserPayload {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  departmentId: string;
  positionId: string;
}

export interface SetupAccountPayload {
  token: string;
  password: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: "active" | "pending_setup";
  departmentId: string;
  positionId: string;
  createdAt: string;
  updatedAt: string;
}
