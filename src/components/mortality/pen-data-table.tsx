"use client";

import type { Dispatch, SetStateAction } from "react";
import type { CulledReason } from "@/types/mortality";
import { PenMortalityFormRow } from "@/types/mortality-form";

interface PenDataTableProps {
  rows: PenMortalityFormRow[];
  setRows: Dispatch<SetStateAction<PenMortalityFormRow[]>>;
}

export default function PenDataTable({ rows, setRows }: PenDataTableProps) {
  const updateRow = <K extends keyof PenMortalityFormRow>(
  index: number,
  field: K,
  value: PenMortalityFormRow[K]
) => {
  setRows((prev) =>
    prev.map((row, i) => {
      if (i !== index) return row;

      const updatedRow = {
        ...row,
        [field]: value,
      };

      // ✅ auto calculate closing stock
      if (
        field === "openingStock" ||
        field === "mortality" ||
        field === "culledCount"
      ) {
        const opening =
          field === "openingStock" ? Number(value) : row.openingStock;
        const mortality =
          field === "mortality" ? Number(value) : row.mortality;
        const culled =
          field === "culledCount" ? Number(value) : row.culledCount;

        updatedRow.closingStock = opening - (mortality + culled);
      }

      return updatedRow;
    })
  );
};
  return (
    <div className=" ">
      <h2 className="font-semibold mb-4 text-[23px]">Pen Specific Data</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-gray-600 bg-gray-100">
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
                    inputMode="numeric"
                    value={row.openingStock || ""}
                    onChange={(e) =>
                      updateRow(i, "openingStock", Number(e.target.value || 0))
                    }
                    className="border rounded px-2 py-1 w-24 bg-gray-100 appearance-none"
                  />
                </td>

                <td className="p-2">
                  <input
                    inputMode="numeric"
                    value={row.weight || ""}
                    onChange={(e) =>
                      updateRow(i, "weight", Number(e.target.value || 0))
                    }
                    className="border rounded px-2 py-1 w-20 appearance-none"
                  />
                </td>

                <td className="p-2">
                  <input
                    inputMode="numeric"
                    value={row.mortality || ""}
                    onChange={(e) =>
                      updateRow(i, "mortality", Number(e.target.value || 0))
                    }
                    className="border rounded px-2 py-1 w-20 appearance-none"
                  />
                </td>

                <td className="p-2">
                  <input
                    inputMode="numeric"
                    value={row.sickWeakCount || ""}
                    onChange={(e) =>
                      updateRow(i, "sickWeakCount", Number(e.target.value || 0))
                    }
                    className="border border-yellow-400 rounded px-2 py-1 w-20 mb-1 appearance-none"
                  />

                  <div className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={row.treat}
                      onChange={(e) =>
                        updateRow(i, "treat", e.target.checked)
                      }
                    />
                    Treat
                  </div>
                </td>

                <td className="p-2">
                  <input
                    inputMode="numeric"
                    value={row.culledCount || ""}
                    onChange={(e) =>
                      updateRow(i, "culledCount", Number(e.target.value || 0))
                    }
                    className="border rounded px-2 py-1 w-20 appearance-none"
                  />

                  <div className="relative flex items-center gap-2 text-xs">
                    <select
                      value={row.culledReason}
                      onChange={(e) =>
                        updateRow(
                          i,
                          "culledReason",
                          e.target.value as CulledReason
                        )
                      }
                      className="border rounded px-2 py-1 text-sm appearance-none pr-5"
                    >
                      <option value="injured">Injured</option>
                      <option value="non_productive">Non-Productive</option>
                      <option value="aggressive">Aggressive</option>
                      <option value="other">Other</option>
                      <option value="deformed">Deformed</option>
                    </select>

                    <span className="pointer-events-none absolute right-2 text-[10px]">
                      ▼
                    </span>
                  </div>
                </td>

                <td className="p-2">
                  <input
                    value={row.closingStock || ""}
                    readOnly
                    className="border rounded px-2 py-1 w-24 bg-gray-100 appearance-none"
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