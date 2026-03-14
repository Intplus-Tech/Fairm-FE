"use client";

import type { AppliedType, SicknessObserved } from "@/types/medication";

type Props = {
  sicknessObserved: SicknessObserved[];
  setSicknessObserved: React.Dispatch<React.SetStateAction<SicknessObserved[]>>;
  treatmentName: string;
  setTreatmentName: (value: string) => void;
  applied: AppliedType;
  setApplied: (value: AppliedType) => void;
};

const issueOptions: { label: string; value: SicknessObserved }[] = [
  { label: "Mites observed", value: "mites_observed" },
  { label: "Lice observed", value: "lice_observed" },
  { label: "Worms observed", value: "worms_observed" },
];

export default function HealthObservation({
  sicknessObserved,
  setSicknessObserved,
  treatmentName,
  setTreatmentName,
  applied,
  setApplied,
}: Props) {
  const toggleIssue = (value: SicknessObserved) => {
    setSicknessObserved((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">
        Health Observation
      </h2>

      <div className="flex gap-4 flex-wrap">
        {issueOptions.map((issue) => (
          <label
            key={issue.value}
            className="flex items-center gap-2 border rounded-lg px-3 py-2"
          >
            <input
              type="checkbox"
              checked={sicknessObserved.includes(issue.value)}
              onChange={() => toggleIssue(issue.value)}
            />
            {issue.label}
          </label>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="text-sm">
            Treatment
          </label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter treatment"
            value={treatmentName}
            onChange={(e) => setTreatmentName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm block mb-2">
            Applied
          </label>

          <div className="flex gap-4">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="applied"
                checked={applied === "yes"}
                onChange={() => setApplied("yes")}
              />
              Yes
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="applied"
                checked={applied === "no"}
                onChange={() => setApplied("no")}
              />
              No
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="applied"
                checked={applied === "schedule"}
                onChange={() => setApplied("schedule")}
              />
              Scheduled
            </label>

          </div>

        </div>

      </div>

    </div>
  )
}