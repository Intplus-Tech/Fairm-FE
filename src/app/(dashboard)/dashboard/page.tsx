"use client";

import { useEffect, useState } from "react";
import TopInfo from "@/components/dashboard/TopInfo";
import EggProductionChart from "@/components/dashboard/EggProductionChart";
import MortalityChart from "@/components/dashboard/MortalityChart";
import EggHealthChart from "@/components/dashboard/EggHealth";
import AlertsTable from "@/components/dashboard/AlertsTable";
import { getStoredUser } from "@/lib/auth/getUser";
import { Alert } from "@/types/dashboard";
import {
  DashboardData,
  dashboardService,
} from "../../../../services/dashboard.service";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const [userName, setUserName] = useState(() => {
    const storedUser = getStoredUser();
    return storedUser?.fullName ?? "";
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await dashboardService.getAdminDashboard();
        setData(res);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "fairm_user") {
        const updatedUser = getStoredUser();
        setUserName(updatedUser?.fullName ?? "");
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  /* =======================
     TRANSFORM DATA FOR UI
  ======================= */

  const mortalityChartData =
    (data?.charts?.mortalityRate ?? []).map((item) => ({
      day: item.date,
      value: item.mortalityRate ?? 0,
    }));

  const eggProductionChartData =
    (data?.charts?.eggProduction ?? []).map((item) => ({
      day: item.date,
      value: item.totalEggs,
    }));

  const eggHealthChartData =
    (data?.charts?.eggHealth ?? []).map((item) => ({
      day: item.date,
      good: item.goodEggs,
      cracked: item.defectEggs,
      soft: 0,
    }));

  const alertsData: Alert[] =
    (data?.alerts ?? []).map((alert) => ({
      id: alert._id,
      date: new Date(alert.createdAt).toLocaleDateString(),
      status:
        alert.mortalityRate.critical > 10 ? "Critical" : "Warning",
      issue: "Mortality Rate",
      description: `Warning at ${alert.mortalityRate.warning}%, Critical at ${alert.mortalityRate.critical}%`,
    }));

  return (
    <div className="space-y-6 p-4">
      <TopInfo data={data} userName={userName} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MortalityChart />
        <EggProductionChart data={eggProductionChartData} />
      </div>

      <EggHealthChart data={eggHealthChartData} />

      <AlertsTable alerts={data?.alerts ?? null} />
    </div>
  );
}