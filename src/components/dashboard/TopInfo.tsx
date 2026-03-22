"use client";

import { AlertTriangle, Bird, Info, UserPlus } from "lucide-react";
import { Card } from "../ui/card";
import { DashboardData } from "../../../services/dashboard.service";
// import { DashboardResponse } from "../../../services/dashboard.service";
// import { DashboardResponse } from "@/services/dashboard.service";

interface TopInfoProps {
  data: DashboardData | null;
  userName: string;
}

export default function TopInfo({ data, userName }: TopInfoProps) {
  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
console.log("TopInfo farmStaff:", data);
  return (
    <div className="w-full">
      {/* Greeting */}
      <div className="pb-5">
        <p className="text-2xl font-semibold p-1 text-[#170F49]">
          {greeting()}, {userName || "User"}.
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide md:overflow-visible">
        
        {/* Total Live Birds */}
        <Card className="w-[70vw] sm:w-[300px] md:w-[320px] lg:w-[290px] h-[170px] p-5 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full border border-[#4A3AFF1A] bg-[#4A3AFF1A]">
                <Bird className="h-6 w-6 text-[#4A3AFF]" />
              </div>
              <p className="text-sm font-semibold">Total Live Birds</p>
            </div>
            <Info className="h-5 w-5 text-[#141B34]" />
          </div>

          <div>
            <p className="text-[22px] font-bold">
              {data?.stats.totalLiveBirds }
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              Current bird count
            </p>
          </div>
        </Card>

        {/* Total Mortality */}
        <Card className="w-[70vw] sm:w-[300px] md:w-[320px] lg:w-[290px] h-[170px] p-5 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full border border-[#FF00041A] bg-[#FF00041A]">
                <Bird className="h-6 w-6 text-[#FF0004]" />
              </div>
              <p className="text-sm font-semibold">Total Mortality</p>
            </div>
            <Info className="h-5 w-5 text-[#141B34]" />
          </div>

          <div>
            <p className="text-[22px] font-bold">
              {data?.stats.totalMortality}
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              Current mortality count
            </p>
          </div>
        </Card>

        {/* Farm Staff */}
        <Card className="w-[80vw] sm:w-[300px] md:w-[320px] lg:w-[280px] h-[170px] p-5 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full border border-[#4A3AFF1A] bg-[#4A3AFF1A]">
                <UserPlus className="h-6 w-6 text-[#4A3AFF]" />
              </div>
              <p className="text-sm font-semibold">Farm Staff</p>
            </div>
            <Info className="h-5 w-5 text-[#141B34]" />
          </div>

          <div>
            <p className="text-[22px] font-bold">
              {data?.stats.farmStaff }
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              Total staff count
            </p>
          </div>
        </Card>

        {/* Active Breaches */}
        <Card className="w-[80vw] sm:w-[300px] md:w-[320px] lg:w-[280px] h-[170px] p-5 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full border border-[#FF00041A] bg-[#FF00041A]">
                <AlertTriangle className="h-6 w-6 text-[#FF0004]" />
              </div>
              <p className="text-sm font-semibold">Active Breaches</p>
            </div>
            <Info className="h-5 w-5 text-[#141B34]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-[22px] font-bold">
                {data?.stats.activeBreaches }
              </p>
              <span className="text-[#FF0004] bg-[#FF00041A] text-[10px] p-1">
                Critical
              </span>
            </div>

            <p className="text-xs font-semibold text-muted-foreground">
              Current breaches
            </p>
          </div>
        </Card>

      </div>
    </div>
  );
}