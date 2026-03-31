"use client";

import { useEffect, useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "../birds/broiler/Pagination";
import { ChevronDown, ChevronUp } from "lucide-react";
// import { inventoriesService } from "@/services/inventory.service";
import { InventoryResponse } from "@/types/inventory";
import { inventoriesService } from "../../../services/inventory.service";

export default function DailyStockOutReport() {
  const [open, setOpen] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<InventoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await inventoriesService.dailyStockOut();
        setData(res);
      } catch (error) {
        console.error("Stock out error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    const headers = [
      "Item Name",
      "Batch/Lot#",
      "Category",
      "Unit Price",
      "Total Price",
      "Destination",
      "Time Out",
    ];

    const rows = data.flatMap((item) =>
      [1, 2, 3, 4].map((i) => [
        item.name,
        item.batchNumber,
        item.category,
        "0",
        "0",
        "Farm",
        new Date(item.createdAt).toLocaleTimeString(),
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

  if (loading) {
    return <p>Loading stock out report...</p>;
  }

  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      {/* header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">
            Daily Stock Out Report
          </h2>

          <p className="text-sm text-gray-500">
            Track all outgoing inventory transactions
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleExport}
          className="gap-2"
        >
          Export CSV
        </Button>
      </div>

      {/* table */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">
                Item Dispatched
              </th>
              <th className="text-left px-4 py-3">
                Total Value (₦)
              </th>
              <th className="text-left px-4 py-3">
                Recipient Type
              </th>
              <th className="text-left px-4 py-3">
                Authorised By
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <Fragment key={row._id}>
                <tr
                  className={`border-t ${
                    open === row._id ? "bg-[#F7F8FF]" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        setOpen(
                          open === row._id
                            ? null
                            : row._id
                        )
                      }
                      className={`p-1 rounded ${
                        open === row._id
                          ? "bg-[#4A3AFF] text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {open === row._id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(
                      row.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    {row.name}
                  </td>

                  <td className="px-4 py-3">
                    ₦0
                  </td>

                  <td className="px-4 py-3">
                    Store
                  </td>

                  <td className="px-4 py-3">
                    Admin
                  </td>
                </tr>

                {/* expanded row */}
                {open === row._id && (
                  <tr className="bg-[#F7F8FF]">
                    <td colSpan={6} className="p-4">
                      <div className="bg-white rounded-xl border">
                        <div className="px-4 py-3 font-medium border-b">
                          Transaction Details
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                              <tr>
                                <th className="px-4 py-3 text-left">
                                  Item Name
                                </th>
                                <th className="px-4 py-3 text-left">
                                  Batch/Lot#
                                </th>
                                <th className="px-4 py-3 text-left">
                                  Category
                                </th>
                                <th className="px-4 py-3 text-left">
                                  Unit Price (₦)
                                </th>
                                <th className="px-4 py-3 text-left">
                                  Total Price(₦)
                                </th>
                                <th className="px-4 py-3 text-left">
                                  Destination
                                </th>
                                <th className="px-4 py-3 text-left">
                                  Time Out
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {[1, 2, 3, 4].map((pen) => (
                                <tr
                                  key={pen}
                                  className="border-t"
                                >
                                  <td className="px-4 py-3">
                                    {row.name}
                                  </td>
                                  <td className="px-4 py-3">
                                    {row.batchNumber}
                                  </td>
                                  <td className="px-4 py-3">
                                    {row.category}
                                  </td>
                                  <td className="px-4 py-3">
                                    0
                                  </td>
                                  <td className="px-4 py-3">
                                    0
                                  </td>
                                  <td className="px-4 py-3">
                                    Store
                                  </td>
                                  <td className="px-4 py-3">
                                    {new Date(
                                      row.createdAt
                                    ).toLocaleTimeString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-center">
        <Pagination
          page={page}
          totalPages={5}
          onChange={setPage}
        />
      </div>
    </div>
  );
}