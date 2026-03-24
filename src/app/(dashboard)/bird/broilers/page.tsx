"use client";

import { useEffect, useState } from "react";
import TopBroiler from "@/components/birds/broiler/TopBroiler";
import SearchAndExport from "@/components/birds/broiler/SearchAndExport";
import BroilerTable from "@/components/birds/broiler/BroilerTable";
import { BroilerRowData } from "@/types/broiler";
import { broilerService } from "../../../../../services/broiler.service";

/* =======================
   MOCK DATA (MATCH BACKEND)
======================= */
const mockBroilerData: BroilerRowData[] = [
  {
    id: "mock-1",
    date: "2026-03-18",
    pens: 1,
    stock: 12981,
    mortality: 81,
    culls: 42,
    feed: 230,
    water: 0,
    weight: 3.45,
    alert: "Critical",
  },
];

export default function BroilerDashboardPage() {
  const [summary, setSummary] = useState<any>({});
  const [search, setSearch] = useState("");
  const [data, setData] = useState<BroilerRowData[]>(mockBroilerData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await broilerService.getDashboard();

        console.log("BROILER API:", res); // ✅ debug

        setSummary(res?.summary ?? {});

        if (Array.isArray(res?.rows) && res.rows.length > 0) {
          setData(res.rows);
        } else {
          setData(mockBroilerData); // fallback
        }

        setError("");
      } catch (err: any) {
        console.error("Dashboard error:", err);

        setError(err?.message || "Failed to load dashboard");

        setData(mockBroilerData);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading broiler dashboard...</p>;
  }

  if (error) {
    console.warn(error);
  }

  return (
    <div className="space-y-6">
      <TopBroiler summary={summary} userName="Admin" />
      <SearchAndExport onSearch={setSearch} />
      <BroilerTable search={search} data={data} />
    </div>
  );
}