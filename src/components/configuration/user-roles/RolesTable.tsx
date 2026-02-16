export default function RolesTable() {
  const rows = [
    { feature: "Threshold Config", owner: "Full Access", admin: "Full Access", entry: "View Only" },
    { feature: "Financial/Sales", owner: "Full Access", admin: "Edit / View", entry: "No Access" },
    { feature: "Employee Management", owner: "Full Access", admin: "Edit / View", entry: "No Access" },
    { feature: "Daily Farm Logs", owner: "View Only", admin: "Edit / View", entry: "Full Access" },
    { feature: "Inventory/Stock", owner: "View Only", admin: "Full Access", entry: "No Access" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Feature/Module</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Admin</th>
            <th className="px-4 py-3">Entry Officer</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-t">
              <td className="px-4 py-3">{row.feature}</td>
              <td className="px-4 py-3 text-center">{row.owner}</td>
              <td className="px-4 py-3 text-center">{row.admin}</td>
              <td className="px-4 py-3 text-center">{row.entry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
