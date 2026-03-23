import { api } from "@/lib/api/axios";
import { PulletRowData } from "@/types/pullet";

/* =======================
   API TYPES
======================= */
export interface PulletApiResponse {
  ok: boolean;
  data: PulletData;
}

export interface PulletData {
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
  pens: PulletPen[];
}

export interface PulletPen {
  penId: string;
  date: string;
  noOfPens: number;
  openingStock: number;
  mortality: number;
  averageWeight: number;
  alerts: any[];
}

/* =======================
   FINAL RESPONSE TYPE
======================= */
export interface PulletDashboardResponse {
  summary: {
    totalBirds: number;
    totalMortality: number;
    totalAlive: number;
    activeBreaches: number;
  };
  rows: PulletRowData[];
}

/* =======================
   SERVICE
======================= */
export const pulletService = {
  getDashboard: async (): Promise<PulletDashboardResponse> => {
    const res = await api.get<PulletApiResponse>(
      "/birds/pullet/dashboard"
    );

    const payload = res.data?.data;

    return {
      summary: {
        totalBirds: payload?.stats.totalBirds ?? 0,
        totalMortality: payload?.stats.totalMortality ?? 0,
        totalAlive: payload?.stats.totalAliveBirds ?? 0,
        activeBreaches: payload?.pagination.total ?? 0, // fallback logic
      },

      rows:
        payload?.pens.map((pen): PulletRowData => ({
          id: pen.penId,

          date: pen.date,
          pens: pen.noOfPens,
          stock: pen.openingStock,

          mortality: pen.mortality,
          feed: 0, // backend doesn't provide yet
          weight: pen.averageWeight,

          // ✅ simple alert logic
          alert:
            pen.mortality > 10
              ? "Critical"
              : pen.mortality > 5
              ? "Warning"
              : "Normal",
        })) ?? [],
    };
  },
};