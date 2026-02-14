import { useState } from "react";
import ThresholdModal from "./ThresholdModal";
import ThresholdTable from "./ThresholdTable";

export default function ThresholdSettings() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div className="rounded-xl border p-4 bg-white">
              <h3 className="font-medium">Threshold Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Set thresholds once for the entire farm. For example, &quot;Always alert if mortality &gt; 2%&quot;.
              </p>
            </div>
      
              <div className="rounded-xl border p-4 bg-white">
                <h3 className="font-medium">Threshold Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Set thresholds once for the entire farm. For example, &quot;Always alert if mortality &gt; 2%&quot;.
                </p>
              </div>
            </div>
            {/* Table Section */}
            <div className="rounded-xl border bg-white p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Threshold Configuration</h2>
                <button
                  onClick={() => setOpen(true)}
                  className="bg-[#5B4DFF] text-white px-4 py-2 rounded-md text-sm"
                >
                  + Create New Threshold
                </button>
              </div>
      
              < ThresholdTable/>
            </div>
          {open && <ThresholdModal onClose={() => setOpen(false)} />}
    </div>
  );
}
