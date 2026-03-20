"use client";

import { UserRole } from "@/types/auth";
import { User } from "@/types/user";
import { useState } from "react";
// import { usersService } from "@/services/user.service";

import toast from "react-hot-toast";
import { usersService } from "../../../../services/user.service";

interface EditUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
  user: User;
}

export default function EditUserModal({
  onClose,
  onSuccess,
  user,
}: EditUserModalProps) {
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [role, setRole] = useState<UserRole>(user?.role ?? "staff");
  const [status, setStatus] = useState<User["status"]>(user?.status ?? "active");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: Partial<User> = {
        fullName,
        email,
        phone,
        role,
        status,
      };

      await usersService.update(user._id, payload);

      toast.success("User updated successfully!");
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Failed to update user:", err);
      setError("Failed to update user. Please try again.");
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit User</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">Email Address</label>
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
            <label className="mb-1 block text-sm font-medium">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium">User Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select role</option>
              <option value="super_admin">Super Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as User["status"])}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="active">Active</option>
              <option value="pending_setup">Pending Setup</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}