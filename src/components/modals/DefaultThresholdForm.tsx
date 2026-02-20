"use client";

export default function DefaultThresholdForm({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="flex flex-col max-h-[85vh] rounded-lg bg-transparent border-2 border-[#EFF0F6] p-6">
      {/* HEADER */}
      <h2 className="text-lg font-semibold mb-4">
        Set Default Alert Thresholds
      </h2>

      {/* SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1 space-y-6">
        {/* Toggles */}
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            Use Industry benchmarks
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Use System Threshold
          </label>
        </div>

        {/* Mortality Rate */}
        <div>
          <h3 className="font-medium mb-2">Mortality Rate *</h3>
          <div className="grid grid-cols-2 gap-4">
            <input className="border rounded-lg px-3 py-2 text-sm" />
            <input className="border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        {/* Temperature */}
        <div>
          <h3 className="font-medium mb-2">
            Temperature Range (°C) *
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input className="border rounded-lg px-3 py-2 text-sm" />
            <input className="border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        {/* Feed Consumption */}
        <div>
          <h3 className="font-medium mb-2">
            Feed Consumption Deviation *
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input className="border rounded-lg px-3 py-2 text-sm" />
            <input className="border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        {/* Egg Production */}
        <div>
          <h3 className="font-medium mb-2">
            Egg Production (Birds) *
          </h3>

          <div className="space-y-2 text-sm">
            {[
              "18–20 weeks",
              "21–30 weeks",
              "31–50 weeks",
              "51–72 weeks",
              "72+ weeks",
            ].map((age) => (
              <div
                key={age}
                className="grid grid-cols-2 gap-4 items-center"
              >
                <span>{age}</span>
                <input
                  value="12"
                  disabled
                  className="border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          onClick={onBack}
          className="border px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={onComplete}
          className="bg-[#4A3AFF] text-white px-5 py-2 rounded-lg"
        >
          Save & Activate
        </button>
      </div>
    </div>
  );
}
