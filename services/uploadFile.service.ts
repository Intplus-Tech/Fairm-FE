import { api } from "@/lib/api/axios";
import { UploadFileRequest, UploadFileResponse } from "@/types/upload-file";
// import { PaginatedResponse } from ".";

export const uploadFileService = {
  list() {
    return api
      .get<{ data: UploadFileResponse }>("/uploads")
      .then((res) => res.data.data);
  },

  create(payload: UploadFileRequest) {
    return api.post("/uploads", payload).then((res) => res.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: UploadFileResponse }>(`/uploads/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<UploadFileRequest>) {
    return api.put(`/uploads/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/uploads/${id}`);
  },
};
