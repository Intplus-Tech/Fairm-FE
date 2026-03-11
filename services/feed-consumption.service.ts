import { api } from "@/lib/api/axios";
import {
  FeedConsumptionRequest,
  FeedConsumptionResponse,
} from "@/types/feed-consumption";
// import { PaginatedResponse } from ".";

export const feedConsumptionService = {
  list() {
    return api
      .get<{ data: FeedConsumptionResponse }>("/feed-consumptions")
      .then((res) => res.data.data);
  },

  create(payload: FeedConsumptionRequest) {
    return api.post("/feed-consumptions", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: FeedConsumptionResponse }>(`/feed-consumptions/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<FeedConsumptionRequest>) {
    return api.put(`/feed-consumptions/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/feed-consumptions/${id}`);
  },
};
