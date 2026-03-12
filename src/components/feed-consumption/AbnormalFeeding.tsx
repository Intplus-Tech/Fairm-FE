"use client";

export default function AbnormalFeeding() {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-3">Abnormal Feeding Behaviour</h2>

      <div className="flex flex-wrap gap-4 text-sm mb-4">
        {[
          "Reduced Appetite",
          "Selective Feeding",
          "Over Consumption",
          "Feed Wastage",
          "Aggression at feeder",
          "Other",
        ].map((item) => (
          <label key={item} className="flex gap-1">
            <input type="checkbox" />
            {item}
          </label>
        ))}
      </div>

      <textarea
        className="w-full border rounded p-3 text-sm"
        rows={3}
        placeholder="Additional Notes..."
        defaultValue="Water leak in Pen 3 needs repair. Birds eating normally."
      />
    </div>
  );
}