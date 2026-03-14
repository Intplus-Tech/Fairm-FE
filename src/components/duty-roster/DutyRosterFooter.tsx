"use client";

import { useRouter } from "next/navigation";

interface Props {
  onSave: () => void;
  loading?: boolean;
  handleFinish: () => void;
}

export default function DutyRosterFooter({ onSave, loading, handleFinish }: Props) {
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
        <button 
          onClick={onSave}
          disabled={loading}
        className="border border-indigo-500 text-indigo-500 px-6 py-2 rounded-lg">
          {loading ? "Saving..." : "Save Employee Attendance"}
        </button>

        <button 
          onClick={handleFinish}
          disabled={loading}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg">
          {loading ? "Saving..." : "Save Report"}
        </button>
      </div>
    </div>
  );
}