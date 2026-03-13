"use client";

type Props = {
  onSave: () => void;
  loading?: boolean;
};

export default function MedicationActions({ onSave, loading }: Props) {
  return (
    <div className="flex justify-end gap-4 pt-4">

      <button 
        onClick={onSave}
        disabled={loading}
      className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg">
        {loading ? "Saving..." : "Save Medication Data"}
      </button>

      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
        Next: Employee Attendance →
      </button>

    </div>
  )
}