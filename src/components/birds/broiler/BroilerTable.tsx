"use client";

import { useState } from "react";
import BroilerRow from "./BroilerRow";
import Pagination from "./Pagination";
import { broilerData } from "../data/mockData";


export default function BroilerTable() {
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-50 text-[#1C155F]">
            <tr>
              <th className="w-10"></th>
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
            {broilerData.map((row) => (
              <BroilerRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={5} onChange={setPage} />
    </div>
  );
}
