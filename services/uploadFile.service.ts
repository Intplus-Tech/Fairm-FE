"use client";

import { api } from "@/lib/api/axios";
import { UploadFileResponse } from "@/types/upload-file";

export const uploadFileService = {
  list() {
    return api
      .get<{ data: UploadFileResponse[] }>("/uploads")
      .then((res) => res.data.data);
  },

  // ✅ FIXED: Upload files using FormData for multipart/form-data
  // create(files: FileList) {
  //   const formData = new FormData();
  //   Array.from(files).forEach((file) => formData.append("file", file));
  //   return api
  //     .post("/uploads", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     })
  //     .then((res) => res.data.data);
  // },

  create(files: FileList) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("file", file)); // use 'file' key

  return api
    .post("/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data.data); // returns UploadFileResponse or array of them
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