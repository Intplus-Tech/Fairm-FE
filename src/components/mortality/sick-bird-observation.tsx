"use client";

import type { SicknessType } from "@/types/mortality";

const symptomsList: { label: string; value: SicknessType }[] = [
  { label: "Lethargy", value: "lethargy" },
  { label: "Coughing", value: "coughing" },
  { label: "Diarrhea", value: "diarrhea" },
  { label: "Limping", value: "limping" },
  { label: "Sneezing", value: "sneezing" },
  { label: "Swelling", value: "swelling" },
  { label: "Discharge", value: "discharge" },
  { label: "Ruffled Feathers", value: "ruffled_feathers" },
];

interface SickBirdObservationProps {
  symptoms: SicknessType[];
  setSymptoms: React.Dispatch<React.SetStateAction<SicknessType[]>>;
  additionalNotes: string;
  setAdditionalNotes: (value: string) => void;
}

export default function SickBirdObservation({
  symptoms,
  setSymptoms,
  additionalNotes,
  setAdditionalNotes,
}: SickBirdObservationProps) {
  const toggleSymptom = (value: SicknessType) => {
    setSymptoms((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Sick Bird Observations</h2>

      <p className="text-sm text-gray-500 mb-4">
        Select all symptoms observed in sick birds:
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        {symptomsList.map((symptom) => (
          <label key={symptom.value} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={symptoms.includes(symptom.value)}
              onChange={() => toggleSymptom(symptom.value)}
            />
            {symptom.label}
          </label>
        ))}
      </div>

      <div>
        <p className="text-sm mb-2">Additional Notes</p>

        <textarea
          className="w-full border rounded-lg p-3"
          rows={4}
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        />
      </div>
    </div>
  );
}