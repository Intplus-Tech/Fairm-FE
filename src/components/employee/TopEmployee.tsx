import { Card } from "@/components/ui/card";
import { Bird, Info, UserPlus,  } from "lucide-react";


export default function TopEmployee() {
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
              <UserPlus size={18} className="text-[rgb(74,58,255)] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
              <p className="text-[12px] font-semibold">Managers</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]"/>
          </div>

          <div>
            <p className="text-[18px] font-bold">3</p>
            <div className="text-[10px] font-semibold">
              Current bird count
            </div>
          </div>
        </Card>

        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <UserPlus size={18} className="text-[#4A3AFF] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
              <p className="text-[12px] font-semibold">Supervisors</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]" />
          </div>

          <div>
            <p className="text-[18px] font-bold">12</p>
            <div className="text-[10px] font-semibold">
              Current bird count
            </div>
          </div>
        </Card>

        <Card className="w-[218px] h-[114px] p-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <UserPlus size={18} className="text-[#4A3AFF] border border-[#4A3AFF1A] rounded-full bg-[#4A3AFF1A]" />
              <p className="text-[12px] font-semibold">Attendants</p>
            </div>
            <Info className="h-[14px] w-[14px] text-[#141B34]" />
          </div>

          <div>
            <p className="text-[18px] font-bold">58</p>
            <div className="text-[10px] font-semibold">
              Current bird count
            </div>
          </div>
        </Card>

       
      </div>
    </div>
  );
}
