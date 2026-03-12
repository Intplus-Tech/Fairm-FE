export default function LoadingDetails() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">Loading Details</h2>

      <div className="grid md:grid-cols-4 gap-4">

        <div>
          <label className="text-sm">Loading Starts</label>
          <input type="time" className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm">Loading End</label>
          <input type="time" className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm">Loading Team</label>
          <select className="w-full border rounded-lg p-2 mt-1">
            <option>Joshua Adebola</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Supervisor</label>
          <select className="w-full border rounded-lg p-2 mt-1">
            <option>Mr Azzez</option>
          </select>
        </div>

      </div>
    </div>
  )
}