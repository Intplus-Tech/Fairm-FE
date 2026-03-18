"use client";

import { useState } from "react";
import PelletRow from "./PulletRow";
import PulletSearchExport from "./PulletSearchExport";
import Pagination from "../broiler/Pagination";
import { PulletRowData } from "../../../../services/pullet.service";


interface Props {
  data: PulletRowData[];
  onSearch: (value: string) => void;
}

export default function PulletTable({ data, onSearch }: Props) {
  const [page, setPage] = useState(1);

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <PulletSearchExport onSearch={onSearch} data={data} />

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[1100px] w-full text-sm table-fixed">
          <thead className="bg-gray-50">
            <tr>
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
            {data.map((row) => (
              <PelletRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={Math.ceil(data.length / 10)} onChange={setPage} />
    </div>
  );
}