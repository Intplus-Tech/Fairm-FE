"use client";

import { useState } from "react";

interface PenRowProps {
  penRow: { pen: string; openingStock: number };
}

export default function PenRow({ penRow }: PenRowProps) {
  const [avgWeight, setAvgWeight] = useState("");
  const [mortality, setMortality] = useState("");
  const [sickWeak, setSickWeak] = useState("");
  const [treat, setTreat] = useState(false);
  const [culled, setCulled] = useState("");
  const [reason, setReason] = useState("");

  const closingStock =
    penRow.openingStock -
    (Number(mortality || 0) + Number(culled || 0));

  return (
    <tr className="text-sm">
      <td className="border px-2 py-1">{penRow.pen}</td>
      <td className="border px-2 py-1">
        <input
          type="number"
          value={penRow.openingStock}
          readOnly
          className="w-full rounded border px-1 py-0.5 text-center bg-gray-100"
        />
      </td>
      <td className="border px-2 py-1">
        <input
          type="number"
          value={avgWeight}
          onChange={(e) => setAvgWeight(e.target.value)}
          className="w-full rounded border px-1 py-0.5 text-center"
        />
      </td>
      <td className="border px-2 py-1">
        <input
          type="number"
          value={mortality}
          onChange={(e) => setMortality(e.target.value)}
          className="w-full rounded border px-1 py-0.5 text-center"
        />
      </td>
      <td className="border px-2 py-1 flex items-center gap-1">
        <input
          type="number"
          value={sickWeak}
          onChange={(e) => setSickWeak(e.target.value)}
          className="w-16 rounded border px-1 py-0.5 text-center"
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={treat}
            onChange={() => setTreat(!treat)}
          />
          Treat
        </label>
      </td>
      <td className="border px-2 py-1 flex flex-col">
        <input
          type="number"
          value={culled}
          onChange={(e) => setCulled(e.target.value)}
          className="w-full rounded border px-1 py-0.5 text-center"
        />
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full rounded border px-1 py-0.5 mt-1 text-xs"
        >
          <option value="">Reason</option>
          <option value="Injured">Injured</option>
          <option value="Non-Productive">Non-Productive</option>
          <option value="Aggressive">Aggressive</option>
          <option value="Other">Other</option>
          <option value="Deformed">Deformed</option>
        </select>
      </td>
      <td className="border px-2 py-1">
        <input
          type="number"
          value={closingStock}
          readOnly
          className="w-full rounded border px-1 py-0.5 text-center bg-gray-100"
        />
      </td>
    </tr>
  );
}