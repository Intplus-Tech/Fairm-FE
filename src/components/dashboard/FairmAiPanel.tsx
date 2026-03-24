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
      inset-0
      flex
      items-center
      justify-center
      bg-black/30
      z-[9998]
      "
    >
      {/* PANEL */}
      <div
        className="
        w-[520px]
        max-h-[80vh]
        bg-white
        rounded-2xl
        shadow-xl
        flex
        flex-col
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-start px-5 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-[#23214D]">
              Digital Farm Assistant
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Real-time insights and alerts from your farm operations
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div
          className="
          p-5
          space-y-5
          overflow-y-auto
          scrollbar-hide
          "
        >
          {/* SUMMARY */}
          <div className="bg-[#F3F4F8] p-4 rounded-lg">
            <h3 className="font-semibold text-[#23214D] mb-2">
              Farm Insights Summary
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              Based on the last 7 days of data, your farm is performing
              well overall. However, your farm has 1 critical alert and
              2 warnings that need immediate attention.
            </p>
          </div>

          <MortalityAlert />
          <MortalityAlert />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- */

function MortalityAlert() {
  return (
    <div className="bg-[#F3F4F8] p-4 rounded-lg">
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle size={18} className="text-red-600" />
          </div>

          <div>
            <h4 className="font-semibold text-[#23214D]">
              Mortality Breach In Pen 2
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              3.5% Spike
            </p>
          </div>
        </div>

        <span className="bg-red-100 text-red-600 text-xs px-2.5 py-1 rounded-md font-medium">
          Critical
        </span>
      </div>

      {/* DATE */}
      <div className="text-sm text-gray-500 mt-3">
        18/01/2026 | 09:43 AM
      </div>

      <hr className="my-3 border-gray-200" />

      {/* CONTENT */}
      <div className="space-y-2 text-sm text-gray-600">
        <h5 className="font-semibold text-[#23214D]">
          Why is this happening?
        </h5>

        <p>→ Heater malfunction detected at 3:02 AM (temp dropped 15°C).</p>
        <p>→ Birds clustering in corner (heat-seeking behavior).</p>

        <h5 className="font-semibold text-[#23214D] pt-2">
          Recommended Actions (In Priority)
        </h5>

        <p>→ Inspect heater in Pen 2 immediately (est. 30 min)</p>
        <p>→ Thaw water lines using warm water method (est. 1 hour)</p>
        <p>→ Contact vet if mortality continues for 24+ hours</p>
      </div>
    </div>
  );
}
