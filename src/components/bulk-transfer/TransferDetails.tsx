export default function TransferDetails() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">Transfer Details</h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm">Vehicle</label>
          <select className="w-full border rounded-lg p-2 mt-1">
            <option>Truck ABC-123XYZ</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Driver's Name</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter Driver's Name"
          />
        </div>

        <div>
          <label className="text-sm">Departure Time</label>
          <input type="time" className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm">Estimated Arrival</label>
          <input type="time" className="w-full border rounded-lg p-2 mt-1"/>
        </div>

        <div>
          <label className="text-sm">Contact Person</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter Contact Name"
          />
        </div>

        <div>
          <label className="text-sm">Phone Number</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter Phone Number"
          />
        </div>

      </div>
    </div>
  )
}