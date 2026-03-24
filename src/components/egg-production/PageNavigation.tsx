"use client";

import { useRouter } from "next/navigation";

interface PageNavigationProps {
  onSave: () => void;
  loading?: boolean;
  onNext: () => void;
}

export default function PageNavigation({
  onSave,
  loading = false,
  onNext,
}: PageNavigationProps) {
  const router = useRouter();

  return (
    <div className="mt-8 flex justify-between">
      {/* ✅ BACK BUTTON FIXED */}
      <button
        onClick={() =>
          router.push("/entry-officer/feed-consumption")
        }
        className="px-6 py-2 border rounded-md text-gray-700"
      >
        ← Back
      </button>

      <div className="flex gap-3">
        {/* SAVE */}
        <button
          type="button"
          onClick={onSave}
          disabled={loading}
          className="px-6 py-2 border rounded-md text-gray-700"
        >
          {loading ? "Saving..." : "Save Egg Data"}
        </button>

        {/* ✅ MOVED NEXT BUTTON */}
        <button
          onClick={onNext}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md"
        >
          Next: Farm Gate Sales →
        </button>
      </div>
    </div>
  );
}