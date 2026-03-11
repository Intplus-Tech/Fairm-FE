import { api } from "@/lib/api/axios";
import { ThresholdRequest, ThresholdResponse } from "@/types/threshold";

export const thresholdsService = {
  list() {
    return api.get<{ data: ThresholdResponse[] }>("/thresholds");
  },

  create(payload: ThresholdRequest) {
    return api.post("/thresholds", payload);
  },

  getById(id: string) {
    return api.get<{ data: ThresholdResponse }>(`/thresholds/${id}`);
  },

  update(id: string, payload: Partial<ThresholdRequest>) {
    return api.put(`/thresholds/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/thresholds/${id}`);
  },
};
