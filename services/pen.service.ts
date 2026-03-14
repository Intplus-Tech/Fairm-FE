import { api } from "@/lib/api/axios";
import { PenRequest, PenResponse } from "@/types/pen";
import { PaginatedResponse } from ".";

export const pensService = {
  list() {
    return api
      .get<{ data: PaginatedResponse<PenResponse> }>("/pens")
      .then((res) => res.data.data.data);
  },

  create(payload: PenRequest) {
    return api.post("/pens", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api.get<{ data: PenRequest }>(`/pens/${id}`);
  },

  update(id: string, payload: Partial<PenRequest>) {
    return api.put(`/pens/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/pens/${id}`);
  },
};
