"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "./ChartCard";
import { mortalityData } from "./data/mockDashboardData";
// import { mortalityData } from "../data/mockDashboardData";

export default function MortalityChart() {
  return (
    <ChartCard
      title="Mortality Rate"
      actions={<select className="border rounded-md px-2 py-1 text-sm"><option>Days</option></select>}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mortalityData}>
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
    </ChartCard>
  );
}
