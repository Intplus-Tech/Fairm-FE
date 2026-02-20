"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import PenDetailsTable from "./PenDetailsTable";

/* ✅ Strongly typed row data */
interface BroilerRowData {
  id: number;
  date: string;
  pens: number;
  stock: string;
  mortality: number;
  culls: number;
  feed: number;
  water: number;
  weight: number;
  alert: "Critical" | "Warning";
}

/* ✅ Typed props */
interface BroilerRowProps {
  row: BroilerRowData;
}

export default function BroilerRow({ row }: BroilerRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className={`${open ? "bg-gray-50" : ""}`}>
        {/* Button column */}
        <td className="w-10 px-2 py-2 text-center">
          <button
            onClick={() => setOpen(!open)}
            className={`p-1 rounded ${open ? "bg-[#4A3AFF] text-white" : "bg-gray-100"
              }`}
          >
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>

        <td className="px-2 py-2">{row.date}</td>
        <td className="px-2 py-2">{row.pens}</td>
        <td className="px-2 py-2">{row.stock}</td>
        <td className="px-2 py-2">{row.mortality}</td>
        <td className="px-2 py-2">{row.culls}</td>
        <td className="px-2 py-2">{row.feed}</td>
        <td className="px-2 py-2">{row.water}</td>
        <td className="px-2 py-2">{row.weight}</td>
        <td className="px-2 py-2">
          <span className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${row.alert === "Critical"
                  ? "bg-red-500"
                  : "bg-yellow-400"
                }`}
            />
            {row.alert}
          </span>
        </td>
      </tr>

      {open && (
        <tr>
          <td colSpan={10} className="p-4">
            <PenDetailsTable />
          </td>
        </tr>
      )}
    </>
  );
}