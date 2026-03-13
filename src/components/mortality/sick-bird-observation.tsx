"use client";

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

export default function SickBirdObservation() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Sick Bird Observations</h2>

      <p className="text-sm text-gray-500 mb-4">
        Select all symptoms observed in sick birds:
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        {symptoms.map((symptom) => (
          <label key={symptom} className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            {symptom}
          </label>
        ))}
      </div>

      <div>
        <p className="text-sm mb-2">Additional Notes</p>

        <textarea
          className="w-full border rounded-lg p-3"
          rows={4}
          defaultValue="Only Birds in Pen 2 have these symptoms"
        />
      </div>
    </div>
  );
}