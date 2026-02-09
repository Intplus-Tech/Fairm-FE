"use client";


import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import PelletDetailsTable from "./PulletDetailsTable";
import { PulletRowData } from "@/types/pullet";


export default function PulletRow({ row }: { row: PulletRowData }) {
  const [open, setOpen] = useState(false);


  return (
<>
      <tr className={open ? "bg-gray-50 px-6" : ""}>
        <td className="w-10 p-4 px-6 py-4">
          <button
            onClick={() => setOpen(!open)}
            className={`p-1 rounded ${open ? "bg-[#4A3AFF] text-white" : "bg-gray-100"}`}
          >
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>
        <td className="px-6 py-4">{row.date}</td>
        <td className="px-6 py-4">{row.pens}</td>
        <td className="px-6 py-4">{row.stock}</td>
        <td className="px-6 py-4">{row.mortality}</td>
        <td className="px-6 py-4">{row.feed}</td>
        <td className="px-6 py-4">{row.weight}</td>
        <td className="px-6 py-4">
          <span className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${row.alert === "Critical" ? "bg-red-500" : "bg-yellow-400"}`}
            />
            {row.alert}
          </span>
        </td>
      </tr>


      {open && (
        <tr>
          <td colSpan={8} className="p-4 px-6 py-4">
            <PelletDetailsTable />
          </td>
        </tr>
      )}
    </>
  );
}