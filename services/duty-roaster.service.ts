import { api } from "@/lib/api/axios";
import { DutyRoasterRequest, DutyRoasterResponse } from "@/types/duty-roaster";
// import { PaginatedResponse } from ".";

export const dutyRoasterService = {
  list() {
    return api
      .get<{ data: DutyRoasterResponse }>("/roasters")
      .then((res) => res.data.data);
  },

  create(payload: DutyRoasterRequest) {
    return api.post("/roasters", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: DutyRoasterResponse }>(`/roasters/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<DutyRoasterRequest>) {
    return api.put(`/roasters/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/roasters/${id}`);
  },
};
