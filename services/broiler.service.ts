import { api } from "@/lib/api/axios";

export interface PenDetail {
  penName: string;
  age: number;
  liveBirds: number;
  mortality: number;
  culls: number;
  feed: number;
  water: number;
  weight: number;
  alert: "Critical" | "Warning";
}

export interface BroilerRowData {
  id: number;
  date: string;
  pens: number;
  stock: number;
  mortality: number;
  culls: number;
  feed: number;
  water: number;
  weight: number;
  alert: "Critical" | "Warning";
  penDetails?: PenDetail[];
}

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
  getDashboard(): Promise<BroilerDashboardResponse> {
    return api
      .get("/api/v1/birds/broiler/dashboard")
      .then((res) => res.data.data);
  },

  getById(id: number) {
    return api.get(`/api/v1/birds/broiler/${id}`).then((res) => res.data.data);
  },
};