"use client";


import { Search, Download } from "lucide-react";


export default function PulletSearchExport() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
          placeholder="Search by pens, stock or inventory"
        />
      </div>


      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
        <Download size={16} /> Export CSV
      </button>
    </div>
  );
}