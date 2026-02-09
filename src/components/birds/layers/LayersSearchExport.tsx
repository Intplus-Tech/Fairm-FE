"use client";

export default function LayersSearchExport() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div className="relative max-w-md w-full">
        <input
          type="text"
          placeholder="Search by pens, Stock or Inventory"
          className="w-full rounded-lg border px-10 py-2 text-sm focus:outline-none"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
      </div>

      <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
        ⬇ Export CSV
      </button>
    </div>
  );
}
