// services/pullet.service.ts
export interface PulletRowData {
  id: number;
  date: string;
  pens: number;
  stock: number; // numeric
  mortality: number;
  feed: number;
  weight: number;
  alert: "Critical" | "Warning" | "Normal";
}

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
    const token = localStorage.getItem("token"); // your auth token
    if (!token) throw new Error("Missing auth token");

    const res = await fetch(
      "https://fairm-be.onrender.com/api/v1/birds/pullet/dashboard",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to fetch pullet dashboard");
    }

    return res.json();
  },
};