import { AlertTriangle, Bird, Info, UserPlus } from "lucide-react";
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
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide md:overflow-visible">
        {/* Card 1 */}
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
            <p className="text-[22px] font-bold">0</p>
            <p className="text-xs font-semibold text-muted-foreground">
              Current bird count
            </p>
          </div>
        </Card>

        {/* Card 2 */}
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
            <p className="text-[22px] font-bold">0</p>
            <p className="text-xs font-semibold text-muted-foreground">
              Current bird count
            </p>
          </div>
        </Card>

        {/* Card 3 */}
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
            <p className="text-[22px] font-bold">0</p>
            <p className="text-xs font-semibold text-muted-foreground">
              Current bird count
            </p>
          </div>
        </Card>

        {/* Card 4 */}
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
              <p className="text-[22px] font-bold">0</p>
              <p className="text-[#FF0004] bg-[#FF00041A] text-[10px] p-1">Critical</p>
            </div>
           
            <p className="text-xs font-semibold text-muted-foreground">
              Current bird count
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}