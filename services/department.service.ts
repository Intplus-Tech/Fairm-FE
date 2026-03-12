import { api } from "@/lib/api/axios";
import { DepartmentResponse } from "@/types/department";
import { PaginatedResponse } from ".";

export const departmentService = {
  list() {
    return api
      .get<{ data: PaginatedResponse<DepartmentResponse> }>("/departments")
      .then((res) => res.data.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: DepartmentResponse }>(`/departments/${id}`)
      .then((res) => res.data.data);
  },
};
