"use client";

import { useState } from "react";

interface LayersSearchExportProps {
  onSearch: (query: string) => void;
  onExport: () => void;
}

export default function LayersSearchExport({ onSearch, onExport }: LayersSearchExportProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div className="relative max-w-md w-full">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by pens, date or status"
          className="w-full rounded-lg border px-10 py-2 text-sm focus:outline-none"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
      </div>

      <button
        onClick={onExport}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
      >
        ⬇ Export CSV
      </button>
    </div>
  );
}
