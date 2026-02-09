"use client";

import { useState } from "react";
import LayersRow from "./LayersRow";
import LayersSearchExport from "./LayersSearchExport";
import Pagination from "../broiler/Pagination";
import { LayerRowData } from "@/types/layers";

const data: LayerRowData[] = [
  {
    id: 1,
    date: "Jan 12, 2026",
    pens: 3,
    birdsAlive: "12,981",
    mortality: 81,
    feed: 230,
    totalEggs: 6000,
    hdp: 75,
    status: "Optimal",
  },
  {
    id: 2,
    date: "Jan 12, 2026",
    pens: 3,
    birdsAlive: "12,981",
    mortality: 81,
    feed: 230,
    totalEggs: 80,
    hdp: 3,
    status: "Critical",
  },
];

export default function LayersTable() {
  const [page, setPage] = useState(1);

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <LayersSearchExport />

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[1200px] w-full text-sm table-fixed">
          <colgroup>
            <col className="w-[60px]" />
            <col className="w-[140px]" />
            <col className="w-[120px]" />
            <col className="w-[140px]" />
            <col className="w-[120px]" />
            <col className="w-[160px]" />
            <col className="w-[120px]" />
            <col className="w-[100px]" />
            <col className="w-[120px]" />
          </colgroup>

          <thead>
            <tr>
              <th />
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">No of Pens</th>
              <th className="px-4 py-3 text-left">Birds Alive</th>
              <th className="px-4 py-3 text-left">Mortality</th>
              <th className="px-4 py-3 text-left">Feed Consumed(kg)</th>
              <th className="px-4 py-3 text-left">Total Eggs</th>
              <th className="px-4 py-3 text-left">HDP(%)</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <LayersRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={5} onChange={setPage} />
    </div>
  );
}
