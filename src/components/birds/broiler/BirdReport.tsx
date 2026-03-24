"use client";

import BroilerTable from "./BroilerTable";
import SearchAndExport from "./SearchAndExport";

interface Props {
  search: string;
  onSearch: (value: string) => void;
  data: any[];
}

export default function BroilerReport({ search, onSearch, data }: Props) {
  return (
    <section className="bg-white rounded-xl border p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-[#1C155F]">
          Broiler Report
        </h2>

        <p className="text-sm text-gray-500">
          Rapid growth and feed efficiency. High mortality or low feed intake
          here triggers immediate "Red" alerts.
        </p>
      </div>

      {/* SEARCH */}
      <SearchAndExport onSearch={onSearch} />

      {/* TABLE */}
      <BroilerTable search={search} data={data} />
    </section>
  );
}