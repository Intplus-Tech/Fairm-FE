"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LayersRow from "./LayersRow";
import LayersSearchExport from "./LayersSearchExport";
import Pagination from "../broiler/Pagination";
import { layersService } from "../../../../services/layers.service";
import { LayersRowData } from "@/types/layers";

export default function LayersTable() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<LayersRowData[]>([]);
  const [filteredData, setFilteredData] = useState<LayersRowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dashboard = await layersService.getDashboard();

        // ✅ SAFETY CHECK (fixes .map error)
        const rows = dashboard?.rows || [];

        const mappedData: LayersRowData[] = rows.map(
          (item: any, index: number) => ({
            id: index + 1,
            date: item.date || "",
            pens: item.pens || 0,
            birdsAlive: String(item.birdsAlive || 0),
            mortality: item.mortality || 0,
            feed: item.feedConsumed || 0,
            totalEggs: item.totalEggs || 0,
            hdp: item.hdp || 0,
            status: item.status || "Optimal",
          })
        );

        setData(mappedData);
        setFilteredData(mappedData);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching layers dashboard:",
            error.response?.data || error.message
          );
          setErrorMessage(
            error.response?.data?.message ||
              "Error fetching layers dashboard"
          );
        } else {
          console.error("Unexpected error:", error);
          setErrorMessage("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ SEARCH
  const handleSearch = (query: string) => {
    if (!query) return setFilteredData(data);

    const q = query.toLowerCase();

    const filtered = data.filter(
      (row) =>
        row.date.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q) ||
        row.pens.toString().includes(q) ||
        row.totalEggs.toString().includes(q) ||
        row.birdsAlive.toLowerCase().includes(q)
    );

    setFilteredData(filtered);
  };

  // ✅ EXPORT
  const handleExport = () => {
    const headers = [
      "Date",
      "Pens",
      "Birds Alive",
      "Mortality",
      "Feed",
      "Eggs",
      "HDP",
      "Status",
    ];

    const rows = filteredData.map((r) => [
      r.date,
      r.pens,
      r.birdsAlive,
      r.mortality,
      r.feed,
      r.totalEggs,
      r.hdp,
      r.status,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "layers_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading Layers Dashboard...</p>;
  if (errorMessage) return <p className="text-red-600">{errorMessage}</p>;

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <LayersSearchExport onSearch={handleSearch} onExport={handleExport} />

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[1200px] w-full text-sm table-fixed">
          <thead>
            <tr>
              <th />
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">No of Pens</th>
              <th className="px-4 py-3 text-left">Birds Alive</th>
              <th className="px-4 py-3 text-left">Mortality</th>
              <th className="px-4 py-3 text-left">Feed</th>
              <th className="px-4 py-3 text-left">Total Eggs</th>
              <th className="px-4 py-3 text-left">HDP (%)</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row) => (
              <LayersRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={Math.ceil(filteredData.length / 10)}
        onChange={setPage}
      />
    </div>
  );
}