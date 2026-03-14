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

  /* 🔎 FILTER DATA */
  const filteredData = useMemo(() => {
    return broilerData.filter((row) =>
      `${row.date} ${row.pens} ${row.stock} ${row.mortality} ${row.culls} ${row.feed} ${row.water} ${row.weight} ${row.alert}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="space-y-4">
      {/* TABLE */}
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[1100px] w-full text-sm table-fixed">
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
              <th></th>
              <th>Date</th>
              <th>No of Pens</th>
              <th>Opening Stock</th>
              <th>Mortality</th>
              <th>Culls / Sales</th>
              <th>Feed Consumed(kg)</th>
              <th>Water Consumed(L)</th>
              <th>Average Weight(Kg)</th>
              <th>Alerts</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <BroilerRow key={row.id} row={row} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-10 text-gray-400"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}
