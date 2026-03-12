"use client";

import { useState } from "react";

type Row = {
  pen: string;
  feed: string;
  opening: number | string;
  fed: number | string;
  closing: number | string;
};

export default function FeedConsumptionTable() {
  const [rows, setRows] = useState<Row[]>([
    { pen: "2", feed: "LM", opening: 45, fed: 6, closing: 24 },
    { pen: "3", feed: "LM", opening: 32.5, fed: 13, closing: 19.5 },
    { pen: "2B", feed: "", opening: "", fed: "", closing: "" },
    { pen: "4", feed: "", opening: "", fed: "", closing: "" },
  ]);

  const handleChange = (index: number, key: keyof Row, value: any) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [key]: value };
    setRows(updated);
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="font-semibold mb-4">Feed Consumption By Pen</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-600">
          <tr>
            <th>Pen</th>
            <th>Feed Type</th>
            <th>Opening (Bags)</th>
            <th>Fed Today</th>
            <th>Closing</th>
            <th>Consumed</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t text-center">
              <td>{row.pen}</td>

              <td>
                <select
                  className="border rounded px-2 py-1"
                  value={row.feed}
                  onChange={(e) => handleChange(i, "feed", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="LM">LM</option>
                  <option value="Starter">Starter</option>
                </select>
              </td>

              <td>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-20"
                  value={row.opening}
                  onChange={(e) => handleChange(i, "opening", e.target.value)}
                />
              </td>

              <td>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-20"
                  value={row.fed}
                  onChange={(e) => handleChange(i, "fed", e.target.value)}
                />
              </td>

              <td>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-20"
                  value={row.closing}
                  onChange={(e) => handleChange(i, "closing", e.target.value)}
                />
              </td>

              <td>
                {(Number(row.opening) + Number(row.fed) - Number(row.closing)) ||
                  0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}