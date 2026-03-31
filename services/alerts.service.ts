// ─────────────────────────────────────────────
//  FAIRM  ·  Alerts & WhatsApp Service
// ─────────────────────────────────────────────

import { api } from "@/lib/api/axios";

import type {
  WhatsAppStatusResponse,
  WhatsAppQRResponse,
  BranchAlertsResponse,
  ActiveAlertsResponse,
  BranchAlert,
} from "@/types/alerts.types";

// ── WhatsApp ──────────────────────────────────

export const whatsAppService = {
  getStatus(): Promise<WhatsAppStatusResponse> {
    return api
      .get("/admin/whatsapp-status")
      .then((res) => res.data);
  },

  getQR(): Promise<WhatsAppQRResponse> {
    return api
      .get("/admin/whatsapp-qr")
      .then((res) => res.data);
  },
};

// ── Branch Alerts ─────────────────────────────

export interface GetAlertsParams {
  page?: number;
  limit?: number;
}

export const alertsService = {
  getAll(params: GetAlertsParams = {}): Promise<BranchAlertsResponse> {
    const { page = 1, limit = 10 } = params;

    return api
      .get(`/branch-alerts?page=${page}&limit=${limit}`)
      .then((res) => res.data);
  },

  getActive(): Promise<ActiveAlertsResponse> {
    return api
      .get("/branch-alerts/active")
      .then((res) => res.data);
  },

  getById(id: string): Promise<{ ok: boolean; data: BranchAlert }> {
    return api
      .get(`/branch-alerts/${id}`)
      .then((res) => res.data);
  },
};

// ── Polling helpers ───────────────────────────

export function pollWhatsAppStatus(
  onStatus: (status: WhatsAppStatusResponse["status"]) => boolean,
  intervalMs = 3000
): () => void {
  let timer: ReturnType<typeof setInterval>;

  const tick = async () => {
    try {
      const res = await whatsAppService.getStatus();
      const status = res.status;

      const keepGoing = onStatus(status);

      if (!keepGoing) {
        clearInterval(timer);
      }
    } catch (error) {
      // swallow polling errors
    }
  };

  tick();
  timer = setInterval(tick, intervalMs);

  return () => clearInterval(timer);
}