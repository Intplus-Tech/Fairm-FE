"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "../birds/broiler/Pagination";

export default function DailyStockOutReport() {
  const [open, setOpen] = useState<number | null>(1);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All");

  const data = [
    { id: 1, name: "Disinfectant (5L)", category: "Product" },
    { id: 2, name: "Starter Feed", category: "Feed" },
    { id: 3, name: "Lasota Vaccine", category: "Vaccine" },
  ];

  const filteredData =
    filter === "All"
      ? data
      : data.filter((item) => item.category === filter);

  const handleExport = () => {
    const headers = [
      "Item Name",
      "Batch",
      "Category",
      "Unit Price",
      "Total",
      "Destination",
    ];

    const rows = filteredData.flatMap((item) =>
      [1, 2, 3].map(() => [
        item.name,
        "3",
        item.category,
        "81",
        "42",
        "230",
      ])
    );

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "daily-stock-out.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold">Daily Stock Out Report</h2>
          <p className="text-sm text-muted-foreground">
            Track all outgoing inventory transactions
          </p>
        </div>
      </div>

      {/* filter and export section */}
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center bg-[#F1F1F1] p-2 gap-4">
          <button
            onClick={() => setFilter("All")}
            className="text-sm text-[#000000] hover:bg-white p-2"
          >
            All
          </button>

          <button
            onClick={() => setFilter("Feed")}
            className="text-sm text-[#000000] hover:bg-white p-2"
          >
            Feed
          </button>

          <button
            onClick={() => setFilter("Vaccine")}
            className="text-sm text-[#000000] hover:bg-white p-2"
          >
            Vaccine
          </button>

          <button
            onClick={() => setFilter("Product")}
            className="text-sm text-[#000000] hover:bg-white p-2"
          >
            Product
          </button>
        </div>

        <Button variant="outline" onClick={handleExport}>
          Export CSV
        </Button>
      </div>

      {filteredData.map((item) => (
        <div key={item.id} className="border rounded-xl">
          <button
            onClick={() => setOpen(open === item.id ? null : item.id)}
            className="w-full flex justify-between px-4 py-3"
          >
            <span>{item.name}</span>
          </button>

          {open === item.id && (
            <div className="max-h-48 overflow-y-auto scrollbar-hide">
              <table className="w-full table-fixed text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b">
                    <th className="text-left px-6 py-3">Item Name</th>
                    <th className="text-left px-6 py-3">Batch</th>
                    <th className="text-left px-6 py-3">Category</th>
                    <th className="text-left px-6 py-3">Unit Price</th>
                    <th className="text-left px-6 py-3">Total</th>
                    <th className="text-left px-6 py-3">Destination</th>
                  </tr>
                </thead>

                <tbody>
                  {[1, 2, 3].map((p) => (
                    <tr key={p} className="border-b last:border-0">
                      <td className="px-6 py-3">{item.name}</td>
                      <td className="px-6 py-3">3</td>
                      <td className="px-6 py-3">{item.category}</td>
                      <td className="px-6 py-3">81</td>
                      <td className="px-6 py-3">42</td>
                      <td className="px-6 py-3">230</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      <Pagination page={page} totalPages={5} onChange={setPage} />
    </div>
  );
}