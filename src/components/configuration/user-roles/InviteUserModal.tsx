"use client";

import { useState } from "react";
import { authService } from "../../../../services/auth.service";

interface InviteUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function InviteUserModal({
  onClose,
  onSuccess,
}: InviteUserModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(""); 

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  // Combine firstName and lastName
  const fullName = `${firstName} ${lastName}`.trim();

  try {
    const res = await fetch("/api/demo/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phone, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Set error message
      setError(data.message || "Failed to send invite.");
      return;
    }

    console.log("Invite link (demo):", data.inviteLink);
    setError(""); // Clear any previous error
    onSuccess();
  } catch (err) {
    setError("Something went wrong. Please try again.");
    console.error(err);
  }
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="Jane"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="Full Name"
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
                placeholder=""
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
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="entry_officer">Entry Officer</option>
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-2">
              {error}
            </p>
          )}

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
              disabled={loading}
              className="rounded-md bg-[#4A3AFF] px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}