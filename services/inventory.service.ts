import { api } from "@/lib/api/axios";
import { InventoryRequest, InventoryResponse } from "@/types/inventory";
import { PaginatedResponse } from ".";

export const inventoriesService = {
  list() {
    return api
      .get<{ data: PaginatedResponse<InventoryResponse> }>("/inventory")
      .then((res) => res.data.data.data);
  },

  create(payload: InventoryRequest) {
    return api.post("/inventory", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api.get<{ data: InventoryRequest }>(`/inventory/${id}`);
  },

  update(id: string, payload: Partial<InventoryRequest>) {
    return api.put(`/inventory/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/inventory/${id}`);
  },
};
