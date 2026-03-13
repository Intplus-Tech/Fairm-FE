// components/EggCollectionTable.tsx
"use client";

export interface EggCollectionRow {
  penId: string;
  sixAm: {
    goodEggs: number;
    defectEggs: number;
  };
  nineAm: {
    goodEggs: number;
    defectEggs: number;
  };
  twoPm: {
    goodEggs: number;
    defectEggs: number;
  };
}

interface EggCollectionTableProps {
  data: EggCollectionRow[];
  onChange: (rows: EggCollectionRow[]) => void;
}

type TimeKey = "sixAm" | "nineAm" | "twoPm";
type FieldKey = "goodEggs" | "defectEggs";

export default function EggCollectionTable({
  data,
  onChange,
}: EggCollectionTableProps) {
  const handleChange = (
    rowIndex: number,
    timeKey: TimeKey,
    field: FieldKey,
    value: string
  ) => {
    const updated = [...data];
    updated[rowIndex] = {
      ...updated[rowIndex],
      [timeKey]: {
        ...updated[rowIndex][timeKey],
        [field]: value === "" ? 0 : Number(value),
      },
    };

    onChange(updated);
  };

  const timeColumns: { label: string; key: TimeKey }[] = [
    { label: "06:00 AM", key: "sixAm" },
    { label: "09:00 AM", key: "nineAm" },
    { label: "02:00 PM", key: "twoPm" },
  ];

  return (
    <div className="overflow-x-auto border rounded-md p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Pen</th>
            {timeColumns.map((col) => (
              <th key={col.key} className="border-b p-2 text-center">
                {col.label} <br />
                <span className="text-xs font-normal">(Good / Defects)</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={row.penId}>
              <td className="border-b p-2">{row.penId}</td>

              {timeColumns.map((col) => (
                <td key={col.key} className="border-b p-2 text-center">
                  <input
                    type="number"
                    min={0}
                    placeholder="0"
                    className="border rounded px-2 py-1 w-16 mr-1"
                    value={row[col.key].goodEggs}
                    onChange={(e) =>
                      handleChange(rowIdx, col.key, "goodEggs", e.target.value)
                    }
                  />
                  /
                  <input
                    type="number"
                    min={0}
                    placeholder="0"
                    className="border rounded px-2 py-1 w-16 ml-1"
                    value={row[col.key].defectEggs}
                    onChange={(e) =>
                      handleChange(rowIdx, col.key, "defectEggs", e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}