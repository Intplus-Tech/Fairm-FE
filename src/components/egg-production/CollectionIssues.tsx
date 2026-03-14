// components/CollectionIssues.tsx
"use client";

import { CollectionIssuesType } from "@/types/egg-production";

const issueOptions: { label: string; value: CollectionIssuesType }[] = [
  { label: "Egg eating", value: "egg_eating" },
  { label: "Floor eggs", value: "floor_eggs" },
  { label: "Broken In Nest", value: "broken_in_nest" },
  { label: "Dirty Eggs", value: "dirty_eggs" },
  { label: "Blood Spots", value: "blood_spots" },
  { label: "Double Yolks", value: "double_yolks" },
];

interface CollectionIssuesProps {
  value: CollectionIssuesType[];
  onChange: (value: CollectionIssuesType[]) => void;
}

export default function CollectionIssues({
  value,
  onChange,
}: CollectionIssuesProps) {
  const toggleIssue = (issue: CollectionIssuesType) => {
    if (value.includes(issue)) {
      onChange(value.filter((i) => i !== issue));
    } else {
      onChange([...value, issue]);
    }
  };

  return (
    <div className="mt-6">
      <p className="mb-2 font-semibold">Collection Issues</p>
      <div className="flex flex-wrap gap-3">
        {issueOptions.map((issue) => (
          <button
            key={issue.value}
            type="button"
            onClick={() => toggleIssue(issue.value)}
            className={`px-4 py-2 border rounded-full ${
              value.includes(issue.value)
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {issue.label}
          </button>
        ))}
      </div>
    </div>
  );
}