import { api } from "@/lib/api/axios";
import { RoleRequest, RoleResponse } from "@/types/role";

export const rolesService = {
  list() {
    return api.get<{ data: RoleResponse[] }>("/roles");
  },

  create(payload: RoleRequest) {
    return api.post("/roles", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api.get<{ data: RoleResponse }>(`/roles/${id}`);
  },

  update(id: string, payload: Partial<RoleRequest>) {
    return api.put(`/roles/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/roles/${id}`);
  },
};
