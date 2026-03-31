// ─────────────────────────────────────────────
//  FAIRM  ·  Domain Types
//  File: types/alerts.types.ts
// ─────────────────────────────────────────────

// ── WhatsApp ──────────────────────────────────

export type WhatsAppStatusValue =
  | "qr_ready"
  | "connected"
  | "disconnected"
  | "loading";

export interface WhatsAppStatusResponse {
  status: WhatsAppStatusValue;
}

export interface WhatsAppQRResponse {
  status: WhatsAppStatusValue;
  /** base64 data-URI  e.g. "data:image/png;base64,…" */
  qr: string;
}

// ── Branch Alerts ─────────────────────────────

export type BreachType =
  | "TEMPERATURE_LOW"
  | "TEMPERATURE_HIGH"
  | "MORTALITY_SPIKE"
  | "HUMIDITY_LOW"
  | "HUMIDITY_HIGH"
  | "AMMONIA_HIGH";

export type AlertSeverity = "CRITICAL" | "WARNING" | "INFO";

export interface BranchAlert {
  _id: string;
  farmId: string;
  penId: string;
  breachType: BreachType;
  severity: AlertSeverity;
  previousValue: number;
  currentValue: number;
  changePercent: number;
  aiRecommendation: string;
  acknowledged: boolean;
  createdAt: string; // ISO-8601
  updatedAt: string; // ISO-8601
  __v: number;
}

// ── Paginated wrapper ─────────────────────────

export interface PaginatedAlerts {
  data: BranchAlert[];
  total: number;
  page: number;
  limit: number;
}

export interface BranchAlertsResponse {
  ok: boolean;
  data: PaginatedAlerts;
}

export interface ActiveAlertsResponse {
  ok: boolean;
  /** null when no active alert exists */
  data: BranchAlert | null;
}

// ── Shared API error shape ─────────────────────

export interface ApiError {
  ok: false;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}