export type InventoryCategory =
  | "feed"
  | "vaccine"
  | "product"
  | "equipment"
  | "other";

export type InventoryUnit = "bags" | "liters" | "pieces" | "cartons" | "doses";

export interface InventoryRequest {
  name: string;
  category: InventoryCategory;
  description: string;
  unitOfMeasurement: InventoryUnit;
  supplier: string;
  expiryDate: Date;
}

export interface InventoryResponse {
  _id: string;
  name: string;
  category: InventoryCategory;
  description: string;
  unitOfMeasurement: InventoryUnit;
  supplier: string;
  expiryDate: Date;
  createdAt: string;
  updatedAt: string;
}
