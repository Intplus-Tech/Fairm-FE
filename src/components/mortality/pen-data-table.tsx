"use client";

import type { Dispatch, SetStateAction } from "react";
import type { CulledReason } from "@/types/mortality";

interface PenMortalityFormRow {
  penId: string;
  penLabel: string;
  openingStock: number;
  weight: number;
  mortality: number;
  sickWeakCount: number;
  treat: boolean;
  culledCount: number;
  culledReason: CulledReason;
  closingStock: number;
  temperatureMin: number;
  temperatureMax: number;
}

interface PenDataTableProps {
  rows: PenMortalityFormRow[];
  setRows: Dispatch<SetStateAction<PenMortalityFormRow[]>>;
}

export default function PenDataTable({ rows, setRows }: PenDataTableProps) {
  const updateRow = (
    index: number,
    field: keyof PenMortalityFormRow,
    value: string | number | boolean
  ) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;

        const updatedRow = {
          ...row,
          [field]: value,
        } as PenMortalityFormRow;

        // auto-calculate closing stock
        updatedRow.closingStock =
          Number(updatedRow.openingStock) -
          Number(updatedRow.mortality) -
          Number(updatedRow.culledCount);

        return updatedRow;
      })
    );
  };
  
  return (
    <div>
      <h2 className="font-semibold mb-4 text-lg">Pen Specific Data</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="p-2">Pen</th>
              <th className="p-2">Opening Stock</th>
              <th className="p-2">Av. Bird Weight</th>
              <th className="p-2">Mortality</th>
              <th className="p-2">Sick/Weak</th>
              <th className="p-2">Culled</th>
              <th className="p-2">Closing Stock</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{row.penLabel}</td>

                <td className="p-2">
                  <input
                    type="number"
                    value={row.openingStock}
                    onChange={(e) =>
                      updateRow(i, "openingStock", Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-24 bg-gray-100"
                  />
                </td>

                <td className="p-2">
                                    <input
                    type="number"
                    value={row.weight}
                    onChange={(e) =>
                      updateRow(i, "weight", Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-20"
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    value={row.mortality}
                    onChange={(e) =>
                      updateRow(i, "mortality", Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-20"
                  />
                </td>

                <td className="p-2">
                  <input className="border border-yellow-400 rounded px-2 py-1 w-20 mb-1" />

                  <div className="flex items-center gap-2 text-xs">
                    <input
                    type="checkbox"
                    checked={row.treat}
                    onChange={(e) => updateRow(i, "treat", e.target.checked)}
                  />
                    Treat
                  </div>
                </td>

                <td className="p-2">
                  <select className="border rounded px-2 py-1 text-sm">
                    <option>Reason</option>
                    <option>Injured</option>
                    <option>Non-Productive</option>
                    <option>Aggressive</option>
                    <option>Other</option>
                    <option>Deformed</option>
                  </select>
                </td>

                <td className="p-2">
                  <input
                    defaultValue={4356}
                    className="border rounded px-2 py-1 w-24 bg-gray-100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}