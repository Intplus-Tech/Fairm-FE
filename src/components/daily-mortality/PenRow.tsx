"use client";

import { useState, Dispatch, SetStateAction } from "react";
import type { PenData } from "@/types/mortality-form";

interface PenRowProps {
  penRow: { pen: string; openingStock: number };
  index: number;
  setPensData: Dispatch<SetStateAction<PenData[]>>;
}

export default function PenRow({
  penRow,
  index,
  setPensData,
}: PenRowProps) {
  const [avgWeight, setAvgWeight] = useState("");
  const [mortality, setMortality] = useState("");
  const [sickWeak, setSickWeak] = useState("");
  const [treat, setTreat] = useState(false);
  const [culled, setCulled] = useState("");
  const [reason, setReason] = useState("");

  const closingStock =
    penRow.openingStock - (Number(mortality || 0) + Number(culled || 0));

  const handleNumberInput = (value: string, setter: (v: string) => void) => {
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <tr className="text-sm">
      <td className="border px-2 py-1">{penRow.pen}</td>

      <td className="border px-2 py-1">
        <input
          value={penRow.openingStock || ""}
          className="w-full rounded border px-1 py-0.5 text-center bg-gray-100 appearance-none"
        />
      </td>

      <td className="border px-2 py-1">
        <input
          value={avgWeight}
          onChange={(e) => handleNumberInput(e.target.value, setAvgWeight)}
          inputMode="numeric"
          className="w-full rounded border px-1 py-0.5 text-center appearance-none"
        />
      </td>

      <td className="border px-2 py-1">
        <input
          value={mortality}
          onChange={(e) => handleNumberInput(e.target.value, setMortality)}
          inputMode="numeric"
          className="w-full rounded border px-1 py-0.5 text-center appearance-none"
        />
      </td>

      <td className="border px-2 py-1 flex items-center gap-1">
        <input
          value={sickWeak}
          onChange={(e) => handleNumberInput(e.target.value, setSickWeak)}
          inputMode="numeric"
          className="w-16 rounded border px-1 py-0.5 text-center appearance-none"
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
          value={culled}
          onChange={(e) => handleNumberInput(e.target.value, setCulled)}
          inputMode="numeric"
          className="w-full rounded border px-1 py-0.5 text-center appearance-none"
        />

        <div className="relative mt-1">
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded border px-1 py-0.5 text-xs appearance-none pr-5"
          >
            <option value="">Reason</option>
            <option value="Injured">Injured</option>
            <option value="Non-Productive">Non-Productive</option>
            <option value="Aggressive">Aggressive</option>
            <option value="Other">Other</option>
            <option value="Deformed">Deformed</option>
          </select>

          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px]">
            ▼
          </span>
        </div>
      </td>

      <td className="border px-2 py-1">
        <input
          value={closingStock || ""}
          readOnly
          className="w-full rounded border px-1 py-0.5 text-center bg-gray-100 appearance-none"
        />
      </td>
    </tr>
  );
}