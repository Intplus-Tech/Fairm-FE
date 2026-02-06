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
import { eggProductionData } from "./data/mockDashboardData";
// import { eggProductionData } from "../data/mockDashboardData";

export default function EggProductionChart() {
  return (
    <ChartCard
      title="Egg Production"
      actions={
        <div className="flex gap-2">
          <select className="border rounded-md px-2 py-1 text-sm"><option>All Pens</option></select>
          <select className="border rounded-md px-2 py-1 text-sm"><option>Days</option></select>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={eggProductionData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#6C63FF" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
