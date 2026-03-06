export interface EmployeeResponse {
  _id: string;
  userId?: {
    email: string;
    status: string;
    firstName: string;
    lastName: string;
  };
  departmentId: { name: string };
  positionId: { name: string };
  dob: Date;
  phoneNumber: number;
  age: number;
  salary: number;
  attendance?: number;
  overAttendance?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeRequest {
  email: string;
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  dob: Date;
  phoneNumber: number;
  age: number;
  salary: number;
  attendance?: number;
  overAttendance?: number;
}
