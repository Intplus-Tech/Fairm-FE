export default function TransferActions() {
  return (
    <div className="flex justify-between items-center pt-4">

      <button className="border px-4 py-2 rounded-lg">
        ← Back
      </button>

      <div className="flex gap-4">

        <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg">
          Save Transfer
        </button>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Next: Medication & Treatment →
        </button>

      </div>

    </div>
  )
}