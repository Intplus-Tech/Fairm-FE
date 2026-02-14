"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "../birds/broiler/Pagination";


export default function DailyStockOutReport() {
  const [open, setOpen] = useState<number | null>(1);
  const [page, setPage] = useState(1);


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

       <div className="flex justify-between items-center">
              <div className="flex justify-between items-center bg-[#F1F1F1] p-2 gap-4">
                <button className="text-sm text-[#000000] hover:bg-white p-2">All</button>
                <button className="text-sm text-[#000000] hover:bg-white p-2">Feed</button>
                <button className="text-sm text-[#000000] hover:bg-white p-2">Vaccine</button>
                <button className="text-sm text-[#000000] hover:bg-white p-2">Product</button>
      
              </div>
              <Button variant="outline">Export CSV</Button>
            </div>


      {[1, 2, 3].map((id) => (
        <div key={id} className="border rounded-xl">
          <button
            onClick={() => setOpen(open === id ? null : id)}
            className="w-full flex justify-between px-4 py-3"
          >
            <span>Disinfectant (5L)</span>
            {/* <span>₦400,000</span> */}
          </button>


          {open === id && (
            <div className="max-h-48 overflow-y-auto scrollbar-hide p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left">Item Name</th>
                    <th>Batch</th>
                    <th>Category</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Destination</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((p) => (
                    <tr key={p} className="border-t">
                      <td className="py-2">Pen {p}</td>
                      <td>3</td>
                      <td>12,981</td>
                      <td>81</td>
                      <td>42</td>
                      <td>230</td>
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