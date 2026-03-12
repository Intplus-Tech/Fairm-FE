export default function VaccinationSchedule() {

  const vaccines = [
    "ND Vaccine",
    "IB Vaccine",
    "Gumboro Vaccine",
    "Coryza Vaccine",
    "Blood Spots",
    "Fowl Pox"
  ]

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

      <h2 className="font-semibold text-lg">
        Vaccination Schedule (If applicable)
      </h2>

      <div className="flex flex-wrap gap-4">

        {vaccines.map((vac) => (
          <label key={vac} className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <input type="radio" name="vaccine"/>
            {vac}
          </label>
        ))}

        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <input type="radio" name="vaccine"/>
          Other:
          <input
            placeholder="Enter Vaccine"
            className="border rounded p-1 text-sm"
          />
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="text-sm">Dosage</label>

          <div className="flex border rounded-lg mt-1">
            <input defaultValue="0" className="flex-1 p-2 outline-none"/>
            <span className="px-3 flex items-center text-sm text-gray-500">
              ml/bird
            </span>
          </div>
        </div>

        <div>

          <label className="text-sm block mb-2">Method</label>

          <div className="flex gap-4">

            <label className="flex gap-2 items-center">
              <input type="radio" name="method"/>
              Water
            </label>

            <label className="flex gap-2 items-center">
              <input type="radio" name="method"/>
              Spray
            </label>

            <label className="flex gap-2 items-center">
              <input type="radio" name="method"/>
              Injection
            </label>

          </div>

        </div>

      </div>

    </div>
  )
}