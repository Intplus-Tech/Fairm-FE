

import BroilerReport from "@/components/birds/broiler/BirdReport";
import TopBroiler from "@/components/birds/broiler/TopBroiler";



export default function BirdsPage() {
  return (
    <div className="space-y-6">
      <div>
       <TopBroiler/>
      </div>
      <div>
        <BroilerReport />
      </div>
      
    </div>
  )
}
