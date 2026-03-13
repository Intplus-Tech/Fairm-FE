"use client";

export default function MortalityHeader() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl">
      <h1 className="text-2xl font-semibold">
        Daily Mortality & Health Entry
      </h1>

      <p className="text-sm opacity-90">
        Track flock health and mortality records
      </p>

      <div className="flex flex-wrap gap-6 mt-4 items-center text-sm">
        <div>Saturday, January 31, 2026</div>

        <div className="flex items-center gap-2">
          Time
          <select className="text-black rounded px-2 py-1">
            <option>8:00</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          Checked By
          <select className="text-black rounded px-2 py-1">
            <option>Ajewole Iyanoluwa</option>
          </select>
        </div>
      </div>
    </div>
  );
}