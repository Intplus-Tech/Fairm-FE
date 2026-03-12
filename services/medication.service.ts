import { api } from "@/lib/api/axios";
import { MedicationRequest, MedicationResponse } from "@/types/medication";
// import { PaginatedResponse } from ".";

export const medicationService = {
  list() {
    return api
      .get<{ data: MedicationResponse }>("/medication-treatments")
      .then((res) => res.data.data);
  },

  create(payload: MedicationRequest) {
    return api
      .post("/medication-treatments", payload)
      .then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: MedicationResponse }>(`/medication-treatments/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<MedicationRequest>) {
    return api.put(`/medication-treatments/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/medication-treatments/${id}`);
  },
};
