"use client";

import { useEffect, useState } from "react";
import TopInfo from "@/components/dashboard/TopInfo";
import EggProductionChart from "@/components/dashboard/EggProductionChart";
import MortalityChart from "@/components/dashboard/MortalityChart";
import EggHealthChart from "@/components/dashboard/EggHealth";
import AlertsTable from "@/components/dashboard/AlertsTable";
import { getStoredUser } from "@/lib/auth/getUser";
import { DashboardResponse, dashboardService } from "../../../../services/dashboard.service";

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

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

    const user = getStoredUser();
    if (user?.fullName) setUserName(user.fullName);
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="space-y-6 p-4">
      <TopInfo data={data} userName={userName} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MortalityChart data={data?.mortalityChart || []} />
        <EggProductionChart data={data?.eggProductionChart || []} />
      </div>

      <EggHealthChart data={data?.eggHealthChart || []} />

      <AlertsTable alerts={data?.alerts || []} />
    </div>
  );
}