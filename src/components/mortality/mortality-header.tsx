"use client";

interface MortalityHeaderProps {
  checkedBy: string;
  checkedTime: string;
  onCheckedByChange: (value: string) => void;
  onCheckedTimeChange: (value: string) => void;
}

export default function MortalityHeader({
  checkedBy,
  checkedTime,
  onCheckedByChange,
  onCheckedTimeChange,
}: MortalityHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 py-8 rounded-t-xl">
      <h1 className="text-2xl font-semibold">
        Daily Mortality & Health Entry
      </h1>

      <p className="text-sm opacity-90">
        Track flock health and mortality records
      </p>

      <div className="flex flex-wrap gap-6 mt-4 items-center text-sm">
        <div>{new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</div>

        <div className="flex items-center gap-2">
          Time
          <input
            type="time"
            value={checkedTime}
            onChange={(e) => onCheckedTimeChange(e.target.value)}
            className="text-black rounded px-2 py-1 bg-white p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          Checked By
          <input
            value={checkedBy}
            onChange={(e) => onCheckedByChange(e.target.value)}
            className="text-black rounded px-2 py-1 bg-white p-2"
          />
        </div>
      </div>
    </div>
  );
}