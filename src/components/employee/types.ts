export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: "Active" | "Inactive";
  joined: string;
  phone: string;
  age: number;
  salary: number;
  attendance: number;
  overAttendance: number;
}
