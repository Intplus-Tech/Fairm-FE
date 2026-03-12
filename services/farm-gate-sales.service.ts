import { api } from "@/lib/api/axios";
import {
  FarmGateSaleRequest,
  FarmGateSaleResponse,
} from "@/types/farm-gate-sales";
// import { PaginatedResponse } from ".";

export const farmGateSaleService = {
  list() {
    return api
      .get<{ data: FarmGateSaleResponse }>("/farm-gate-entries")
      .then((res) => res.data.data);
  },

  create(payload: FarmGateSaleRequest) {
    return api.post("/farm-gate-entries", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: FarmGateSaleResponse }>(`/farm-gate-entries/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<FarmGateSaleRequest>) {
    return api.put(`/farm-gate-entries/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/farm-gate-entries/${id}`);
  },
};
