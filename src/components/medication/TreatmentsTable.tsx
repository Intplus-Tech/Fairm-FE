import type { MedicationTreatmentStatus } from "@/types/medication";

export type TreatmentRow = {
  penId: string;
  penLabel: string;
  medication: string;
  purpose: string;
  dosage: number | "";
  method: string;
  status: MedicationTreatmentStatus;
};

type Props = {
  rows: TreatmentRow[];
  setRows: React.Dispatch<React.SetStateAction<TreatmentRow[]>>;
};

export default function TreatmentsTable({ rows, setRows }: Props) {
    const handleChange = (
    index: number,
    key: keyof TreatmentRow,
    value: string
  ) => {
    const updated = [...rows];

    updated[index] = {
      ...updated[index],
      [key]:
        key === "dosage"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    } as TreatmentRow;

    setRows(updated);
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h2 className="font-semibold text-lg mb-4">
        Treatments Administered
      </h2>

      <table className="w-full text-sm">

        <thead className="text-gray-500">
          <tr>
            <th className="text-left">Pen</th>
            <th>Medication</th>
            <th>Purpose</th>
            <th>Dosage</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {rows.map((row, index) => (
            <tr key={row.penId} className="h-14">
              <td>{row.penLabel}</td>

              <td>
                <input
                  className="border rounded p-1 w-full"
                  placeholder="Medication"
                  value={row.medication}
                  onChange={(e) =>
                    handleChange(index, "medication", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  className="border rounded p-1 w-full"
                  placeholder="Purpose"
                  value={row.purpose}
                  onChange={(e) =>
                    handleChange(index, "purpose", e.target.value)
                  }
                />
              </td>

              <td className="flex items-center gap-2">
                <input
                  value={row.dosage}
                  onChange={(e) => handleChange(index, "dosage", e.target.value)}
                  className="border rounded p-1 w-14"
                  type="number"
                />

                <span className="text-xs text-gray-500">
                  bag in 2000L
                </span>
              </td>

              <td>
                <select
                  className="border rounded p-1"
                  value={row.method}
                  onChange={(e) => handleChange(index, "method", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="water">Water</option>
                  <option value="spray">Spray</option>
                  <option value="injection">Injection</option>
                  <option value="oral">Oral</option>
                </select>
              </td>

              <td>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`status-${row.penId}`}
                      checked={row.status === "pending"}
                      onChange={() => handleChange(index, "status", "pending")}
                    />
                    Pending
                  </label>

                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`status-${row.penId}`}
                      checked={row.status === "done"}
                      onChange={() => handleChange(index, "status", "done")}
                    />
                    Done
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}