// components/EggCollectionTable.tsx
"use client";

import { useState } from "react";

interface EggData {
  pen: string;
  times: {
    time: string;
    good: number | "";
    defects: number | "";
  }[];
}

interface EggCollectionTableProps {
  initialData?: EggData[];
}

export default function EggCollectionTable({ initialData }: EggCollectionTableProps) {
  const [data, setData] = useState<EggData[]>(initialData || [
    { pen: "2", times: [{time: "06:00 AM", good: 1000, defects: 80},{time:"09:00 AM", good:800, defects:80},{time:"02:00 PM", good:900, defects:20}]},
    { pen: "3", times: [{time: "06:00 AM", good:"", defects:""},{time:"09:00 AM", good:"", defects:""},{time:"02:00 PM", good:"", defects:""}]},
    { pen: "2B", times: [{time: "06:00 AM", good:"", defects:""},{time:"09:00 AM", good:"", defects:""},{time:"02:00 PM", good:"", defects:""}]},
    { pen: "4", times: [{time: "06:00 AM", good:"", defects:""},{time:"09:00 AM", good:"", defects:""},{time:"02:00 PM", good:"", defects:""}]},
  ]);

  const handleChange = (penIndex: number, timeIndex: number, field: "good" | "defects", value: string) => {
    const updated = [...data];
    updated[penIndex].times[timeIndex][field] = value === "" ? "" : Number(value);
    setData(updated);
  };

  return (
    <div className="overflow-x-auto border rounded-md p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Pen</th>
            {data[0].times.map((t, i) => (
              <th key={i} className="border-b p-2 text-center">
                {t.time} <br />
                <span className="text-xs font-normal">(Good / Defects)</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((penData, penIdx) => (
            <tr key={penData.pen}>
              <td className="border-b p-2">{penData.pen}</td>
              {penData.times.map((time, timeIdx) => (
                <td key={time.time} className="border-b p-2 text-center">
                  <input
                    type="number"
                    placeholder="0"
                    className="border rounded px-2 py-1 w-16 mr-1"
                    value={time.good}
                    onChange={(e) => handleChange(penIdx, timeIdx, "good", e.target.value)}
                  />
                  /
                  <input
                    type="number"
                    placeholder="0"
                    className="border rounded px-2 py-1 w-16 ml-1"
                    value={time.defects}
                    onChange={(e) => handleChange(penIdx, timeIdx, "defects", e.target.value)}
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