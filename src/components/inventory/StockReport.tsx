"use client";

import { useEffect, useState } from "react";
import Pagination from "../birds/broiler/Pagination";
import { Button } from "../ui/button";
import { InventoryResponse } from "@/types/inventory";
import { inventoriesService } from "../../../services/inventory.service";


export default function StockReport() {
  const [page, setPage] = useState(1);
    const [rows, setRows] = useState<InventoryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    // const [filter, setFilter] = useState<string>("All");

      useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);

        const data = await inventoriesService.list();

        setRows(data);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // const filters = ["All", "Feed", "Vaccine", "Product"];

  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      {loading && (
        <p className="text-sm text-muted-foreground">
          Loading inventory...
        </p>
      )}
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
            {rows.map((row) => (
              <tr key={row._id} className="border-b last:border-0">
                <td className="py-3">{row.category}</td>
                <td>{row.name}</td>
                <td>-</td>
                <td>-</td>
                <td>100</td>
                <td>123</td>
                <td>230000</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} totalPages={5} onChange={setPage} />
      </div>
    </div>
  );
}