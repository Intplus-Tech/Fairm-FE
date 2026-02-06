"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartCard from "./ChartCard";
import { eggHealthData } from "./data/mockDashboardData";


export default function EggHealthChart() {
  return (
    <ChartCard
      title="Egg Health"
      actions={
        <div className="flex gap-2">
          <select className="border rounded-md px-2 py-1 text-sm"><option>All Eggs</option></select>
          <select className="border rounded-md px-2 py-1 text-sm"><option>All Pens</option></select>
          <select className="border rounded-md px-2 py-1 text-sm"><option>Days</option></select>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={eggHealthData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="good" stroke="green" />
          <Line dataKey="cracked" stroke="gold" />
          <Line dataKey="soft" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
