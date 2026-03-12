"use client";

export default function WaterConsumption() {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-4">Water Consumption</h2>

      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Pen</th>
            <th>Water (Opening / Closing)</th>
            <th>Consumption</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody className="text-center">
          <tr className="border-t">
            <td>2</td>
            <td>12450 / 13700</td>
            <td>1250</td>
            <td>Normal Flow</td>
          </tr>

          <tr className="border-t">
            <td>3</td>
            <td>12450 / 13700</td>
            <td>1100</td>
            <td>Slight leak detected</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}