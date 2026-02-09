"use client";

import { useState } from "react";
import LayersDetailsTable from "./LayersDetailsTable";
import { LayerRowData } from "@/types/layers";

export default function LayersRow({ row }: { row: LayerRowData }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className={`${open ? "bg-gray-50" : ""} border-t`}>
        <td className="px-4">
          <button
            onClick={() => setOpen(!open)}
            className={`w-6 h-6 rounded flex items-center justify-center ${open ? "bg-indigo-600 text-white" : "bg-gray-100"
              }`}
          >
            {open ? "⌃" : "⌄"}
          </button>
        </td>

        <td className="px-4 py-4">{row.date}</td>
        <td className="px-4 py-4">{row.pens}</td>
        <td className="px-4 py-4">{row.birdsAlive}</td>
        <td className="px-4 py-4">{row.mortality}</td>
        <td className="px-4 py-4">{row.feed}</td>
        <td className="px-4 py-4">{row.totalEggs}</td>
        <td className="px-4 py-4">{row.hdp}%</td>

        <td className="px-4 py-4">
          <span
            className={`px-2 py-1 rounded text-xs ${row.status === "Optimal"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
              }`}
          >
            {row.status}
          </span>
        </td>
      </tr>

      {open && (
        <tr>
          <td colSpan={9} className="px-4 pb-4">
            <LayersDetailsTable />
          </td>
        </tr>
      )}
    </>
  );
}
