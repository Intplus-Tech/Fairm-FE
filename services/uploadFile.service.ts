"use client";

import { api } from "@/lib/api/axios";
import { UploadFileResponse } from "@/types/upload-file";

export const uploadFileService = {
  // List all files (admin only)
  listAll(page = 1, limit = 10) {
    return api
      .get<{ data: { files: UploadFileResponse[]; pagination: any } }>(
        `/uploads/all?page=${page}&limit=${limit}`
      )
      .then((res) => res.data.data)
      .catch((err) => {
        console.error("Failed to fetch all uploads:", err);
        throw new Error(
          err.response?.data?.message || "Failed to fetch all uploads"
        );
      });
  },

  // List authenticated user's files
  listMyFiles(page = 1, limit = 10) {
    return api
      .get<{ data: { files: UploadFileResponse[]; pagination: any } }>(
        `/uploads/my-files?page=${page}&limit=${limit}`
      )
      .then((res) => res.data.data)
      .catch((err) => {
        console.error("Failed to fetch my files:", err);
        throw new Error(
          err.response?.data?.message || "Failed to fetch my files"
        );
      });
  },

  // Upload files
 create(files: FileList, folder?: string): Promise<UploadFileResponse[]> {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("file", file);
  });

  if (folder) formData.append("folder", folder);

  return api
    .post<{ data: UploadFileResponse[] }>("/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      const status = err.response?.status;
      if (status === 400) throw new Error("No file provided or invalid file type");
      if (status === 401) throw new Error("Unauthorized - Invalid or missing token");
      if (status === 413) throw new Error("File too large (max 10MB)");
      console.error("Upload failed:", err);
      throw new Error(err.response?.data?.message || "Upload failed");
    });
},
  // Get file by ID
  getById(id: string) {
    return api
      .get<{ data: UploadFileResponse }>(`/uploads/${id}`)
      .then((res) => res.data.data)
      .catch((err) => {
        const status = err.response?.status;
        if (status === 401) throw new Error("Unauthorized - Invalid or missing token");
        if (status === 404) throw new Error("File not found");
        console.error("Get file by ID failed:", err);
        throw new Error(err.response?.data?.message || "Failed to get file");
      });
  },

  // Delete file by ID
  remove(id: string) {
    return api
      .delete(`/uploads/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        const status = err.response?.status;
        if (status === 401) throw new Error("Unauthorized - Invalid token");
        if (status === 403) throw new Error("Forbidden - You cannot delete this file");
        if (status === 404) throw new Error("File not found");
        console.error("Delete file failed:", err);
        throw new Error(err.response?.data?.message || "Failed to delete file");
      });
  },

  // Update file metadata
  update(id: string, payload: Partial<{ file: string; folder: string }>) {
    return api
      .put(`/uploads/${id}`, payload)
      .then((res) => res.data)
      .catch((err) => {
        const status = err.response?.status;
        if (status === 401) throw new Error("Unauthorized - Invalid token");
        if (status === 404) throw new Error("File not found");
        console.error("Update file failed:", err);
        throw new Error(err.response?.data?.message || "Failed to update file");
      });
  },
};