// import { Pen } from "@/services/broiler.service";

import { Pen } from "../../../../services/broiler.service";

interface Props {
  pens: Pen[];
}

export default function PenDetailsTable({ pens }: Props) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h4 className="font-medium mb-4">Pen Details</h4>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[900px] w-full text-sm table-fixed border-collapse">
          <thead className="bg-gray-50 text-[#1C155F]">
            <tr>
              <th className="px-4 py-3 text-left">Pen Name</th>
              <th className="px-4 py-3 text-left">Age (Day)</th>
              <th className="px-4 py-3 text-left">Live Birds</th>
              <th className="px-4 py-3 text-left">Mortality</th>
              <th className="px-4 py-3 text-left">Culls/Sales</th>
              <th className="px-4 py-3 text-left">Feed Consumed (kg)</th>
              <th className="px-4 py-3 text-left">Water Consumed (litres)</th>
              <th className="px-4 py-3 text-left">Average Weight (Kg)</th>
              <th className="px-4 py-3 text-left">Alerts</th>
            </tr>
          </thead>

          <tbody>
            {pens.map((pen) => (
              <tr key={pen.penId} className="border-t">
                <td className="px-10 py-6">{pen.penName}</td>
                <td className="px-10 py-6">{pen.ageInDays}</td>
                <td className="px-10 py-6">{pen.liveBirds}</td>
                <td className="px-10 py-6">{pen.mortality}</td>
                <td className="px-10 py-6">{pen.culls}</td>
                <td className="px-10 py-6">{pen.feedConsumed}</td>
                <td className="px-10 py-6">{pen.waterConsumed}</td>
                <td className="px-10 py-6">{pen.averageWeight}</td>

                <td className="px-4 py-3">
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        pen.mortality > 10
                          ? "bg-red-500"
                          : "bg-yellow-400"
                      }`}
                    />
                    {pen.mortality > 10 ? "Critical" : "Warning"}
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