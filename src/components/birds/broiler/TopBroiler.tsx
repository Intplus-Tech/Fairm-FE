"use client";

import { Card } from "@/components/ui/card";

interface TopBroilerProps {
  summary: {
    totalBirds?: number;
    totalMortality?: number;
    totalAlive?: number;
    netProfit?: number;
  };
  userName: string;
}

export default function TopBroiler({ summary, userName }: TopBroilerProps) {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="w-full">
      {/* Greeting */}
      <div className="pb-5">
        <p className="font-semibold p-1">
          {greeting()}, {userName || "User"}.
        </p>
      </div>

      {/* Cards Row */}
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide md:overflow-visible">
        {/* Total Birds */}
        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <p className="text-xs">Total Birds</p>
          <p className="text-[18px] font-bold">{summary?.totalBirds ?? 0}</p>
        </Card>

        {/* Mortality */}
        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <p className="text-xs">Mortality</p>
          <p className="text-[18px] font-bold">{summary?.totalMortality ?? 0}</p>
        </Card>

        {/* Alive */}
        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <p className="text-xs">Alive</p>
          <p className="text-[18px] font-bold">{summary?.totalAlive ?? 0}</p>
        </Card>

        {/* Net Profit */}
        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <p className="text-xs">Net Profit</p>
          <p className="text-[18px] font-bold">{summary?.netProfit ?? 0}</p>
        </Card>
      </div>
    </div>
  );
}