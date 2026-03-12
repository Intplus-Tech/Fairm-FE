"use client";

import { X, AlertTriangle } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function FairmAIPanel({ onClose }: Props) {
  return (
    <div
      className="
      fixed
      bottom-24
      right-6
      w-[420px]
      max-h-[80vh]
      bg-black
      text-white
      rounded-xl
      shadow-2xl
      overflow-y-auto
      z-[9998]
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start p-4 border-b border-gray-700">
        <div>
          <h2 className="text-lg font-semibold">
            Digital Farm Assistant
          </h2>
          <p className="text-sm text-gray-400">
            Real-time insights and alerts from your farm operations
          </p>
        </div>

        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="p-4 space-y-4">

        {/* SUMMARY */}
        <div className="bg-gray-200 text-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-1">
            Farm Insights Summary
          </h3>

          <p className="text-sm">
            Based on the last 7 days of data, your farm is performing
            well overall. However, your farm has 1 critical alert
            and 2 warnings that need immediate attention.
          </p>
        </div>

        {/* ALERT CARD */}
        <MortalityAlert />

        <MortalityAlert />

      </div>
    </div>
  );
}

/* ------------------------------------------------------- */

function MortalityAlert() {
  return (
    <div className="bg-gray-200 text-gray-800 p-4 rounded-lg">

      <div className="flex justify-between items-start">

        <div className="flex gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="text-red-600" size={18} />
          </div>

          <div>
            <h4 className="font-semibold">
              Mortality Breach In Pen 2
            </h4>

            <p className="text-sm text-gray-600">
              3.5% Spike
            </p>
          </div>
        </div>

        <span className="bg-red-200 text-red-700 text-xs px-2 py-1 rounded">
          Critical
        </span>
      </div>

      <div className="text-xs text-gray-500 mt-2">
        18/01/2026 | 09:43 AM
      </div>

      <hr className="my-3" />

      <div className="space-y-2 text-sm">

        <h5 className="font-semibold">
          Why is this happening?
        </h5>

        <p>→ Heater malfunction detected at 3:02 AM (temp dropped 15°C).</p>
        <p>→ Birds clustering in corner (heat-seeking behavior).</p>

        <h5 className="font-semibold mt-2">
          Recommended Actions (In Priority)
        </h5>

        <p>→ Inspect heater in Pen 2 immediately (est. 30 min)</p>
        <p>→ Thaw water lines using warm water method (est. 1 hour)</p>
        <p>→ Contact vet if mortality continues for 24+ hours</p>

      </div>

    </div>
  );
}