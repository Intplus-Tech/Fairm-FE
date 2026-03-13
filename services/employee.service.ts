import { api } from "@/lib/api/axios";
import { EmployeeRequest, EmployeeResponse } from "@/types/employee";
import { PaginatedResponse } from ".";

export const employeeService = {
  list() {
    return api
      .get<{ data: PaginatedResponse<EmployeeResponse> }>("/employees")
      .then((res) => res.data.data.data);
  },

  create(payload: EmployeeRequest) {
    return api.post("/employees", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: EmployeeResponse }>(`/employees/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<EmployeeRequest>) {
    return api.put(`/employees/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/employees/${id}`);
  },
};
