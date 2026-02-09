import LayersTable from "@/components/birds/layers/LayersTable";

export default function LayersPage() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Layers Report</h2>
      <p className="text-sm text-gray-500 mb-6">
        For Layers, the high-level summary must show HDP (Hen-Day Production)
        and Egg Grading.
      </p>

      <LayersTable />
    </div>
  );
}
