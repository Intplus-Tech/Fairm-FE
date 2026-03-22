import { api } from "@/lib/api/axios";
import { BroilerRowData } from "@/types/broiler";

export interface BroilerDashboardResponse {
  summary: {
    totalBirds: number;
    totalMortality: number;
    totalAlive: number;
    netProfit: number;
  };
  rows: BroilerRowData[];
}

export const broilerService = {
  async getDashboard(): Promise<BroilerDashboardResponse> {
    const res = await api.get("/birds/broiler/dashboard");

    // ✅ SAFE RESPONSE HANDLING
    const payload = res.data?.data ?? res.data;

    return {
      summary: payload?.summary ?? {
        totalBirds: 0,
        totalMortality: 0,
        totalAlive: 0,
        netProfit: 0,
      },
      rows: payload?.rows ?? [],
    };
  },

  async getById(id: number) {
    const res = await api.get(`/birds/broiler/${id}`);
    return res.data?.data ?? res.data;
  },
};