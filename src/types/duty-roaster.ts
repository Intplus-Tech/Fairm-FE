export type DutyStatus = "on_duty" | "off_duty";

export interface DutyRoasterResponse {
  _id: string;
  attendantId: string;
  dutyStatus: DutyStatus;
  location: string;
  taskAssigned: string;
  createdAt: string;
  updatedAt: string;
}

export interface DutyRoasterRequest {
  attendantId: string;
  dutyStatus: DutyStatus;
  location: string;
  taskAssigned: string;
}
