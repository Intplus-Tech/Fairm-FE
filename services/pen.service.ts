import { api } from "@/lib/api/axios";
import { PenRequest } from "@/types/pen";

export const pensService = {
  list() {
    return api.get<{ data: PenRequest[] }>("/pens");
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
