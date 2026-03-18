"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LayersRow from "./LayersRow";
import LayersSearchExport from "./LayersSearchExport";
import Pagination from "../broiler/Pagination";
import { LayerRowData } from "@/types/layers";
import { layersService } from "../../../../services/layers.service";

export default function LayersTable() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<LayerRowData[]>([]);
  const [filteredData, setFilteredData] = useState<LayerRowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Replace with actual token from your auth context
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (!token) {
      setErrorMessage("Authorization token missing. Please login.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const dashboard = await layersService.getDashboard(token);

        // Map API response to LayerRowData[]
        const mappedData: LayerRowData[] = dashboard.map((item: any, index: number) => ({
          id: index + 1,
          date: item.date || "",
          pens: item.pens || 0,
          birdsAlive: item.birdsAlive || "0",
          mortality: item.mortality || 0,
          feed: item.feedConsumed || 0,
          totalEggs: item.totalEggs || 0,
          hdp: item.hdp || 0,
          status: item.status || "Unknown",
        }));

        setData(mappedData);
        setFilteredData(mappedData);
        
        setErrorMessage("");
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching layers dashboard:",
            error.response?.data || error.message
          );
          setErrorMessage(
            error.response?.data?.message || "Error fetching layers dashboard"
          );
        } else {
          console.error("Unexpected error fetching layers dashboard:", error);
          setErrorMessage("Unexpected error fetching layers dashboard");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Search functionality
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredData(data);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = data.filter(
      (row) =>
        row.date.toLowerCase().includes(lowerQuery) ||
        row.status.toLowerCase().includes(lowerQuery) ||
        row.pens.toString().includes(lowerQuery) ||
        row.totalEggs.toString().includes(lowerQuery) ||
        row.birdsAlive.toString().includes(lowerQuery)
    );
    setFilteredData(filtered);
  };

  // CSV Export functionality
  const handleExport = () => {
    const headers = [
      "Date",
      "No of Pens",
      "Birds Alive",
      "Mortality",
      "Feed Consumed(kg)",
      "Total Eggs",
      "HDP(%)",
      "Status",
    ];

    const rows = filteredData.map((row) => [
      row.date,
      row.pens,
      row.birdsAlive,
      row.mortality,
      row.feed,
      row.totalEggs,
      row.hdp,
      row.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "layers_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!token) return <p className="text-red-600">{errorMessage}</p>;
  if (loading) return <p>Loading Layers Dashboard...</p>;
  if (errorMessage) return <p className="text-red-600">{errorMessage}</p>;

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <LayersSearchExport onSearch={handleSearch} onExport={handleExport} />

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[1200px] w-full text-sm table-fixed">
          <colgroup>
            <col className="w-[60px]" />
            <col className="w-[140px]" />
            <col className="w-[120px]" />
            <col className="w-[140px]" />
            <col className="w-[120px]" />
            <col className="w-[160px]" />
            <col className="w-[120px]" />
            <col className="w-[100px]" />
            <col className="w-[120px]" />
          </colgroup>

          <thead>
            <tr>
              <th />
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">No of Pens</th>
              <th className="px-4 py-3 text-left">Birds Alive</th>
              <th className="px-4 py-3 text-left">Mortality</th>
              <th className="px-4 py-3 text-left">Feed Consumed(kg)</th>
              <th className="px-4 py-3 text-left">Total Eggs</th>
              <th className="px-4 py-3 text-left">HDP(%)</th>
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

      <Pagination page={page} totalPages={5} onChange={setPage} />
    </div>
  );
}