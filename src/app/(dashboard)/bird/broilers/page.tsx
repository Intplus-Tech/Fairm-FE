"use client";

import { useEffect, useState } from "react";
import { broilerService, BroilerRowData } from "../../../../../services/broiler.service";
import TopBroiler from "@/components/birds/broiler/TopBroiler";
import SearchAndExport from "@/components/birds/broiler/SearchAndExport";
import BroilerTable from "@/components/birds/broiler/BroilerTable";

// ✅ FIXED MOCK DATA: all numeric fields are numbers
const mockBroilerData: BroilerRowData[] = [
  {
    id: 1,
    date: "2026-03-18",
    pens: 4,
    stock: 12981, // number instead of string
    mortality: 81,
    culls: 42,
    feed: 230,
    water: 0,
    weight: 3.45,
    alert: "Critical",
  },
  {
    id: 2,
    date: "2026-03-17",
    pens: 3,
    stock: 12000,
    mortality: 70,
    culls: 30,
    feed: 200,
    water: 0,
    weight: 3.2,
    alert: "Warning",
  },
  {
    id: 3,
    date: "2026-03-16",
    pens: 5,
    stock: 15000,
    mortality: 90,
    culls: 50,
    feed: 250,
    water: 0,
    weight: 3.8,
    alert: "Critical",
  },
  {
    id: 4,
    date: "2026-03-15",
    pens: 2,
    stock: 8000,
    mortality: 20,
    culls: 10,
    feed: 150,
    water: 0,
    weight: 2.9,
    alert: "Warning",
  },
];

export default function BroilerDashboardPage() {
  const [summary, setSummary] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<BroilerRowData[]>(mockBroilerData); // ✅ use properly typed mock

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await broilerService.getDashboard();

        // ✅ API shape: { summary, rows }
        setSummary(res.summary);
        setData(res.rows ?? mockBroilerData); // fallback to properly typed mock
      } catch (err) {
        console.error("Dashboard error:", err);
        setData(mockBroilerData); // fallback mock if API fails
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">
      <TopBroiler summary={summary} userName="Admin" />

      <SearchAndExport onSearch={setSearch} />

      <BroilerTable search={search} data={data} />
    </div>
  );
}