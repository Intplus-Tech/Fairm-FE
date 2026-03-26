"use client";

import { Pen } from "../../../../services/broiler.service";
import BroilerTable from "./BroilerTable";
import SearchAndExport from "./SearchAndExport";
// import { Pen } from "@/services/broiler.service";

interface Props {
  search: string;
  onSearch: (value: string) => void;
  data: any[];
  pens: Pen[];
}

export default function BroilerReport({
  search,
  onSearch,
  data,
  pens,
}: Props) {
  return (
    <section className="bg-white rounded-xl border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#1C155F]">
          Broiler Report
        </h2>

        <p className="text-sm text-gray-500">
          Rapid growth and feed efficiency.
        </p>
      </div>

      <SearchAndExport onSearch={onSearch} />

      <BroilerTable
        search={search}
        data={data}
        pens={pens}
      />
    </section>
  );
}