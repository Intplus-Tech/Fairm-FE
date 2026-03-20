
"use client";

import { api } from "@/lib/api/axios";
import { UploadFileResponse } from "@/types/upload-file";

export const uploadFileService = {
  list() {
    return api
      .get<{ data: UploadFileResponse[] }>("/uploads")
      .then((res) => res.data.data);
  },

 create(files: FileList): Promise<UploadFileResponse[]> {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("file", file);
  });

  return api
    .post<{ data: UploadFileResponse[] }>("/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data.data);
},

  getById(id: string) {
    return api
      .get<{ data: UploadFileResponse }>(`/uploads/${id}`)
      .then((res) => res.data.data);
  },

  update(id: string, payload: Partial<{ file: string }>) {
    return api.put(`/uploads/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/uploads/${id}`);
  },
};