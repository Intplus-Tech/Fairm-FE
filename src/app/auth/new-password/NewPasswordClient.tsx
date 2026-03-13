"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/brand/logo";
import Word from "@/components/brand/word";
import { authService } from "../../../../services/auth.service";

export default function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp")
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // basic validations
  const isPasswordValid = password.trim().length >= 6;
  const doPasswordsMatch = password === rePassword;
  const isFormValid = isPasswordValid && doPasswordsMatch;

  const handleCreateNewPassword = async () => {
    if (!password.trim()) {
      alert("Password is required.");
      return;
    }

    if (!isPasswordValid) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (!rePassword.trim()) {
      alert("Please re-enter your password.");
      return;
    }

    if (!doPasswordsMatch) {
      alert("Passwords do not match.");
      return;
    }

    if (!email || !otp) {
      setErrorMessage("Invalid password reset session. Please restart the process.");
      return;
    }

    // ✅ All validation passed
    // Here you can call your API to save password
    // After success, redirect to login page

    try {
      setLoading(true);

      await authService.resetPassword({
        email,
        otp,
        newPassword: password
      });

      router.push("/auth/login");
    } catch (error: unknown) {
      let message = "Invalid or expired OTP. Please try again.";
      if (error instanceof Error) message = error.message || message;
      else if (typeof error === "object" && error !== null) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) message = err.response.data.message;
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-6">
        <Logo className="h-[23px] w-[23px]" />
        <Word className="h-[34px] w-[80px]" />
      </div>

      {/* Card */}
      <Card className="w-full max-w-lg md:max-w-xl bg-transparent backdrop-blur-lg">
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-2xl text-start font-semibold">
            Create New Password
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 md:px-8 pb-8 space-y-4">
          <div className="space-y-6">
            {/* New Password */}
            <div className="space-y-1">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter New password"
                  type={showPassword ? "text" : "password"}
                  className="bg-white pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Re-enter Password */}
            <div className="space-y-1">
              <Label htmlFor="rePassword">Re-Enter New Password</Label>
              <div className="relative">
                <Input
                  id="rePassword"
                  placeholder="Re-enter your new password"
                  type={showPassword ? "text" : "password"}
                  className="bg-white pr-10"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

            {/* Error message (UI only, no popup, no overlay) */}
            {errorMessage && (
              <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
            )}

          {/* Create New Password Button */}
          <Button
            onClick={handleCreateNewPassword}
            disabled={!isFormValid || loading}
            className="w-full py-5 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#4A3AFF" }}
          >
            {loading ? "Create New Password..." : "Create New Password"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
