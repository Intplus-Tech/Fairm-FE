"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import { authService } from "../../../../services/auth.service";
import type { ApiErrorResponse } from "@/types/auth";
import { AxiosError } from "axios";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // email validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = email.trim().length > 0 && isEmailValid && !isLoading;

  const handleResetPassword = async () => {
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("Email is required.");
      return;
    }

    if (!isEmailValid) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      await authService.forgotPassword({ email });

      /**
       * IMPORTANT:
       * Backend ALWAYS returns ok (even if email doesn't exist)
       * This prevents account enumeration.
       *
       * So we ALWAYS proceed to the next step.
       */
      router.push("/auth/password-reset");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;

      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
        return;
      }

      setErrorMessage("Unable to request password reset. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4">
      {/* Wrapper to anchor arrow to card */}
      <div className="relative w-full max-w-lg md:max-w-xl">
        {/* Back arrow */}
        <Link
          href="/auth/login"
          className="absolute -top-10 left-2 flex items-center gap-2 text-gray-700 hover:text-[#4A3AFF] transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <Card className="w-full bg-transparent backdrop-blur-lg">
          {/* Header */}
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl text-start font-semibold">
              Forgot Password
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className="px-6 md:px-8 pb-10 space-y-6">
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@fairm.com"
                className="bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Error message (UI only, no popup, no overlay) */}
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            {/* Button */}
            <Button
              onClick={handleResetPassword}
              disabled={!isFormValid}
              className="w-full py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#4A3AFF" }}
            >
              {isLoading ? "Sending OTP..." : "Reset My Password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
