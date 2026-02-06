import { Bird, LucideVan } from "lucide-react";
import { Card } from "../ui/card";

export default function TopBird() {
  return (
    <div className="w-full">
      

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
              <Bird />
              <p className="text-[12px] font-semibold">Total Live Birds</p>
            </div>
            <LucideVan />
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
              <Bird />
              <p className="text-[12px] font-semibold">Total Mortality</p>
            </div>
            <LucideVan />
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
              <p className="text-[12px] font-semibold">Farm Staff</p>
            </div>
            <LucideVan />
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
            <p className="text-[12px] font-semibold">Active Breaches</p>
            <LucideVan />
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
