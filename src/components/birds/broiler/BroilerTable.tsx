"use client";

import { useState, useMemo } from "react";
import BroilerRow from "./BroilerRow";
import Pagination from "./Pagination";
import { broilerData } from "../data/mockData";

interface Props {
  search: string;
}

export default function BroilerTable({ search }: Props) {
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredData = useMemo(() => {
    return broilerData.filter((row) =>
      `${row.date} ${row.pens} ${row.stock} ${row.mortality} ${row.culls} ${row.feed} ${row.water} ${row.weight} ${row.alert}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[1100px] w-full text-sm table-fixed border-collapse">
          <colgroup>
            <col className="w-10" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>

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
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <BroilerRow key={row.id} row={row} />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-10 text-gray-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}