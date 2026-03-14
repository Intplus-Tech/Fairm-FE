"use client";

type WaterState = {
  penId: string;
  opening: number;
  closing: number;
  notes: string;
};

type Props = {
  water: WaterState;
  setWater: React.Dispatch<React.SetStateAction<WaterState>>;
};

export default function WaterConsumption({ water, setWater }: Props) {
    const consumption = Number(water.closing) - Number(water.opening);

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
            <td>
          <input
          className="border rounded px-3 py-2"
          placeholder="Pen ID"
          value={water.penId}
          onChange={(e) => setWater((prev) => ({ ...prev, penId: e.target.value }))}
        />
        </td>
            <td>
              <input
              type="number"
              className="border rounded px-3 py-2"
              placeholder="Closing"
              value={water.closing}
              onChange={(e) =>
                setWater((prev) => ({ ...prev, closing: Number(e.target.value) }))
              }
            /> 
            /         
            <input
              type="number"
              className="border rounded px-3 py-2"
              placeholder="Opening"
              value={water.opening}
              onChange={(e) =>
                setWater((prev) => ({ ...prev, opening: Number(e.target.value) }))
              }
            />
        </td>
            <td>
            <p className="mt-4 text-sm text-gray-600">
              Consumption: <span className="font-semibold">{consumption}</span> liters
           </p>
            </td>
            <td>        
              <input
          className="border rounded px-3 py-2"
          placeholder="Notes"
          value={water.notes}
          onChange={(e) => setWater((prev) => ({ ...prev, notes: e.target.value }))}
        />
        </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}