export default function LayersDetailsTable() {
  return (
    <div className="border rounded-xl bg-white p-4">
      <h4 className="font-medium mb-3">Pen Details</h4>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[1100px] w-full text-sm table-fixed">
          <colgroup>
            <col className="w-[120px]" />
            <col className="w-[120px]" />
            <col className="w-[140px]" />
            <col className="w-[120px]" />
            <col className="w-[140px]" />
            <col className="w-[100px]" />
            <col className="w-[160px]" />
            <col className="w-[140px]" />
            <col className="w-[100px]" />
          </colgroup>

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Pen Name</th>
              <th className="px-4 py-3 text-left">Age (Week)</th>
              <th className="px-4 py-3 text-left">Live Birds</th>
              <th className="px-4 py-3 text-left">Mortality</th>
              <th className="px-4 py-3 text-left">Total Eggs</th>
              <th className="px-4 py-3 text-left">HDP(%)</th>
              <th className="px-4 py-3 text-left">Cracked/Dirty/Broken</th>
              <th className="px-4 py-3 text-left">Vaccine Status</th>
              <th className="px-4 py-3 text-left">FCR (Egg)</th>
            </tr>
          </thead>

          <tbody>
            {[
              { pen: "Pen 1", hdp: 70, cracked: 10, fcr: 2.1 },
              { pen: "Pen 2", hdp: 72, cracked: 20, fcr: 2.2 },
              { pen: "Pen 3", hdp: 71, cracked: 10, fcr: 2.2 },
              { pen: "Pen 4", hdp: 68, cracked: 10, fcr: 2.2 },
            ].map((p, i) => (
              <tr key={p.pen} className="border-t">
                <td className="px-4 py-4">{p.pen}</td>
                <td className="px-4 py-4">32</td>
                <td className="px-4 py-4">12,981</td>
                <td className="px-4 py-4">81</td>
                <td className="px-4 py-4">3650</td>
                <td className="px-4 py-4">{p.hdp}</td>
                <td className="px-4 py-4">{p.cracked}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${i === 3
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {i === 3 ? "Due Today" : "Completed"}
                  </span>
                </td>
                <td className="px-4 py-4">{p.fcr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
