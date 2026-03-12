"use client";

export default function DutyRosterHeader() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold">Daily Duty Roster</h1>
        <p className="text-sm opacity-90">
          Saturday, January 31, 2026
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span>Administered By</span>
          <select className="text-black rounded px-2 py-1">
            <option>Select</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span>Time</span>
          <input
            type="time"
            defaultValue="00:00"
            className="text-black rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
}