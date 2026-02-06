
import TopInfo from "@/components/dashboard/TopInfo";

import EggProductionChart from "@/components/dashboard/EggProductionChart";


import AskFairmAIButton from "@/components/dashboard/AskFairmAIButton";
import MortalityChart from "@/components/dashboard/MortalityChart";
import EggHealthChart from "@/components/dashboard/EggHealth";
import AlertsTable from "@/components/dashboard/AlertsTable";

export default function dashboard() {
  return (
    <div className="space-y-6 p-4">
      <div><TopInfo /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MortalityChart/>
        <EggProductionChart />
      </div>

     <EggHealthChart/>
      <AlertsTable/>

      <AskFairmAIButton />
    </div>
  );
}
