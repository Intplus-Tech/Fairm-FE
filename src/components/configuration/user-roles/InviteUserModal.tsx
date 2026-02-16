"use client";

import { useState } from "react";

interface InviteUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function InviteUserModal({
  onClose,
  onSuccess,
}: InviteUserModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Backend invite user endpoint goes here
    // Example: await inviteUser({ fullName, email, phone, role });

    onSuccess();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Invite New Team Member
            </h2>
            <p className="text-sm text-muted-foreground">
              Send an invitation link to add a new user to your farm
              management system.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Identity */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="Jane Stone"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="jane@gmail.com"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Used for login and notifications
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="+234 9078789999"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              User Role <span className="text-red-500">*</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="Owner">
                Owner – Full Visibility & System Configuration
              </option>
              <option value="Admin">
                Admin – Operations, Stock & Staff Oversight
              </option>
              <option value="Farm Manager">
                Farm Manager – Data Entry & Local Inventory
              </option>
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
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
