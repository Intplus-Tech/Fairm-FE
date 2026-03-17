import ActionMenu from "./ActionMenu";
import { useEffect, useState } from "react";
import { usersService } from "../../../../services/user.service";
import { User } from "@/types/user";

<<<<<<< HEAD
export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await usersService.list();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatRole = (role: User["role"]) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatStatus = (status: User["status"]) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatLastActive = (date: string | null) => {
    if (!date) return "Never";

    const now = new Date();
    const lastActive = new Date(date);
    const diffMs = now.getTime() - lastActive.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (loading) {
    return <p className="p-4 text-sm text-gray-500">Loading users...</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-500">{error}</p>;
  }
=======
interface User {
  name: string;
  role: string;
  status: string;
  lastActive: string;
}
>>>>>>> e6403df (minor adjustment continued)

export default function UserTable({ users }: { users: User[] }) {
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
          {users.length === 0 ? (
            <tr>
<<<<<<< HEAD
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
=======
              <td colSpan={5} className="text-center py-6 text-gray-500">
>>>>>>> e6403df (minor adjustment continued)
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
<<<<<<< HEAD
              <tr key={user._id} className="border-t">
                <td className="px-4 py-3">
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </td>

                <td className="px-4 py-3 text-center">
                  {formatRole(user.role)}
=======
              <tr key={user.name} className="border-t">
                <td className="px-4 py-3">{user.name}</td>

                <td className="px-4 py-3 text-center">
                  {user.role}
>>>>>>> e6403df (minor adjustment continued)
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`rounded px-2 py-1 text-xs ${
<<<<<<< HEAD
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {formatStatus(user.status)}
=======
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
>>>>>>> e6403df (minor adjustment continued)
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
<<<<<<< HEAD
                  {formatLastActive(user.lastActiveAt)}
                </td>

                <td className="px-4 py-3 text-right">
                  <ActionMenu user={user} onRefresh={fetchUsers} />
=======
                  {user.lastActive}
                </td>

                <td className="px-4 py-3 text-right">
                  <ActionMenu />
>>>>>>> e6403df (minor adjustment continued)
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}