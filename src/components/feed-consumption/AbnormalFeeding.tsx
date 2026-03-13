"use client";

import type { AbnormalFeedingType } from "@/types/feed-consumption";

type Props = {
  symptoms: AbnormalFeedingType[];
  setSymptoms: React.Dispatch<React.SetStateAction<AbnormalFeedingType[]>>;
  additionalNotes: string;
  setAdditionalNotes: (value: string) => void;
};

const options: { label: string; value: AbnormalFeedingType }[] = [
  { label: "Reduced Appetite", value: "reduced_appetite" },
  { label: "Selective Feeding", value: "selective_feeding" },
  { label: "Over Consumption", value: "over_consumption" },
  { label: "Feed Wastage", value: "feed_wastage" },
  { label: "Aggression at feeder", value: "aggression_at_feeder" },
  { label: "Other", value: "other" },
];

export default function AbnormalFeeding({
  symptoms,
  setSymptoms,
  additionalNotes,
  setAdditionalNotes,
}: Props) {
  const toggleSymptom = (value: AbnormalFeedingType) => {
    setSymptoms((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-3">Abnormal Feeding Behaviour</h2>

      <div className="flex flex-wrap gap-4 text-sm mb-4">
        {options.map((item) => (
          <label key={item.value} className="flex gap-1">
            <input
              type="checkbox"
              checked={symptoms.includes(item.value)}
              onChange={() => toggleSymptom(item.value)}
            />
            {item.label}
          </label>
        ))}
      </div>

      <textarea
        className="w-full border rounded p-3 text-sm"
        rows={3}
        placeholder="Additional Notes..."
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
      />
    </div>
  );
}