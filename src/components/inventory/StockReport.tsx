"use client";

import { useState } from "react";
import Pagination from "../birds/broiler/Pagination";
import { Button } from "../ui/button";

const rows = Array.from({ length: 5 }).map(() => ({
  category: "12,981",
  name: "Disinfectant (5L)",
  opening: 100,
  stockIn: "+50",
  stockOut: "-25",
  closing: 125,
  value: "₦400,000",
}));


export default function StockReport() {
  const [page, setPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="">
          <h2 className="font-semibold">Stock Report</h2>
          <p className="text-sm text-muted-foreground">
            This table allows you to audit the movement of resources.
          </p>
         
        </div>
          </div>

      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center bg-[#F1F1F1] p-2 gap-4">
          <button className="text-sm text-[#000000] hover:bg-white p-2">All</button>
          <button className="text-sm text-[#000000] hover:bg-white p-2">Feed</button>
          <button className="text-sm text-[#000000] hover:bg-white p-2">Vaccine</button>
          <button className="text-sm text-[#000000] hover:bg-white p-2">Product</button>

        </div>
        <Button variant="outline">Export CSV</Button>
      </div>
       


      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left text-muted-foreground">
              <th className="py-3">Category</th>
              <th>Item Name</th>
              <th>Opening Stock</th>
              <th>Stock In</th>
              <th>Stock Out</th>
              <th>Closing Stock</th>
              <th>Value (₦)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-3">{row.category}</td>
                <td>{row.name}</td>
                <td>{row.opening}</td>
                <td>{row.stockIn}</td>
                <td>{row.stockOut}</td>
                <td>{row.closing}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} totalPages={5} onChange={setPage} />
      </div>
    </div>
  );
}