"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import clsx from "clsx";
import toast from "react-hot-toast"; // ✅ import toast
import { authService } from "../../../services/auth.service";
import { ChangePassword } from "@/types/auth";

export default function ChangePasswordForm() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: keyof ChangePassword | "confirmPassword", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const checkRules = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔹 Simulate API call (replace with real one)
      await authService.changePassword(form);

      // ✅ Show success toast
      toast.custom(
        (t) => (
          <div
            className={`
              ${t.visible ? "animate-enter" : "animate-leave"}
              flex gap-3 rounded-xl bg-white p-4 shadow-lg border border-green-500
            `}
          >
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div className="flex flex-col text-sm text-gray-900">
              <div>Password updated</div>
              <div>Your password has been changed successfully</div>
            </div>
          </div>
        ),
        {
          duration: 4000,
          position: "top-right",
        }
      );

      // Clear form
      setForm({
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      // handle error properly later
    } finally {
      setLoading(false);
    }
  };

  const rules = checkRules(form.newPassword);

  return (
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
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Old Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Old Password</label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="Enter your old password"
            required
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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

      {/* New Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium">New Password</label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="Enter New Password"
            required
            value={form.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
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
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
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
      <ul className="space-y-1 text-xs">
        <li className={clsx(rules.length ? "text-green-600" : "text-muted-foreground")}>
          • Password must be at least 8 characters long
        </li>
        <li className={clsx(rules.uppercase && rules.lowercase ? "text-green-600" : "text-muted-foreground")}>
          • Include uppercase and lowercase letters
        </li>
        <li className={clsx(rules.number && rules.special ? "text-green-600" : "text-muted-foreground")}>
          • Include at least one number and special character
        </li>
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
              : "bg-[#4A3AFF] text-white hover:bg-[#3A2EDC]"
          )}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}