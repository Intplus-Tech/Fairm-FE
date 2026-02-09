export default function PulletDetailsTable() {
  return (
    <div className="border rounded-xl bg-white p-4">
      <h4 className="font-medium mb-3">Pen Details</h4>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[900px] w-full text-sm table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left w-[140px]">Pen Name</th>
              <th className="px-6 py-3 text-left w-[100px]">Age (Day)</th>
              <th className="px-6 py-3 text-left w-[120px]">Live Birds</th>
              <th className="px-6 py-3 text-left w-[110px]">Mortality</th>
              <th className="px-6 py-3 text-left w-[120px]">Feed Type</th>
              <th className="px-6 py-3 text-left w-[130px]">Avg Weight</th>
              <th className="px-6 py-3 text-left w-[120px]">Uniformity</th>
              <th className="px-6 py-3 text-left w-[150px]">
                Vaccine Status
              </th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4].map((i) => (
              <tr key={i} className="border-t">
                <td className="px-6 py-4">Pen {i}</td>
                <td className="px-6 py-4">3</td>
                <td className="px-6 py-4">12,981</td>
                <td className="px-6 py-4">81</td>
                <td className="px-6 py-4">Grower</td>
                <td className="px-6 py-4">3.45</td>
                <td className="px-6 py-4">94%</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${i === 4
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {i === 4 ? "Due Today" : "Completed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
