type Props = {
  administeredBy: string;
  setAdministeredBy: (value: string) => void;
  time: string;
  setTime: (value: string) => void;
};

export default function MedicationHeader({
  administeredBy,
  setAdministeredBy,
  time,
  setTime,
}: Props) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl font-semibold">
            Daily Medication & Treatment
          </h1>
          <p className="text-sm opacity-90">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex gap-4 items-center">

          <div className="flex items-center gap-2">
            <span className="text-sm">Administered By</span>

            <select 
              value={administeredBy}
              onChange={(e) => setAdministeredBy(e.target.value)}
            className="text-black rounded px-2 py-1 text-sm">
              <option>Ajewole Iyanuloluwa</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">Time</span>

            <input
              type="time"
              className="text-black rounded px-2 py-1 text-sm"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

        </div>

      </div>

    </div>
  )
}