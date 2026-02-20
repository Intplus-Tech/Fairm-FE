"use client";

import { alertsData } from "./data/mockDashboardData";

export default function AlertsTable() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm overflow-x-auto">
      <h3 className="font-semibold mb-4">Alerts</h3>

      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th className="py-4">Date</th>
            <th className="py-4">Status</th>
            <th className="py-4">Issue</th>
            <th className="py-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {alertsData.map((alert) => (
            <tr key={alert.id} className="border-t">
              <td className="py-4 px-2">{alert.date}</td>
              <td className={`py-4 px-2 ${alert.status === "Critical" ? "text-red-500" : "text-yellow-500"}`}>
                {alert.status}
              </td>
              <td className="py-4 px-2">{alert.issue}</td>
              <td className="py-4 px-2">{alert.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}