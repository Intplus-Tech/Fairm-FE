"use client";

import { useMemo, useState } from "react";
import UserTable from "./userTable";

interface User {
  name: string;
  role: string;
  status: string;
  lastActive: string;
}

export default function UserManagement({ onInvite }: { onInvite: () => void }) {
  const [search, setSearch] = useState("");

  const users: User[] = [
    { name: "Jane Smith", role: "Manager", status: "Active", lastActive: "30m ago" },
    { name: "John Anderson", role: "Manager", status: "Active", lastActive: "2h ago" },
    { name: "Mike Tobe", role: "Manager", status: "Inactive", lastActive: "3 months ago" },
  ];

  // 🔍 Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const term = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    });
  }, [search, users]);

  // 📤 Export function (CSV)
  const handleExport = () => {
    const headers = ["Name", "Role", "Status", "Last Active"];

    const rows = filteredUsers.map((user) => [
      user.name,
      user.role,
      user.status,
      user.lastActive,
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

      <UserTable users={filteredUsers} />
    </div>
  );
}