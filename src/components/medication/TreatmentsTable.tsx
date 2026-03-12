export default function TreatmentsTable() {

  const pens = ["2", "3", "2B", "4"]

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h2 className="font-semibold text-lg mb-4">
        Treatments Administered
      </h2>

      <table className="w-full text-sm">

        <thead className="text-gray-500">
          <tr>
            <th className="text-left">Pen</th>
            <th>Medication</th>
            <th>Purpose</th>
            <th>Dosage</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className="divide-y">

          {pens.map((pen) => (

            <tr key={pen} className="h-14">

              <td>{pen}</td>

              <td>
                <select className="border rounded p-1">
                  <option>Select</option>
                </select>
              </td>

              <td>
                <select className="border rounded p-1">
                  <option>Select</option>
                </select>
              </td>

              <td className="flex items-center gap-2">

                <input
                  defaultValue="6"
                  className="border rounded p-1 w-14"
                />

                <span className="text-xs text-gray-500">
                  bag in 2000L
                </span>

              </td>

              <td>
                <select className="border rounded p-1">
                  <option>Select</option>
                </select>
              </td>

              <td>

                <div className="flex gap-3">

                  <label className="flex items-center gap-1">
                    <input type="radio" name={`status-${pen}`} />
                    Pending
                  </label>

                  <label className="flex items-center gap-1">
                    <input type="radio" name={`status-${pen}`} />
                    Done
                  </label>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}