"use client";

import { useEffect, useState } from "react";
import PenRow from "./PenRow";
import PhotosEvidence from "./PhotosEvidence";
import { getStoredUser } from "@/lib/auth/getUser";
import type { PenData } from "@/types/mortality-form";
import { uploadFileService } from "../../../services/uploadFile.service";

const demoPens: PenData[] = [
  { pen: "2", openingStock: 4356 },
  { pen: "3", openingStock: 3234 },
  { pen: "2B", openingStock: 0 },
  { pen: "4", openingStock: 0 },
];

export default function FlockHealthEntry() {
  const [time, setTime] = useState("");
  const [checkedBy, setCheckedBy] = useState("");
  const [pensData, setPensData] = useState<PenData[]>(demoPens);
  const [photoIds, setPhotoIds] = useState<string[]>([]);

  useEffect(() => {
    const user = getStoredUser();
    if (user?.fullName) setCheckedBy(user.fullName);

    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    setTime(`${hh}:${mm}`);
  }, []);

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      const uploaded = await uploadFileService.create(files);
      const ids = Array.isArray(uploaded)
        ? uploaded.map((f) => f._id)
        : [uploaded._id];
      setPhotoIds((prev) => [...prev, ...ids]);
      console.log("Uploaded photo IDs:", ids);
    } catch (err: any) {
      console.error("Photo upload failed:", err.response?.data || err);
      alert("Failed to upload photos");
    }
  };

  const handleSave = () => {
    // Here you can prepare backend payload using pensData and photoIds
    console.log("Saving data...", pensData, { time, checkedBy, photoIds });
    alert(
      `Flock Health Data saved!\nChecked By: ${checkedBy}\nTime: ${time}\nPhotos: ${photoIds.length}`
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="rounded-lg bg-[#4A3AFF] p-6 text-white">
        <h2 className="text-lg font-semibold">Daily Mortality & Health Entry</h2>
        <p className="text-sm">Track flock health and mortality records</p>

        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <span>
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>

          <div>
            Time{" "}
            <input
              type="time"
              className="rounded border px-2 py-1 text-black"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            Checked By{" "}
            <input
              type="text"
              className="rounded border px-2 py-1 text-black"
              value={checkedBy}
              readOnly
            />
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
                <PenRow
                  key={idx}
                  index={idx}
                  penRow={penRow}
                  setPensData={setPensData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PhotosEvidence onUpload={handlePhotoUpload} />

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