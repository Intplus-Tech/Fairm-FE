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

type EggProductionChartItem = {
  day: string;
  value: number;
};

export default function EggProductionChart({
  data,
}: {
  data: EggProductionChartItem[];
})  {
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
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6C63FF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
