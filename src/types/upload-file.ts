export interface UploadFileRequest {
  file: string;
}

export interface UploadFileResponse {
  _id: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  extension: string;
  provider: string;
  uploadedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    lastLoginAt: null;
    lastActiveAt: null;
  };
  metadata: {
    cloudId: string;
    folder: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
