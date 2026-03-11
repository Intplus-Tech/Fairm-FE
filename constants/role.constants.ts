import type { RoleFeature, RolePermission } from "@/types/role";

export const ROLE_FEATURE: RoleFeature[] = [
  "threshold_config",
  "financial_sales",
  "employee_management",
  "daily_farm_logs",
  "inventory_stock",
  "uniformity",
  "daily_report_entry",
];

export const ROLE_PERMISSION: RolePermission[] = ["none", "view", "edit"];
