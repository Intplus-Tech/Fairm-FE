import { api } from "@/lib/api/axios";
import { BroilerRowData } from "@/types/broiler";

/* =======================
   API TYPES
======================= */
export interface BroilerApiResponse {
  ok: boolean;
  data: BroilerData;
}

export interface BroilerData {
  stats: {
    totalBirds: number;
    totalMortality: number;
    totalAliveBirds: number;
  };
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  pens: Pen[];
}

export interface Pen {
  penId: string;
  penName: string;
  ageInDays: number;
  liveBirds: number;
  mortality: number;
  culls: number;
  feedConsumed: number;
  waterConsumed: number;
  averageWeight: number;
}

/* =======================
   FINAL RESPONSE TYPE
======================= */
export interface BroilerDashboardResponse {
  summary: {
    totalBirds: number;
    totalMortality: number;
    totalAlive: number;
    netProfit: number;
  };
  rows: BroilerRowData[];
  pens: Pen[];
}

/* =======================
   SERVICE
======================= */
export const broilerService = {
  async getDashboard(): Promise<BroilerDashboardResponse> {
    const res = await api.get<BroilerApiResponse>(
      "/birds/broiler/dashboard"
    );

    const payload = res.data?.data;

    return {
      summary: {
        totalBirds: payload?.stats.totalBirds ?? 0,
        totalMortality: payload?.stats.totalMortality ?? 0,
        totalAlive: payload?.stats.totalAliveBirds ?? 0,
        netProfit: 0,
      },

      pens: payload?.pens ?? [],

      rows:
        payload?.pens.map((pen): BroilerRowData => ({
          id: pen.penId,
          date: new Date().toISOString().split("T")[0],
          pens: payload.pens.length,
          stock: pen.liveBirds,
          mortality: pen.mortality,
          culls: pen.culls,
          feed: pen.feedConsumed,
          water: pen.waterConsumed,
          weight: pen.averageWeight,
          alert: pen.mortality > 10 ? "Critical" : "Warning",
        })) ?? [],
    };
  },

  async getById(id: string) {
    const res = await api.get(`/birds/broiler/${id}`);
    return res.data?.data ?? res.data;
  },
};