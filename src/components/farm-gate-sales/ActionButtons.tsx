interface Props {
  onSave: () => void;
  loading?: boolean;
}

export default function ActionButtons({ onSave, loading = false }: Props) {
  return (
    <div className="flex justify-between items-center pt-4">

      <button className="border px-4 py-2 rounded-lg">
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

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Next: Bulk Transfer →
        </button>

      </div>

    </div>
  );
}