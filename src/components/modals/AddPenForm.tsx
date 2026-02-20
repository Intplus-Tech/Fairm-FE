"use client";

import { useState } from "react";

export default function AddPenForm({
  onNext,
}: {
  onNext: () => void;
}) {
  const [birdType, setBirdType] = useState<
    "Broiler" | "Layer" | "PDL"
  >("Broiler");

  return (
    <div className="flex flex-col max-h-[85vh] rounded-lg bg-transparent border-2 border-[#EFF0F6] p-6">
      {/* HEADER */}
      <h2 className="text-lg font-semibold mb-4">
        Add Your First House/Shed/Pen
      </h2>

      {/* SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
          {/* House Name */}
          <div>
            <label className="text-sm font-medium">
              House/Shed/Pen Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="House A"
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* Max Capacity */}
          <div>
            <label className="text-sm font-medium">
              Max Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="5000"
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* House Type */}
          <div>
            <label className="text-sm font-medium">
              House Type <span className="text-red-500">*</span>
            </label>
            <select className="w-full mt-1 rounded-lg border px-3 py-2 text-sm">
              <option>Deep Litter</option>
              <option>Cage System</option>
            </select>
          </div>

          {/* Feeder */}
          <div>
            <label className="text-sm font-medium">
              Feeder <span className="text-red-500">*</span>
            </label>
            <select className="w-full mt-1 rounded-lg border px-3 py-2 text-sm">
              <option>Auto feeders</option>
              <option>Manual feeders</option>
            </select>
          </div>

          {/* Sensors */}
          <div>
            <label className="text-sm font-medium">Sensors</label>
            <select className="w-full mt-1 rounded-lg border px-3 py-2 text-sm">
              <option>Temperature</option>
              <option>Humidity</option>
            </select>
          </div>

          {/* Bird Type */}
          <div>
            <label className="text-sm font-medium">
              Bird Type <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4 mt-2 text-sm">
              {["Broiler", "Layer", "PDL"].map((type) => (
                <label key={type} className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={birdType === type}
                    onChange={() =>
                      setBirdType(type as typeof birdType)
                    }
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Batch No */}
          <div>
            <label className="text-sm font-medium">
              Batch No <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Spring batch 2024"
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* Breed */}
          <div>
            <label className="text-sm font-medium">
              Breed <span className="text-red-500">*</span>
            </label>
            <select className="w-full mt-1 rounded-lg border px-3 py-2 text-sm">
              <option>Cobb 500</option>
              <option>Ross 308</option>
            </select>
          </div>

          {/* No of Birds */}
          <div>
            <label className="text-sm font-medium">
              No of Birds <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="3000"
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="20 Weeks"
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full mt-1 rounded-lg border px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* FOOTER (STATIC) */}
      <div className="flex justify-between items-center border-t pt-4">
        <button className="border rounded-lg px-4 py-2 text-sm">
          + Add another House/Pen/Shed
        </button>

        <button
          onClick={onNext}
          className="bg-[#4A3AFF] text-white px-6 py-2 rounded-lg"
        >
          Next: Configure Alerts →
        </button>
      </div>
    </div>
  );
}
