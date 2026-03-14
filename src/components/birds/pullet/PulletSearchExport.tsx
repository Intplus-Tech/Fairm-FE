"use client";

import { Search, Download } from "lucide-react";
import { useState } from "react";
import { PulletRowData } from "@/types/pullet";

interface Props {
  onSearch: (value: string) => void;
  data: PulletRowData[];
}

export default function PulletSearchExport({ onSearch, data }: Props) {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  const exportCSV = () => {
    const headers = [
      "Date",
      "Pens",
      "Stock",
      "Mortality",
      "Feed Consumed",
      "Avg Weight",
      "Alert",
    ];

    const rows = data.map((row) => [
      row.date,
      row.pens,
      row.stock,
      row.mortality,
      row.feed,
      row.weight,
      row.alert,
    ]);

    const csv =
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "pullet-report.csv";

    a.click();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />

        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
          placeholder="Search by pens, stock or inventory"
        />
      </div>

      <button
        onClick={exportCSV}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
      >
        <Download size={16} /> Export CSV
      </button>
    </div>
  );
}
