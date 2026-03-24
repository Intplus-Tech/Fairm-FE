"use client";

import { useRouter } from "next/navigation";

type Props = {
  onSave: () => void;
  loading?: boolean;
};

export default function MedicationActions({ onSave, loading }: Props) {
  const router = useRouter();

  const goBack = () => {
    router.push("/entry-officer/bulk-transfer");
  };

  const goToDutyRoaster = () => {
    router.push("/entry-officer/duty-roaster");
  };

  return (
    <div className="flex justify-between gap-4 pt-4">
      {/* Back Button */}
      <div>
       <button
        onClick={goBack}
        className="flex items-center gap-2 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        ← Back
      </button>

      </div>
      

      {/* Save Button */}
      <div  className="gap-4 flex ">
        <button
        onClick={onSave}
        disabled={loading}
        className={`border border-indigo-600 px-4 py-2 rounded-lg ${
          loading ? "text-gray-400 border-gray-400" : "text-indigo-600"
        }`}
      >
        {loading ? "Saving..." : "Save Medication Data"}
      </button>

      {/* Duty Roaster Button */}
      <button
        onClick={goToDutyRoaster}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        Next: Duty Roaster →
      </button>

      </div>
      
    </div>
  );
}