"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";

interface Props {
  onSearch: (value: string) => void;
}

export default function SearchAndExport({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  const handleChange = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="relative w-full md:w-[380px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search by pens, Stock or Inventory"
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#4A3AFF]"
        />
      </div>

      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-[#1C155F] hover:bg-gray-50">
        <Download size={16} />
        Export CSV
      </button>
    </div>
  );
}
