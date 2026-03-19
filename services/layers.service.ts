import { api } from "@/lib/api/axios";
import { LayersRowData } from "@/types/layers";

export interface LayersDashboardResponse {
  summary: {
    totalBirds: number;
    totalMortality: number;
    totalAlive: number;
    activeBreaches: number;
  };
  rows: LayersRowData[];
}

export const layersService = {
  getDashboard: async (): Promise<LayersDashboardResponse> => {
    const res = await api.get("/birds/layer/dashboard"); // ✅ correct endpoint
    return res.data.data || res.data;
  },
};