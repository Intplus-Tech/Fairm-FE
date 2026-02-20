import { AlertTriangle, Bird, Info, UserPlus, } from "lucide-react";
import { Card } from "../ui/card";

export default function TopInfo() {
  return (
    <div className="w-full">
      <div className="pb-5">
        <p className="text-2xl font-semibold p-1 text-[#170F49]">
          Good Morning, John.
        </p>
      </div>
      {/* Cards container */}
      <div
        className="
          flex gap-2
          overflow-x-auto
          whitespace-nowrap
          scrollbar-hide
          md:overflow-visible
        "
      >
        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Bird className="text-[#4A3AFF]  h-[18px] w-[18px] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]"/>
              <p className="text-[12px] font-semibold">Total Live Birds</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]"/>
          </div>

          <div>
            <p className="text-[18px] font-bold">0</p>
            <div className="text-[10px] font-semibold">
              Current bird count
            </div>
          </div>
        </Card>

        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Bird className="text-[#FF0004] h-[18px] w-[18px] border border-[#FF00041A] rounded-full bg-[#FF00041A] "/>
              <p className="text-[12px] font-semibold">Total Mortality</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]" />
          </div>

          <div>
            <p className="text-[18px] font-bold">0</p>
            <div className="text-[10px] font-semibold">
              Current bird count
            </div>
          </div>
        </Card>

        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <UserPlus size={18} className="text-[#4A3AFF] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
              <p className="text-[12px] font-semibold">Farm Staff</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]" />
          </div>

          <div>
            <p className="text-[18px] font-bold">0</p>
            <div className="text-[10px] font-semibold">
              Current bird count
            </div>
          </div>
        </Card>

        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <AlertTriangle size={18} className="text-[#FF0004] border border-[#FF00041A] rounded-full bg-[#FF00041A]"/>
              <p className="text-[12px] font-semibold">Active Breaches</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]" />
          </div>

          <div>
            <p className="text-[18px] font-bold">0</p>
            <div className="text-[10px] font-semibold">
              Current bird count
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
