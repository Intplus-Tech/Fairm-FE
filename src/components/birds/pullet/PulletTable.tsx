"use client";

import { useState, useMemo } from "react";
import PelletRow from "./PulletRow";
import PelletSearchExport from "./PulletSearchExport";
import Pagination from "../broiler/Pagination";
import { PulletRowData } from "@/types/pullet";

const data: PulletRowData[] = [
  {
    id: 1,
    date: "Jan 12, 2026",
    pens: 3,
    stock: "12,981",
    mortality: 81,
    feed: 230,
    weight: 3.45,
    alert: "Critical",
  },
  {
    id: 2,
    date: "Jan 12, 2026",
    pens: 5,
    stock: "12,981",
    mortality: 81,
    feed: 230,
    weight: 3.45,
    alert: "Warning",
  },
  {
    id: 3,
    date: "Jan 12, 2026",
    pens: 4,
    stock: "12,981",
    mortality: 81,
    feed: 230,
    weight: 3.45,
    alert: "Critical",
  },
];

export default function PulletTable() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <PelletSearchExport
        onSearch={setSearch}
        data={filteredData}
      />

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[1100px] w-full text-sm table-fixed ">
          <thead className="bg-gray-50 px-2 py-6">
            <tr className="p-6">
              <th className="py-6"></th>
              <th>Date</th>
              <th>No of Pens</th>
              <th>Opening Stock</th>
              <th>Mortality</th>
              <th>Feed Consumed (kg)</th>
              <th>Avg Weight (Kg)</th>
              <th>Alerts</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row) => (
              <PelletRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={5} onChange={setPage} />
    </div>
  );
}
