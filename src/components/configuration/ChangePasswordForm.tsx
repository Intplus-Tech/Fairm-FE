"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PasswordSuccessToast from "./PasswordSuccessToast";
import clsx from "clsx";

export default function ChangePasswordForm() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔹 Simulate API call (replace with real one)
      await new Promise((res) => setTimeout(res, 1200));

      setSuccess(true);
    } catch {
      // handle error properly later
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {success && <PasswordSuccessToast onClose={() => setSuccess(false)} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium">New Password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter New Password"
              required
              className="w-full rounded-lg border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-2.5 text-muted-foreground"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Re-enter Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              required
              className="w-full rounded-lg border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2.5 text-muted-foreground"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Rules */}
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Password must be at least 8 characters long</li>
          <li>• Include uppercase and lowercase letters</li>
          <li>• Include at least one number and special character</li>
        </ul>

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "rounded-lg px-6 py-2 text-sm font-medium transition",
              loading
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : "bg-primary text-white hover:bg-primary/90"
            )}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </>
  );
}
