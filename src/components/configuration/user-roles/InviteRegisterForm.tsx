"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InviteRegisterForm() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");
  const email = params.get("email") ?? "";
  const name = params.get("name") ?? "";
  const role = params.get("role") ?? "";

 


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasNumberSpecial =
    /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);

  const passwordsMatch = password !== "" && password === confirmPassword;

  const isFormValid =
    hasMinLength &&
    hasUpperLower &&
    hasNumberSpecial &&
    passwordsMatch &&
    !loading;

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!isFormValid) return;

  setError("");

  try {
    setLoading(true);

    const res = await fetch("/api/demo/setup-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        email,
        role,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Setup failed");
      setLoading(false);
      return;
    }

    router.replace("/auth/login");
  } catch {
    setError("Something went wrong.");
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex flex-col items-center justify-center py-10 px-4">

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[#4A3AFF] tracking-wide">
          FAIRM
        </h1>
      </div>

      <div className="w-full max-w-[1280px] bg-white rounded-2xl shadow-md px-10 sm:px-16 py-10 mx-4">

        <h2 className="text-2xl font-semibold py-2">Welcome to FAIRM</h2>

        <p className="text-sm text-gray-500">
          You have been invited to join the team, kindly set up your account.
        </p>

        <div className="mb-2">
          <label className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            disabled
            className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-100 text-sm"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* PASSWORD */}

          <div>
            <label className="text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl text-sm pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}

          <div>
            <label className="text-sm font-medium">
              Confirm Password <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-2">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl text-sm pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={!isFormValid}
              className="max-w-[338px] text-[17px] bg-[#4A3AFF] p-2 mt-4 mb-4 rounded-xl text-white font-medium bg-gradient-to-r from-[#5B4BFF] to-[#4A3AFF] hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account…" : "Complete account setup"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}