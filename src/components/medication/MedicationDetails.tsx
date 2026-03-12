export default function MedicationDetails() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h2 className="font-semibold text-lg mb-4">
        Medication Details
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="text-sm">
            Medication Name
          </label>

          <input
            placeholder="Enter Medication Name"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm">
            Expiry Date
          </label>

          <input
            type="date"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

      </div>

    </div>
  )
}