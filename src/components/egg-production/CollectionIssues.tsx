// components/CollectionIssues.tsx
"use client";

import { useState } from "react";

const issues = ["Egg eating", "Floor eggs", "Broken In Nest", "Dirty Eggs", "Blood Spots", "Double Yolks"];

export default function CollectionIssues() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleIssue = (issue: string) => {
    if (selected.includes(issue)) {
      setSelected(selected.filter(i => i !== issue));
    } else {
      setSelected([...selected, issue]);
    }
  };

  return (
    <div className="mt-6">
      <p className="mb-2 font-semibold">Collection Issues</p>
      <div className="flex flex-wrap gap-3">
        {issues.map(issue => (
          <button
            key={issue}
            onClick={() => toggleIssue(issue)}
            className={`px-4 py-2 border rounded-full ${
              selected.includes(issue) ? "bg-purple-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            {issue}
          </button>
        ))}
      </div>
    </div>
  );
}