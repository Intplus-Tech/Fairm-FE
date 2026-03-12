export default function MedicationHeader() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl font-semibold">
            Daily Medication & Treatment
          </h1>
          <p className="text-sm opacity-90">
            Saturday, January 31, 2026
          </p>
        </div>

        <div className="flex gap-4 items-center">

          <div className="flex items-center gap-2">
            <span className="text-sm">Administered By</span>

            <select className="text-black rounded px-2 py-1 text-sm">
              <option>Ajewole Iyanuloluwa</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">Time</span>

            <select className="text-black rounded px-2 py-1 text-sm">
              <option>8:00</option>
            </select>
          </div>

        </div>

      </div>

    </div>
  )
}