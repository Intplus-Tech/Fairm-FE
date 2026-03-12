interface Props {
  onSave: () => void;
}

export default function ActionButtons({ onSave }: Props) {
  return (
    <div className="flex justify-between items-center pt-4">

      <button className="border px-4 py-2 rounded-lg">
        ← Back
      </button>

      <div className="flex gap-4">

        <button
          onClick={onSave}
          className="border border-indigo-500 text-indigo-600 px-4 py-2 rounded-lg"
        >
          Save Farm Sale
        </button>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Next: Bulk Transfer →
        </button>

      </div>

    </div>
  );
}