import { FarmGateSaleRequest } from "@/types/farm-gate-sales";

interface Props {
  saleData: FarmGateSaleRequest;
  updateField: <K extends keyof FarmGateSaleRequest>(
    field: K,
    value: FarmGateSaleRequest[K]
  ) => void;
}

export default function PackagingDetails({ saleData, updateField }: Props) {
  const handlePackingChange = (
    field: keyof FarmGateSaleRequest["packingDetails"],
    value: string
  ) => {
    updateField("packingDetails", {
      ...saleData.packingDetails,
      [field]:
        field === "cratesUsed" || field === "sacksUsed"
          ? Number(value) || 0
          : field === "loadedAt"
          ? new Date(`1970-01-01T${value}:00`)
          : value,
    });
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">

      <h2 className="font-semibold text-lg">
        Packaging Details
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm">Crates Used</label>
          <input
          type="number"
            value={saleData.packingDetails.cratesUsed}
            onChange={(e) => handlePackingChange("cratesUsed", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Sacks Used</label>
          <input
            type="number"
            value={saleData.packingDetails.sacksUsed}
            onChange={(e) => handlePackingChange("sacksUsed", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Vehicle</label>
          <input
            value={saleData.packingDetails.vehicle}
            onChange={(e) => handlePackingChange("vehicle", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Loading Time</label>
          <input
            type="time"
            value={saleData.packingDetails.loadedAt.toTimeString().slice(0, 5)}
            onChange={(e) => handlePackingChange("loadedAt", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Loaded By</label>
          <input
            value={saleData.packingDetails.loadedBy}
            onChange={(e) => handlePackingChange("loadedBy", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Verified By</label>
          <input
            value={saleData.packingDetails.verifiedBy}
            onChange={(e) => handlePackingChange("verifiedBy", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

      </div>

    </div>
  );
}