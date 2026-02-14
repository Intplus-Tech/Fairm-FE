"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

/* ---------------- Constants ---------------- */

const FLOCK_OPTIONS = ["Layers", "Pullets", "Noilers", "Broilers"];

/* ---------------- Main Modal ---------------- */

export default function ThresholdModal({ onClose }: { onClose: () => void }) {
  return (
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
          {/* ✅ Flock Category (Merged Dropdown) */}
          <FlockCategoryDropdown />

          {/* Benchmark */}
          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4" />
            <span>Use industry benchmark</span>
          </div>

          {/* Mortality */}
          <Section title="Mortality Rate">
            <TwoInputs />
          </Section>

          {/* Temperature */}
          <Section title="Temperature Range (°C)">
            <TwoInputs />
          </Section>

          {/* Feed Consumption */}
          <Section title="Feed Consumption Deviation">
            <p className="text-sm text-muted-foreground">
              Lower Limit (Health / Water Check)
            </p>
            <TwoInputs />

            <p className="text-sm text-muted-foreground mt-3">
              Upper Limit (Waste / Theft Check)
            </p>
            <TwoInputs />
          </Section>

          {/* Egg Production */}
          <Section title="Egg Production / Bird">
            {[
              "16 – 20 weeks",
              "21 – 25 weeks",
              "26 – 30 weeks",
              "31 – 35 weeks",
            ].map(label => (
              <div
                key={label}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center"
              >
                <p className="text-sm">{label}</p>
                <Input
                  placeholder="0.04"
                  className="
                    text-right
                    placeholder:text-right
                    placeholder:text-muted-foreground
                    placeholder:italic
                  "
                />
              </div>
            ))}
          </Section>

          {/* Final thresholds */}
         
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t sticky bottom-0 bg-white flex flex-wrap justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="outline">
            Save & Create New Flock
          </Button>

          <Button className="bg-[#5B4DFF]">
            Save & Activate
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Dropdown ---------------- */

function FlockCategoryDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="space-y-1">
      <Label>
        Flock Category <span className="text-red-500">*</span>
      </Label>

      <div className="relative">
        {/* Input display */}
        <div
          className="
            h-10 w-full rounded-md border px-3 pr-10 text-sm
            flex items-center cursor-default bg-white
            focus-within:ring-2 focus-within:ring-[#5B4DFF]
          "
        >
          <span
            className={`${value ? "text-foreground" : "text-muted-foreground italic"
              }`}
          >
            {value || "Select flock type"}
          </span>
        </div>

        {/* Chevron trigger */}
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-muted-foreground hover:text-foreground
          "
        >
          <ChevronDown
            size={16}
            fill="currentColor"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""
              }`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="
              absolute z-20 mt-1 w-full rounded-md border bg-white shadow-md
              animate-in fade-in slide-in-from-top-1
            "
          >
            {FLOCK_OPTIONS.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
                className="
                  w-full text-left px-3 py-2 text-sm
                  hover:bg-muted transition-colors
                "
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium">
        {title} <span className="text-red-500">*</span>
      </h4>
      {children}
    </div>
  );
}

function TwoInputs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1">
        <p className="text-sm">Min</p>
        <Input
          placeholder="0.04"
          className="
            text-right
            placeholder:text-right
            placeholder:text-muted-foreground
          "
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm">Max</p>
        <Input
          placeholder="0.04"
          className="
            text-right
            placeholder:text-right
            placeholder:text-muted-foreground
          "
        />
      </div>
    </div>
  );
}
