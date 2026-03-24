"use client";

import type { TreatmentRow, MedicationTreatmentStatus } from "@/types/medication";

type TreatmentsTableProps = {
  rows: TreatmentRow[];
  setRows: React.Dispatch<React.SetStateAction<TreatmentRow[]>>;
};

const defaultPens = ["2", "3", "2B", "4"];

export default function TreatmentsTable({ rows, setRows }: TreatmentsTableProps) {
  // Fully type-safe handler
  const handleChange = <K extends keyof TreatmentRow>(
    index: number,
    field: K,
    value: TreatmentRow[K]
  ) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="font-semibold text-lg mb-6">Treatments Administered</h2>

      {/* Header */}
      <div className="grid grid-cols-6 gap-4 text-sm text-gray-600 font-medium mb-4">
        <div>Pen</div>
        <div>Medication</div>
        <div>Purpose</div>
        <div>Dosage</div>
        <div>Method</div>
        <div>Status</div>
      </div>

      {/* Rows */}
      <div className="space-y-4">
        {rows.map((row, index) => (
          <div key={row.penId} className="grid grid-cols-6 gap-4 items-center">
            {/* Pen */}
            <div className="text-gray-700">{row.penLabel}</div>

            {/* Medication */}
            <select
              value={row.medication}
              onChange={(e) => handleChange(index, "medication", e.target.value)}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="">Select</option>
              <option value="Antibiotic">Antibiotic</option>
              <option value="Vaccine">Vaccine</option>
            </select>

            {/* Purpose */}
            <select
              value={row.purpose}
              onChange={(e) => handleChange(index, "purpose", e.target.value)}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="">Select</option>
              <option value="Treatment">Treatment</option>
              <option value="Prevention">Prevention</option>
            </select>

            {/* Dosage */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={row.dosage === 0 ? "" : row.dosage}
                onChange={(e) =>
                  handleChange(index, "dosage", e.target.value === "" ? 0 : Number(e.target.value))
                }
                className="w-16 border rounded-lg p-2 text-sm no-spinner outline-none"
              />
              <span className="text-xs text-gray-500">bag in 2000L</span>
            </div>

            {/* Method */}
            <select
              value={row.method}
              onChange={(e) => handleChange(index, "method", e.target.value)}
              className="border rounded-lg p-2 text-sm"
            >
              <option value="">Select</option>
              <option value="Water">Water</option>
              <option value="Injection">Injection</option>
            </select>

            {/* Status */}
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`status-${index}`}
                  checked={row.status === "pending"}
                  onChange={() => handleChange(index, "status", "pending")}
                />
                Pending
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`status-${index}`}
                  checked={row.status === "done"}
                  onChange={() => handleChange(index, "status", "done")}
                />
                Done
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Remove spinner arrows */}
      <style jsx>{`
        input.no-spinner::-webkit-outer-spin-button,
        input.no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input.no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}