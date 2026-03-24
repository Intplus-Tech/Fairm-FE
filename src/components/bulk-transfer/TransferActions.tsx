"use client";

import { useRouter } from "next/navigation";

interface TransferActionsProps {
  onSave: () => void;
  onNext: () => void;
  loading?: boolean;
}

export default function TransferActions({
  onSave,
  onNext,
  loading = false,
}: TransferActionsProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center pt-4">
      {/* ✅ Back button now works */}
      <button
        onClick={() => router.push("/entry-officer/farm-gate-sales")}
        className="border px-4 py-2 rounded-lg hover:bg-gray-50"
      >
        ← Back
      </button>

      <div className="flex gap-4">
        {/* ✅ Save button fully active */}
        <button
          onClick={onSave}
          disabled={loading}
          className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Transfer"}
        </button>

        {/* ✅ Next button goes to medication via onNext */}
        <button
          onClick={onNext}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next: Medication →
        </button>
      </div>
    </div>
  );
}