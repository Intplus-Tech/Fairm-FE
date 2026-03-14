"use client";

type Props = {
  onSave: () => void;
  loading?: boolean;
  handleNext: () => void;
};

export default function FeedActions({ onSave, loading, handleNext }: Props) {
  return (
    <div className="flex justify-between">
      <button className="px-4 py-2 border rounded-lg">
        ← Back
      </button>

      <div className="flex gap-3">
        <button 
        onClick={onSave}
        disabled={loading}
        className="px-4 py-2 border rounded-lg">
          {loading ? "Saving..." : "Save Feed Data"}
        </button>

        <button 
        onClick={handleNext}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
          Next: Feed Consumption →
        </button>
      </div>
    </div>
  );
}