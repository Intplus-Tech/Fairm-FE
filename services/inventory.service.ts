import { api } from "@/lib/api/axios";
import { InventoryRequest } from "@/types/inventory";

export const inventoriesService = {
  list() {
    return api.get<{ data: InventoryRequest[] }>("/inventory");
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
