"use client";

import { AlertTriangle, Bird, Info } from "lucide-react";
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
      <div
        className="
          flex gap-2
          overflow-x-auto
          whitespace-nowrap
          scrollbar-hide
          md:overflow-visible
        "
      >
        {/* Total Birds */}
        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Bird className="text-[#4A3AFF] h-[18px] w-[18px] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
              <p className="text-[12px] font-semibold">Total Birds</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]" />
          </div>

          <div>
            <p className="text-[18px] font-bold">
              {summary?.totalBirds ?? 0}
            </p>
            <div className="text-[10px] font-semibold">
              Current bird count
            </div>
          </div>
        </Card>

        {/* Mortality */}
        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Bird className="text-[#4A3AFF] h-[18px] w-[18px] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
              <p className="text-[12px] font-semibold">Mortality</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]" />
          </div>

          <div>
            <p className="text-[18px] font-bold">
              {summary?.totalMortality ?? 0}
            </p>
            <div className="text-[10px] font-semibold">
              Current mortality count
            </div>
          </div>
        </Card>

        {/* Alive */}
        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Bird className="text-[#4A3AFF] h-[18px] w-[18px] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
              <p className="text-[12px] font-semibold">Alive</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]" />
          </div>

          <div>
            <p className="text-[18px] font-bold">
              {summary?.totalAlive ?? 0}
            </p>
            <div className="text-[10px] font-semibold">
              Current alive birds
            </div>
          </div>
        </Card>

        {/* Net Profit */}
        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <AlertTriangle
                size={18}
                className="text-[#FF0004] border border-[#FF00041A] rounded-full bg-[#FF00041A]"
              />
              <p className="text-[12px] font-semibold">Net Profit</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]" />
          </div>

          <div>
            <p className="text-[18px] font-bold">
              {summary?.netProfit ?? 0}
            </p>
            <div className="text-[10px] font-semibold">
              Financial performance
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}