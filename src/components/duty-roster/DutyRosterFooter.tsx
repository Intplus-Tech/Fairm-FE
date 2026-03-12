"use client";

import { useRouter } from "next/navigation";

export default function DutyRosterFooter() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-6 border-t">

      <button
        onClick={() => router.back()}
        className="border border-indigo-500 text-indigo-500 px-6 py-2 rounded-lg"
      >
        ← Back
      </button>

      <div className="flex gap-4">
        <button className="border border-indigo-500 text-indigo-500 px-6 py-2 rounded-lg">
          Save Employee Attendance
        </button>

        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg">
          Save Report
        </button>
      </div>
    </div>
  );
}