import { api } from "@/lib/api/axios";

export interface DashboardResponse {
  totalLiveBirds: number;
  totalMortality: number;
  farmStaff: number;
  activeBreaches: number;

  mortalityChart: { day: string; value: number }[];
  eggProductionChart: { day: string; value: number }[];
  eggHealthChart: { day: string; good: number; cracked: number; soft: number }[];

  alerts: {
    id: string;
    date: string;
    status: "Critical" | "Warning";
    issue: string;
    description: string;
  }[];
}

export const dashboardService = {
  getAdminDashboard(): Promise<DashboardResponse> {
    return api
      .get("/api/v1/admin/dashboard")
      .then((res) => res.data.data);
  },
};