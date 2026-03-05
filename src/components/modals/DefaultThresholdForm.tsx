"use client";

import { useState } from "react";
import { thresholdsService } from "@/../services/threshold.service";

const ageRanges = [
  "0-20 weeks",
  "21-40 weeks",
  "41-60 weeks",
  "61+ weeks",
];

export default function DefaultThresholdForm({
  farmId,
  onBack,
  onComplete,
}: {
  farmId: string; 
  onBack: () => void;
  onComplete: () => void;
}) {
    const [form, setForm] = useState({
    useIndustryBenchmarks: true,
    useSystemThreshold: false,
    mortalityRate: { warning: 0, critical: 0 },
    temperatureRange: { min: 0, max: 0 },
    feedConsumptionDeviation: {
      lowerLimit: { warning: 0, critical: 0 },
      upperLimit: { warning: 0, critical: 0 },
    },
    eggProductionPerBird: ageRanges.map((age) => ({
      ageRange: age,
      eggsPerWeek: 0,
    })),
    farmId
  });

  console.log("Form: ",form)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await thresholdsService.create(form);
      onComplete();
    } catch (err) {
      const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-h-[85vh] rounded-lg bg-transparent border-2 border-[#EFF0F6] p-6">
      {/* HEADER */}
      <h2 className="text-lg font-semibold mb-4">
        Set Default Alert Thresholds
      </h2>

      {/* SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1 space-y-6">
        {/* Toggles */}
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox"
            checked={form.useIndustryBenchmarks}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  useIndustryBenchmarks: e.target.checked,
                }))
              } />
            Use Industry benchmarks
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" 
            checked={form.useSystemThreshold}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  useSystemThreshold: e.target.checked,
                }))
              }
               />
            Use System Threshold
          </label>
        </div>

        {/* Mortality Rate */}
        <div>
          <h3 className="font-medium mb-2">Mortality Rate *</h3>
          <div className="grid grid-cols-2 gap-4">
            {(["warning", "critical"] as const).map((type) => (
              <input
                key={type}
                type="number"
                value={form.mortalityRate[type]}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    mortalityRate: {
                      ...prev.mortalityRate,
                      [type]: Number(e.target.value),
                    },
                  }))
                }
                className="border rounded-lg px-3 py-2 text-sm"
                placeholder={type}
              />
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div>
          <h3 className="font-medium mb-2">
            Temperature Range (°C) *
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {(["min", "max"] as const).map((key) => (
              <input
                key={key}
                type="number"
                value={form.temperatureRange[key]}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    temperatureRange: {
                      ...prev.temperatureRange,
                      [key]: Number(e.target.value),
                    },
                  }))
                }
                className="border rounded-lg px-3 py-2 text-sm"
                placeholder={key}
              />
            ))}
          </div>
        </div>

        {/* Feed Consumption */}
        <div>
          <h3 className="font-medium mb-2">
            Feed Consumption Deviation *
          </h3>
          {(["lowerLimit", "upperLimit"] as const).map((limitType) => (
            <div key={limitType} className="space-y-2">
              <p className="text-sm font-medium capitalize">{limitType}</p>
              <div className="grid grid-cols-2 gap-4">
                {(["warning", "critical"] as const).map((level) => (
                  <input
                    key={level}
                    type="number"
                    value={form.feedConsumptionDeviation[limitType][level]}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        feedConsumptionDeviation: {
                          ...prev.feedConsumptionDeviation,
                          [limitType]: {
                            ...prev.feedConsumptionDeviation[limitType],
                            [level]: Number(e.target.value),
                          },
                        },
                      }))
                    }
                    className="border rounded-lg px-3 py-2 text-sm"
                    placeholder={`${limitType} ${level}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Egg Production */}
        <div>
          <h3 className="font-medium mb-2">
            Egg Production (Birds) *
          </h3>

          <div className="space-y-2 text-sm">
            {form.eggProductionPerBird.map((item, index) => (
              <div
                key={item.ageRange}
                className="grid grid-cols-2 gap-4 items-center"
              >
                <span>{item.ageRange}</span>
                <input
                  type="number"
                  value={item.eggsPerWeek}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setForm((prev) => {
                      const updated = [...prev.eggProductionPerBird];
                      updated[index] = { ...updated[index], eggsPerWeek: value };
                      return { ...prev, eggProductionPerBird: updated };
                    });
                  }}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      {/* FOOTER */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          onClick={onBack}
          className="border px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="bg-[#4A3AFF] text-white px-5 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save & Activate"}
        </button>
      </div>
    </div>
  );
}
