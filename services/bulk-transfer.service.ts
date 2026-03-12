import { api } from "@/lib/api/axios";
import {
  BulkTransferRequest,
  BulkTransferResponse,
} from "@/types/bulk-transfer";
// import { PaginatedResponse } from ".";

export const bulkTransferService = {
  list() {
    return api
      .get<{ data: BulkTransferResponse }>("/bulk-transfers")
      .then((res) => res.data.data);
  },

  create(payload: BulkTransferRequest) {
    return api.post("/bulk-transfers", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: BulkTransferResponse }>(`/bulk-transfers/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<BulkTransferRequest>) {
    return api.put(`/bulk-transfers/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/bulk-transfers/${id}`);
  },
};
