import { api } from "@/lib/api/axios";

/* =======================
   FULL BACKEND RESPONSE
======================= */
export interface DashboardApiResponse {
  ok: boolean;
  data: DashboardData;
}

export interface DashboardData {
  stats: {
    totalLiveBirds: number;
    totalMortality: number;
    farmStaff: number;
    activeThresholds: number;
  };
  charts: {
    mortalityRate: {
      _id: string;
      date: string;
      mortalityRate: number | null;
    }[];
    eggProduction: {
      _id: string;
      totalEggs: number;
      date: string;
    }[];
    eggHealth: {
      _id: string;
      goodEggs: number;
      defectEggs: number;
      date: string;
    }[];
  };
  alerts: Alert[] | null;
}

/* =======================
   ALERT (BACKEND)
======================= */
export interface Alert {
  _id: string;
  farmId?: string;
  mortalityRate: {
    warning: number;
    critical: number;
  };
  temperatureRange: {
    min: number;
    max: number;
  };
  feedConsumptionDeviation: {
    lowerLimit: {
      warning: number;
      critical: number;
    };
    upperLimit: {
      warning: number;
      critical: number;
    };
  };
  useIndustryBenchmarks: boolean;
  useSystemThreshold: boolean;
  eggProductionPerBird: {
    ageRange: string;
    eggsPerWeek: number;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

/* =======================
   SERVICE
======================= */
export const dashboardService = {
  async getAdminDashboard(): Promise<DashboardData> {
    const res = await api.get<DashboardApiResponse>("/admin/dashboard");
    return res.data.data;
  },
};