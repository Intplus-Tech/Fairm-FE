"use client";

const pens = [
  { pen: "2", opening: 4356 },
  { pen: "3", opening: 3234 },
  { pen: "2B", opening: "" },
  { pen: "4", opening: "" },
];

export default function PenDataTable() {
  return (
    <div>
      <h2 className="font-semibold mb-4 text-lg">Pen Specific Data</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="p-2">Pen</th>
              <th className="p-2">Opening Stock</th>
              <th className="p-2">Av. Bird Weight</th>
              <th className="p-2">Mortality</th>
              <th className="p-2">Sick/Weak</th>
              <th className="p-2">Culled</th>
              <th className="p-2">Closing Stock</th>
            </tr>
          </thead>

          <tbody>
            {pens.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{row.pen}</td>

                <td className="p-2">
                  <input
                    defaultValue={row.opening}
                    className="border rounded px-2 py-1 w-24 bg-gray-100"
                  />
                </td>

                <td className="p-2">
                  <input className="border border-red-400 rounded px-2 py-1 w-20" />
                </td>

                <td className="p-2">
                  <input className="border border-red-400 rounded px-2 py-1 w-20" />
                </td>

                <td className="p-2">
                  <input className="border border-yellow-400 rounded px-2 py-1 w-20 mb-1" />

                  <div className="flex items-center gap-2 text-xs">
                    <input type="checkbox" />
                    Treat
                  </div>
                </td>

                <td className="p-2">
                  <select className="border rounded px-2 py-1 text-sm">
                    <option>Reason</option>
                    <option>Injured</option>
                    <option>Non-Productive</option>
                    <option>Aggressive</option>
                    <option>Other</option>
                    <option>Deformed</option>
                  </select>
                </td>

                <td className="p-2">
                  <input
                    defaultValue={4356}
                    className="border rounded px-2 py-1 w-24 bg-gray-100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}