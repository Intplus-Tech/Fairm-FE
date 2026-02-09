import { Card } from "@/components/ui/card";
import { AlertTriangle, Bird, Info, UserPlus, } from "lucide-react";


export default function TopBroiler() {
  return (
    <div className="w-full">
      <div className="pb-5">
        <p className="font-semibold p-1">Good Morning, John.</p>
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
              <p className="text-[12px] font-semibold">Total Birds</p>
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
              <Bird className="text-[#4A3AFF]  h-[18px] w-[18px] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
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
              <Bird className="text-[#4A3AFF]  h-[18px] w-[18px] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
              <p className="text-[12px] font-semibold">Total Alive Bird</p>
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
              <Bird className="text-[#4A3AFF]  h-[18px] w-[18px] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
              <p className="text-[12px] font-semibold">Net Profit</p>
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
