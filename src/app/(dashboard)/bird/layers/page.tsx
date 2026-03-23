import LayersTable from "@/components/birds/layers/LayersTable";
import TopLayer from "../../../../components/birds/layers/TopLayer";

export default function LayersPage() {
  return (
    <div className="p-6">
      <TopLayer/>
      <h2 className="text-lg font-semibold">Layers Report</h2>
      <p className="text-sm text-gray-500 mb-6">
        For Layers, the high-level summary must show HDP (Hen-Day Production)
        and Egg Grading.
      </p>

      <LayersTable />
    </div>
  );
}
