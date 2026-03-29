"use client";

import { Alert } from "../../../services/dashboard.service";

export default function AlertsTable({ alerts }: { alerts: Alert[] | null }) {
  console.log("Alerts data:", alerts);

  const formattedAlerts =
    (alerts ?? []).map((alert, index) => {
      const status =
        alert.mortalityRate.critical > 10 ? "Critical" : "Warning";

      return {
        id: alert._id,
        date: new Date(alert.createdAt).toLocaleDateString(),
        status,
        issue: "Mortality Rate",
        description: `Warning at ${alert.mortalityRate.warning}%, Critical at ${alert.mortalityRate.critical}%`,
      };
    });
   
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
          {formattedAlerts.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-6 text-center text-gray-400"
              >
                No alerts available
              </td>
            </tr>
          ) : (
            formattedAlerts.map((alert, index) => {
              const key = `${alert.date}-${alert.issue}-${index}`;

              return (
                <tr key={key} className="border-t">
                  <td className="py-4 px-2">{alert.date}</td>

                  <td
                    className={`py-4 px-2 ${
                      alert.status === "Critical"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {alert.status}
                  </td>

                  <td className="py-4 px-2">{alert.issue}</td>
                  <td className="py-4 px-2">{alert.description}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}