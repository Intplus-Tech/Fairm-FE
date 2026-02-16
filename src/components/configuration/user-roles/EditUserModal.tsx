"use client";

import { useState } from "react";

interface EditUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
  user?: {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    status: "Active" | "Inactive";
  };
}

export default function EditUserModal({
  onClose,
  onSuccess,
  user,
}: EditUserModalProps) {
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [role, setRole] = useState(user?.role ?? "");
  const [status, setStatus] = useState(user?.status ?? "Active");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Later: call backend update user endpoint here
    onSuccess();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit User</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              User Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select role</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
              <option value="Farm Manager">Farm Manager</option>
              <option value="Entry Officer">Entry Officer</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Active" | "Inactive")
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
