"use client";

import { useEffect, useState, useMemo } from "react";
import TopPullet from "@/components/birds/pullet/TopPullet";
import PulletTable from "@/components/birds/pullet/PulletTable";
import { PulletRowData, pulletService } from "../../../../../services/pullet.service";
// import { pulletService, PulletRowData } from "@/services/pullet.service";

export default function PulletPage() {
  const [data, setData] = useState<PulletRowData[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await pulletService.getDashboard();
        setData(res.rows ?? []);
        setSummary(res.summary ?? {});
      } catch (err) {
        console.error("Failed to fetch pullet dashboard:", err);
        setData([]);
        setSummary({});
      }
    };
    fetchDashboard();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  return (
    <section className="space-y-6">
      <div>
        <TopPullet summary={summary} />
      </div>

      <div className="bg-white rounded-xl border p-6 space-y-6">
        <h2 className="text-xl font-semibold">Pullet Report</h2>
        <p className="text-sm text-gray-500">
          Achieving weight targets and skeletal development before the first egg.
        </p>

        <PulletTable
          data={filteredData}
          onSearch={setSearch}
        />
      </div>
    </section>
  );
}