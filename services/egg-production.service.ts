import { api } from "@/lib/api/axios";
import {
  EggProductionRequest,
  EggProductionResponse,
} from "@/types/egg-production";
// import { PaginatedResponse } from ".";

export const eggProductionService = {
  list() {
    return api
      .get<{ data: EggProductionResponse }>("/egg-productions")
      .then((res) => res.data.data);
  },

  create(payload: EggProductionRequest) {
    return api.post("/egg-productions", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: EggProductionResponse }>(`/egg-productions/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<EggProductionRequest>) {
    return api.put(`/egg-productions/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/egg-productions/${id}`);
  },
};
