"use client";

import { useState } from "react";

const symptoms = [
  "Lethargy",
  "Coughing",
  "Diarrhea",
  "Limping",
  "Sneezing",
  "Swelling",
  "Discharge",
  "Ruffled Feathers",
];

export default function SickBirdObservations() {
  const [checkedSymptoms, setCheckedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState(
    "Only Birds in Pen 2 have these symptoms"
  );

  const toggleSymptom = (symptom: string) => {
    setCheckedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <h3 className="font-semibold">Sick Bird Observations</h3>
      <p className="text-sm text-gray-600">
        Select all symptoms observed in sick birds:
      </p>
      <div className="flex flex-wrap gap-2">
        {symptoms.map((s) => (
          <label key={s} className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={checkedSymptoms.includes(s)}
              onChange={() => toggleSymptom(s)}
            />
            {s}
          </label>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium mt-2">Additional Notes</label>
        <textarea
          className="w-full rounded border px-2 py-1 text-sm"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
}