"use client";

import { useEffect, useState } from "react";
import TopBroiler from "@/components/birds/broiler/TopBroiler";
import SearchAndExport from "@/components/birds/broiler/SearchAndExport";
import BroilerTable from "@/components/birds/broiler/BroilerTable";
import { BroilerRowData } from "@/types/broiler";
import { broilerService, Pen } from "../../../../../services/broiler.service";

export default function BroilerDashboardPage() {
  const [summary, setSummary] = useState<any>({});
  const [search, setSearch] = useState("");
  const [data, setData] = useState<BroilerRowData[]>([]);
  const [pens, setPens] = useState<Pen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await broilerService.getDashboard();

        setSummary(res.summary);
        setData(res.rows);
        setPens(res.pens);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading broiler dashboard...</p>;

  return (
    <div className="space-y-6">
      <TopBroiler summary={summary} userName="Admin" />
      <SearchAndExport onSearch={setSearch} />
      <BroilerTable search={search} data={data} pens={pens} />
    </div>
  );
}