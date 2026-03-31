"use client";

import { useState, useMemo, useEffect } from "react";
import BroilerRow from "./BroilerRow";
import Pagination from "./Pagination";
import { BroilerRowData } from "@/types/broiler";
import { Pen } from "../../../../services/broiler.service";
// import { Pen } from "@/services/broiler.service";

interface Props {
  search: string;
  data: BroilerRowData[];
  pens: Pen[];
}

export default function BroilerTable({ search, data, pens }: Props) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setPage(1);
  }, [search, data]);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      `${row.id} ${row.date}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const totalPages = Math.max(Math.ceil(filteredData.length / rowsPerPage), 1);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[1100px] w-full text-sm table-fixed border-collapse">
          <thead className="bg-gray-50 text-[#1C155F]">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">No of Pens</th>
              <th className="px-6 py-3 text-left">Opening Stock</th>
              <th className="px-6 py-3 text-left">Mortality</th>
              <th className="px-6 py-3 text-left">Culls / Sales</th>
              <th className="px-6 py-3 text-left">Feed Consumed (kg)</th>
              <th className="px-6 py-3 text-left">Water Consumed (L)</th>
              <th className="px-6 py-3 text-left">Average Weight (Kg)</th>
              <th className="px-6 py-3 text-left">Alerts</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row) => (
              <BroilerRow key={row.id} row={row} pens={pens} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}