"use client";

import SearchAndExport from "./SearchAndExport";
import BroilerTable from "./BroilerTable";

export default function BroilerReport() {
  return (
    <section className="bg-white rounded-xl border p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-[#1C155F]">
          Broiler Report
        </h2>
        <p className="text-sm text-gray-500">
          Rapid growth and feed efficiency. High mortality or low feed intake here triggers immediate &quot;Red&quot; alerts.
        </p>
      </div>

      {/* SEARCH & EXPORT */}
      <SearchAndExport />

      {/* TABLE */}
      <BroilerTable />
    </section>
  );
}
