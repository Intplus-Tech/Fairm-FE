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
        <td className="w-10">
          <button
            onClick={() => setOpen(!open)}
            className={`p-1 rounded ${open ? "bg-[#4A3AFF] text-white" : "bg-gray-100"
              }`}
          >
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>

        <td>{row.date}</td>
        <td>{row.pens}</td>
        <td>{row.stock}</td>
        <td>{row.mortality}</td>
        <td>{row.culls}</td>
        <td>{row.feed}</td>
        <td>{row.water}</td>
        <td>{row.weight}</td>
        <td>
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
