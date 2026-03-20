"use client";

import { useEffect, useMemo, useState } from "react";
import UserTable from "./userTable";
import { usersService } from "../../../../services/user.service";
import { User } from "@/types/user";

export default function UserManagement({ onInvite }: { onInvite: () => void }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch users from backend
  useEffect(() => {
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

    fetchUsers();
  }, []);

  // ✅ Filter users
  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      return (
        fullName.includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    });
  }, [search, users]);

  // ✅ Export CSV (using real API fields)
  const handleExport = () => {
    const headers = ["Name", "Role", "Status", "Last Active"];

    const rows = filteredUsers.map((user) => [
      `${user.firstName} ${user.lastName}`,
      user.role,
      user.status,
      user.lastActiveAt || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-lg border bg-white p-4 space-y-4">
      {/* Top Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          placeholder="Search by name or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 rounded-md border px-3 py-2 text-sm"
        />

        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Export Users
          </button>

          <button
            onClick={onInvite}
            className="rounded-md bg-[#4A3AFF] px-4 py-2 text-sm text-white"
          >
            + Invite New User
          </button>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-sm text-gray-500">Loading users...</p>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Table */}
      {!loading && !error && (
        <UserTable users={filteredUsers} />
      )}
    </div>
  );
}