  "use client";

  import { useRouter } from "next/navigation";


interface Props {
  onSave: () => void;
  onNext: () => void;
  loading?: boolean;
}

export default function ActionButtons({
  onSave,
  onNext,
  loading = false,
}: Props) {
  
  const router = useRouter();

  return (
    <div className="flex justify-between items-center pt-4">

      <button
        onClick={() =>
          router.push("/entry-officer/feed-consumption")
        }
        className="px-6 py-2 border rounded-md text-gray-700"
      >
        ← Back
      </button>

      <div className="flex gap-4">

        <button
          onClick={onSave}
          disabled={loading}
          className="border border-indigo-500 text-indigo-600 px-4 py-2 rounded-lg"
        >
          {loading ? "Saving..." : "Save Farm Sale"}
        </button>

        <button
          onClick={onNext}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Next: Bulk Transfer →
        </button>

      </div>
    </div>
  );
}