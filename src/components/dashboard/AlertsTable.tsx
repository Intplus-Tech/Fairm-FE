"use client";

import { alertsData } from "./data/mockDashboardData";
export default function AlertsTable() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm overflow-x-auto">
      <h3 className="font-semibold mb-4">Alerts</h3>

      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Issue</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody >
          {alertsData.map((alert) =>( 
            <tr key={alert.id} className="border-t ">
              <td className="p-2">{alert.date}</td>
              <td className={alert.status === "Critical" ? "text-red-500" : "text-yellow-500"}>
                {alert.status}
              </td>
              <td>{alert.issue}</td>
              <td>{alert.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
