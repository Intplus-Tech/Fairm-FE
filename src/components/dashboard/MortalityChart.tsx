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

type MortalityChartItem = {
  day: string;
  value: number;
};

export default function MortalityChart({
  data,
}: {
  data: MortalityChartItem[];
}) {
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
      </div>
    </ChartCard>
  );
}