"use client";

import { MoreVertical } from "lucide-react";

const rows = [
  { metric: "Mortality", warning: "1.5%", critical: "2%" },
  { metric: "Feed Intake (Low)", warning: "10%", critical: "20%" },
  { metric: "Feed Intake (High)", warning: "15%", critical: "25%" },
  { metric: "Egg Production", warning: "5%", critical: "10%" },
  { metric: "Water Intake", warning: "10%", critical: "15%" },
  { metric: "Uniformity (Pullets)", warning: "70%", critical: "60%" },
];

export default function ThresholdTable() {
  return (
    <div className="overflow-hidden"> <table className="w-full border-collapse">
      <thead className="bg-muted text-sm">
        <tr>
          <th className="p-4 text-left">Metric Category</th>
          <th className="p-4 text-left">Trigger Warning (Yellow)</th>
          <th className="p-4 text-left">Critical Warning (Red)</th>
          <th className="p-4 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {rows.map(row => (
          <tr key={row.metric} className="border-b last:border-0">
            <td className="p-4">{row.metric}</td>
            <td className="p-4">{row.warning}</td>
            <td className="p-4">{row.critical}</td>
            <td className="p-4">
              <button className="p-2 rounded hover:bg-muted">
                <MoreVertical size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}