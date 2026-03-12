import TopInfo from "@/components/dashboard/TopInfo";
import EggProductionChart from "@/components/dashboard/EggProductionChart";
import MortalityChart from "@/components/dashboard/MortalityChart";
import EggHealthChart from "@/components/dashboard/EggHealth";
import AlertsTable from "@/components/dashboard/AlertsTable";
import FloatingAskAI from "@/components/dashboard/FloatingAskAI";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-4">

      <TopInfo />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MortalityChart />
        <EggProductionChart />
      </div>

      <EggHealthChart />

      <AlertsTable />

      <FloatingAskAI />

    </div>
  );
}