import { api } from "@/lib/api/axios";
import { DutyRoasterRequest, DutyRoasterResponse } from "@/types/duty-roaster";
// import { PaginatedResponse } from ".";

export const dutyRoasterService = {
  list() {
    return api
      .get<{ data: DutyRoasterResponse }>("/rosters")
      .then((res) => res.data.data);
  },

  create(payload: DutyRoasterRequest) {
    return api.post("/rosters", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: DutyRoasterResponse }>(`/rosters/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<DutyRoasterRequest>) {
    return api.put(`/rosters/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/rosters/${id}`);
  },
};
