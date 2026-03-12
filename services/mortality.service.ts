import { api } from "@/lib/api/axios";
import { MortalityRequest, MortalityResponse } from "@/types/mortality";
// import { PaginatedResponse } from ".";

export const mortalityService = {
  list() {
    return api
      .get<{ data: MortalityResponse }>("/mortalities")
      .then((res) => res.data.data);
  },

  create(payload: MortalityRequest) {
    return api.post("/mortalities", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: MortalityResponse }>(`/mortalities/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<MortalityRequest>) {
    return api.put(`/mortalities/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/mortalities/${id}`);
  },
};
