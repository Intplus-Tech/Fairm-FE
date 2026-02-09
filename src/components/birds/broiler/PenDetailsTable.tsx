export default function PenDetailsTable() {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h4 className="font-medium mb-3">Pen Details</h4>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[900px] w-full text-sm table-fixed">
          <colgroup>
            <col className="w-[120px]" />
            <col className="w-[100px]" />
            <col className="w-[120px]" />
            <col className="w-[110px]" />
            <col className="w-[120px]" />
            <col className="w-[140px]" />
            <col className="w-[160px]" />
            <col className="w-[150px]" />
            <col className="w-[120px]" />
          </colgroup>

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Pen Name</th>
              <th className="px-4 py-3 text-left">Age (Day)</th>
              <th className="px-4 py-3 text-left">Live Birds</th>
              <th className="px-4 py-3 text-left">Mortality</th>
              <th className="px-4 py-3 text-left">Culls/Sales</th>
              <th className="px-4 py-3 text-left">Feed Consumed(kg)</th>
              <th className="px-4 py-3 text-left">Water Consumed(litres)</th>
              <th className="px-4 py-3 text-left">Average Weight(Kg)</th>
              <th className="px-4 py-3 text-left">Alerts</th>
            </tr>
          </thead>

          <tbody>
            {["Pen 1", "Pen 2", "Pen 3", "Pen 4"].map((pen, i) => (
              <tr key={pen} className="border-t">
                <td className="px-4 py-4">{pen}</td>
                <td className="px-4 py-4">3</td>
                <td className="px-4 py-4">12,981</td>
                <td className="px-4 py-4">81</td>
                <td className="px-4 py-4">42</td>
                <td className="px-4 py-4">230</td>
                <td className="px-4 py-4">0</td>
                <td className="px-4 py-4">3.45</td>
                <td className="px-4 py-4">
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-red-500" : "bg-yellow-400"
                        }`}
                    />
                    {i % 2 === 0 ? "Critical" : "Warning"}
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
