import { api } from "@/lib/api/axios";
import {
  FarmGateSaleRequest,
  FarmGateSaleResponse,
} from "@/types/farm-gate-sales";
// import { PaginatedResponse } from ".";

export const farmGateSaleService = {
  list() {
    return api
      .get<{ data: FarmGateSaleResponse }>("/farm-sales-entries")
      .then((res) => res.data.data);
  },

  create(payload: FarmGateSaleRequest) {
    return api
      .post("/farm-sales-entries", payload)
      .then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: FarmGateSaleResponse }>(`/farm-sales-entries/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<FarmGateSaleRequest>) {
    return api.put(`/farm-sales-entries/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/farm-sales-entries/${id}`);
  },
};
