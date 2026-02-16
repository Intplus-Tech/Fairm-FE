import ActionMenu from "./ActionMenu";

export default function UserTable() {
  const users = [
    { name: "Jane Smith", role: "Manager", status: "Active", lastActive: "30m ago" },
    { name: "John Anderson", role: "Manager", status: "Active", lastActive: "2h ago" },
    { name: "Mike Tobe", role: "Manager", status: "Inactive", lastActive: "3 months ago" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Last Active</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name} className="border-t">
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3 text-center">{user.role}</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded px-2 py-1 text-xs ${user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">{user.lastActive}</td>
              <td className="px-4 py-3 text-right">
                <ActionMenu />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
