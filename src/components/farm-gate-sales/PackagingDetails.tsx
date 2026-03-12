interface Props {
  saleData: any;
  updateField: (field: string, value: any) => void;
}

export default function PackagingDetails({ saleData, updateField }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">

      <h2 className="font-semibold text-lg">
        Packaging Details
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm">Crates Used</label>
          <input
            value={saleData.cratesUsed}
            onChange={(e)=>updateField("cratesUsed", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Sacks Used</label>
          <input
            value={saleData.sacksUsed}
            onChange={(e)=>updateField("sacksUsed", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Vehicle</label>
          <input
            value={saleData.vehicle}
            onChange={(e)=>updateField("vehicle", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Loading Time</label>
          <input
            type="time"
            value={saleData.loadingTime}
            onChange={(e)=>updateField("loadingTime", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Loaded By</label>
          <input
            value={saleData.loadedBy}
            onChange={(e)=>updateField("loadedBy", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm">Verified By</label>
          <input
            value={saleData.verifiedBy}
            onChange={(e)=>updateField("verifiedBy", e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
          />
        </div>

      </div>

    </div>
  );
}