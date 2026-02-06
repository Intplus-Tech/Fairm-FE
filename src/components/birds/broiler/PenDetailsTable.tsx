export default function PenDetailsTable() {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h4 className="font-medium mb-3">Pen Details</h4>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th>Pen Name</th>
              <th>Age (Day)</th>
              <th>Live Birds</th>
              <th>Mortality</th>
              <th>Culls/Sales</th>
              <th>Feed Consumed(kg)</th>
              <th>Water Consumed(litres)</th>
              <th>Average Weight(Kg)</th>
              <th>Alerts</th>
            </tr>
          </thead>

          <tbody>
            {["Pen 1", "Pen 2", "Pen 3", "Pen 4"].map((pen, i) => (
              <tr key={pen}>
                <td>{pen}</td>
                <td>3</td>
                <td>12,981</td>
                <td>81</td>
                <td>42</td>
                <td>230</td>
                <td>0</td>
                <td>3.45</td>
                <td>
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
