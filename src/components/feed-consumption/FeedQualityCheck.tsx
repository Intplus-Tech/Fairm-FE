"use client";

import type {
  AppearanceType,
  InsectPestType,
  SmellType,
} from "@/types/feed-consumption";

type Props = {
  appearance: AppearanceType;
  setAppearance: (value: AppearanceType) => void;
  smell: SmellType;
  setSmell: (value: SmellType) => void;
  insectPests: InsectPestType;
  setInsectPests: (value: InsectPestType) => void;
};

export default function FeedQualityCheck({
  appearance,
  setAppearance,
  smell,
  setSmell,
  insectPests,
  setInsectPests,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-4">Feed Quality Check</h2>

      <div className="space-y-4 text-sm">

        <div>
          <p className="font-medium mb-2">Appearance</p>
          <div className="flex gap-4">
            {[
              { label: "Good", value: "good" },
              { label: "Moldy", value: "moldy" },
              { label: "Clumpy", value: "clumpy" },
              { label: "Other", value: "other" },
            ].map((item) => (
              <label key={item.value} className="flex gap-1">
                <input
                  type="radio"
                  name="appearance"
                  checked={appearance === item.value}
                  onChange={() => setAppearance(item.value as AppearanceType)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Smell</p>
          <div className="flex gap-4">
            {[
              { label: "Normal", value: "normal" },
              { label: "Rancid", value: "rancid" },
              { label: "Musty", value: "musty" },
              { label: "Other", value: "other" },
            ].map((item) => (
              <label key={item.value} className="flex gap-1">
                <input
                  type="radio"
                  name="smell"
                  checked={smell === item.value}
                  onChange={() => setSmell(item.value as SmellType)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Insects/Pests</p>
          <div className="flex gap-4">
            {[
              { label: "None", value: "none" },
              { label: "Weevils", value: "weevils" },
              { label: "Moths", value: "moths" },
              { label: "Rodent Droppings", value: "rodent_droppings" },
            ].map((item) => (
              <label key={item.value} className="flex gap-1">
                <input
                  type="radio"
                  name="pests"
                  checked={insectPests === item.value}
                  onChange={() => setInsectPests(item.value as InsectPestType)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}