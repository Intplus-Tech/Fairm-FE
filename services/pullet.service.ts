import { api } from "@/lib/api/axios";
import { PulletRowData } from "@/types/pullet";

export interface PulletDashboardResponse {
  summary: {
    totalBirds: number;
    totalMortality: number;
    totalAlive: number;
    activeBreaches: number;
  };
  rows: PulletRowData[];
}

export const pulletService = {
  getDashboard: async (): Promise<PulletDashboardResponse> => {
    const res = await api.get("/birds/pullet/dashboard"); // ✅ correct
    return res.data.data || res.data; // supports both backend formats
  },
};