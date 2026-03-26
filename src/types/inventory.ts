export type InventoryCategory =
  | "feed"
  | "vaccine"
  | "product"
  | "equipment"
  | "other";

export type InventoryUnit =
  | "bags"
  | "liters"
  | "pieces"
  | "cartons"
  | "doses";

export interface InventoryRequest {
  name: string;
  batchNumber: string;
  category: InventoryCategory;
  description: string;
  unitOfMeasurement: InventoryUnit;
  supplier: string;
  expiryDate: string | Date;
  attachment?: string[];
}

export interface InventoryResponse {
  _id: string;
  name: string;
  batchNumber: string;
  category: InventoryCategory;
  description: string;
  unitOfMeasurement: InventoryUnit;
  supplier: string;
  expiryDate: string;
  attachment: string[];
  createdAt: string;
  updatedAt: string;
}

export interface InventoryListResponse {
  data: InventoryResponse[];
  total: number;
  page: number;
  limit: number;
}