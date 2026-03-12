export default function HealthObservation() {

  const issues = [
    "Mites observed",
    "Lice observed",
    "Worms observed"
  ]

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">
        Health Observation
      </h2>

      <div className="flex gap-4 flex-wrap">

        {issues.map((issue) => (
          <label key={issue} className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <input type="radio" name="issue"/>
            {issue}
          </label>
        ))}

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div>

          <label className="text-sm">
            Treatment
          </label>

          <select className="w-full border rounded-lg p-2 mt-1">
            <option>Select Treatment</option>
          </select>

        </div>

        <div>

          <label className="text-sm block mb-2">
            Applied
          </label>

          <div className="flex gap-4">

            <label className="flex gap-2 items-center">
              <input type="radio" name="applied"/>
              Yes
            </label>

            <label className="flex gap-2 items-center">
              <input type="radio" name="applied"/>
              No
            </label>

            <label className="flex gap-2 items-center">
              <input type="radio" name="applied"/>
              Scheduled
            </label>

          </div>

        </div>

      </div>

    </div>
  )
}