"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ChartCard from "./ChartCard";
import { dashboardService } from "../../../services/dashboard.service";

type MortalityChartItem = {
  day: string;
  value: number;
};

export default function MortalityChart() {
  const [data, setData] = useState<MortalityChartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const res = await dashboardService.getAdminDashboard();

        const formatted =
          (res.charts?.mortalityRate ?? []).map((item) => ({
            day: item.date,
            value: item.mortalityRate ?? 0,
          }));

        setData(formatted);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <ChartCard
      title="Mortality Rate"
      actions={
        <select className="border rounded-md px-2 py-1 text-sm">
          <option>Days</option>
        </select>
      }
    >
      <div className="h-[250px] w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#FF0000"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}