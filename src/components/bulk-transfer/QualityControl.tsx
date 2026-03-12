export default function QualityControl() {
  const fields = [
    "Cracked (Crates)",
    "Cracked (Pieces)",
    "Broken Eggs",
    "Dirty Removed"
  ]

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h2 className="font-semibold text-lg mb-4">
        Quality Control During Loading
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        {fields.map((field) => (
          <div key={field}>
            <label className="text-sm">{field}</label>
            <input
              defaultValue="0"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
        ))}

      </div>
    </div>
  )
}