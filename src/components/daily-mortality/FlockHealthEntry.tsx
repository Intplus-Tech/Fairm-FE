"use client";

import { useState } from "react";
import PenRow from "./PenRow";
import SickBirdObservations from "./SickBirdObservations";
import PhotosEvidence from "./PhotosEvidence";

const demoPens = [
  { pen: "2", openingStock: 4356 },
  { pen: "3", openingStock: 3234 },
  { pen: "2B", openingStock: 0 },
  { pen: "4", openingStock: 0 },
];

export default function FlockHealthEntry() {
  const [time, setTime] = useState("8:00");
  const [checkedBy, setCheckedBy] = useState("Ajewole Iyanuoluwa");
  const [pensData, setPensData] = useState(demoPens);

  const handleSave = () => {
    console.log("Demo save:", pensData);
    alert("Flock Health Data saved (demo)!");
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="rounded-lg bg-[#4A3AFF] p-6 text-white">
        <h2 className="text-lg font-semibold">Daily Mortality & Health Entry</h2>
        <p className="text-sm">Track flock health and mortality records</p>

        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <span>Saturday, January 31, 2026</span>
          <div>
            Time{" "}
            <select
              className="rounded border px-2 py-1 text-black"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option>8:00</option>
              <option>12:00</option>
              <option>16:00</option>
            </select>
          </div>
          <div>
            Checked By{" "}
            <select
              className="rounded border px-2 py-1 text-black"
              value={checkedBy}
              onChange={(e) => setCheckedBy(e.target.value)}
            >
              <option>Ajewole Iyanuoluwa</option>
              <option>John Doe</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pens Table */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-4">Pen Specific Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">Pen</th>
                <th className="border px-2 py-1 text-left">Opening Stock</th>
                <th className="border px-2 py-1 text-left">Av. Bird Weight</th>
                <th className="border px-2 py-1 text-left">Mortality</th>
                <th className="border px-2 py-1 text-left">Sick/Weak</th>
                <th className="border px-2 py-1 text-left">Culled</th>
                <th className="border px-2 py-1 text-left">Closing Stock</th>
              </tr>
            </thead>
            <tbody>
              {pensData.map((penRow, idx) => (
                <PenRow key={idx} penRow={penRow} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      <SickBirdObservations/>

      
      <PhotosEvidence/>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          className="rounded-md border px-4 py-2 text-sm"
          onClick={handleSave}
        >
          Save Flock Health Data
        </button>
        <button className="rounded-md bg-[#4A3AFF] px-4 py-2 text-sm text-white hover:bg-blue-700">
          Next: Feed Consumption →
        </button>
      </div>
    </div>
  );
}