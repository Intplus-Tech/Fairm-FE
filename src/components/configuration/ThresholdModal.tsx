"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { thresholdsService } from "@/../services/threshold.service";

const ageRanges = [
  "16-20 weeks",
  "21-40 weeks",
  "41-60 weeks",
  "61+ weeks",
];

const FLOCK_OPTIONS = ["Layers", "Pullets", "Noilers", "Broilers"];

export default function ThresholdModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    flockCategory: "", // ✅ track selected category
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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    if (!form.flockCategory) {
      toast.error("Please select a flock category.");
      return;
    }

    try {
      setLoading(true);
      // ✅ Add auth headers if required inside your thresholdsService
      await thresholdsService.create(form);

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } flex gap-3 rounded-xl bg-white p-4 shadow-lg border border-green-500`}
          >
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div className="flex flex-col text-sm text-gray-900">
              <div>Thresholds saved</div>
              <div>Your alert thresholds have been updated successfully</div>
            </div>
          </div>
        ),
        { duration: 4000, position: "top-right" }
      );

      onClose();
    } catch (err: any) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewFlock = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.flockCategory) {
      toast.error("Please select a flock category.");
      return;
    }

    try {
      setLoading(true);
      await thresholdsService.create(form);

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } flex gap-3 rounded-xl bg-white p-4 shadow-lg border border-green-500`}
          >
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div className="flex flex-col text-sm text-gray-900">
              <div>Thresholds saved</div>
              <div>You can now create a new flock</div>
            </div>
          </div>
        ),
        { duration: 4000, position: "top-right" }
      );

      // Reset form for new flock
      setForm({
        flockCategory: "",
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
      });
    } catch (err: any) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    field: string,
    value: number | string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 rounded-2xl">
        <div className="bg-white w-full max-w-[703px] max-h-[90vh] rounded-xl shadow-lg flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b sticky top-0 bg-white z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Configure Alert Threshold
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Set up warning and critical alert thresholds for your farm.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-lg leading-none text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 overflow-y-auto scrollbar-hide">
            <FlockCategoryDropdown
              value={form.flockCategory}
              onSelect={(val) => handleChange("flockCategory", val)}
            />

            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.useIndustryBenchmarks}
                onChange={(e) =>
                  handleChange("useIndustryBenchmarks", e.target.checked)
                }
                className="h-4 w-4"
              />
              <span>Use industry benchmark</span>
            </div>

            {/* Mortality */}
            <Section title="Mortality Rate">
              <TwoInputs
                min={form.mortalityRate.warning}
                max={form.mortalityRate.critical}
                onChange={(min, max) =>
                  setForm((prev) => ({
                    ...prev,
                    mortalityRate: { warning: min, critical: max },
                  }))
                }
              />
            </Section>

            {/* Temperature */}
            <Section title="Temperature Range (°C)">
              <TwoInputs
                min={form.temperatureRange.min}
                max={form.temperatureRange.max}
                onChange={(min, max) =>
                  setForm((prev) => ({
                    ...prev,
                    temperatureRange: { min, max },
                  }))
                }
              />
            </Section>

            {/* Feed Consumption */}
            <Section title="Feed Consumption Deviation">
              <p className="text-sm text-muted-foreground">
                Lower Limit (Health / Water Check)
              </p>
              <TwoInputs
                min={form.feedConsumptionDeviation.lowerLimit.warning}
                max={form.feedConsumptionDeviation.lowerLimit.critical}
                onChange={(min, max) =>
                  setForm((prev) => ({
                    ...prev,
                    feedConsumptionDeviation: {
                      ...prev.feedConsumptionDeviation,
                      lowerLimit: { warning: min, critical: max },
                    },
                  }))
                }
              />

              <p className="text-sm text-muted-foreground mt-3">
                Upper Limit (Waste / Theft Check)
              </p>
              <TwoInputs
                min={form.feedConsumptionDeviation.upperLimit.warning}
                max={form.feedConsumptionDeviation.upperLimit.critical}
                onChange={(min, max) =>
                  setForm((prev) => ({
                    ...prev,
                    feedConsumptionDeviation: {
                      ...prev.feedConsumptionDeviation,
                      upperLimit: { warning: min, critical: max },
                    },
                  }))
                }
              />
            </Section>

            {/* Egg Production */}
            <Section title="Egg Production / Bird">
              {form.eggProductionPerBird.map((item, index) => (
                <div
                  key={item.ageRange}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center"
                >
                  <p className="text-sm">{item.ageRange}</p>
                  <Input
                    className="text-right placeholder:text-right placeholder:text-muted-foreground placeholder:italic"
                    type="number"
                    value={item.eggsPerWeek}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setForm((prev) => {
                        const updated = [...prev.eggProductionPerBird];
                        updated[index].eggsPerWeek = value;
                        return { ...prev, eggProductionPerBird: updated };
                      });
                    }}
                  />
                </div>
              ))}
            </Section>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t sticky bottom-0 bg-white flex flex-wrap justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button variant="outline" onClick={handleCreateNewFlock}>
              Save & Create New Flock
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#5B4DFF]"
            >
              {loading ? "Saving..." : "Save & Activate"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- Dropdown ---------------- */
function FlockCategoryDropdown({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      <Label>
        Flock Category <span className="text-red-500">*</span>
      </Label>

      <div className="relative">
        <div
          className="
            h-10 w-full rounded-md border px-3 pr-10 text-sm
            flex items-center cursor-default bg-white
            focus-within:ring-2 focus-within:ring-[#5B4DFF]
          "
        >
          <span
            className={`${value ? "text-foreground" : "text-muted-foreground italic"}`}
          >
            {value || "Select flock type"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <ChevronDown
            size={16}
            fill="currentColor"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute z-20 mt-1 w-full rounded-md border bg-white shadow-md animate-in fade-in slide-in-from-top-1">
            {FLOCK_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Helpers ---------------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium">
        {title} <span className="text-red-500">*</span>
      </h4>
      {children}
    </div>
  );
}

function TwoInputs({
  min,
  max,
  onChange,
}: {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1">
        <p className="text-sm">Min</p>
        <Input
          type="number"
          value={min}
          onChange={(e) => onChange(Number(e.target.value), max)}
          placeholder="0.04"
          className="text-right placeholder:text-right"
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm">Max</p>
        <Input
          type="number"
          value={max}
          onChange={(e) => onChange(min, Number(e.target.value))}
          placeholder="0.04"
          className="text-right placeholder:text-right"
        />
      </div>
    </div>
  );
}