export type RoleFeature =
  | "threshold_config"
  | "financial_sales"
  | "employee_management"
  | "daily_farm_logs"
  | "inventory_stock"
  | "uniformity"
  | "daily_report_entry";

export type RolePermission = "none" | "view" | "edit";

export interface RoleRequest {
  name: string;
  config: {
    feature: RoleFeature;
    permission: RolePermission;
  }[];
}

export interface RoleResponse {
  _id: string;
  name: string;
  config: {
    feature: RoleFeature;
    permission: RolePermission;
  };
  createdAt: string;
  updatedAt: string;
}
