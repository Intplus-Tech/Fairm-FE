"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { authService } from "../../../../services/auth.service";
// import { authService } from "@/services/auth.service";

export default function OTPVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const CODE_LENGTH = 6;
  const [otp, setOtp] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) {
      setOtp(prev => {
        const copy = [...prev];
        copy[idx] = "";
        return copy;
      });
      return;
    }

    const valueArray = value.split("").slice(0, CODE_LENGTH - idx);
    setOtp(prev => {
      const copy = [...prev];
      valueArray.forEach((v, i) => {
        copy[idx + i] = v;
      });
      return copy;
    });

    const nextIdx = idx + valueArray.length;
    if (nextIdx < CODE_LENGTH) {
      inputsRef.current[nextIdx]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const isFormValid = otp.every(digit => digit !== "");

  const handleVerify = async () => {
    if (!email) {
      alert("Email not found. Please restart password reset.");
      return;
    }

    if (!isFormValid) {
      alert("Please enter the full 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      const otpCode = otp.join("");

      await authService.verifyOtp({
        email,
        otp: otpCode,
      });

      router.push(`/auth/new-password?email=${encodeURIComponent(email)}`);
    } catch (error: unknown) {
      let message = "Invalid or expired OTP. Please try again.";
      if (error instanceof Error) {
        message = error.message || message;
      } else if (typeof error === "object" && error !== null) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      }
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4">
      <div className="relative w-full max-w-lg md:max-w-xl">
        <Link
          href="/auth/forgot-password"
          className="absolute -top-10 left-2 flex items-center gap-2 text-gray-700 hover:text-[#4A3AFF]"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <Card className="w-full bg-transparent backdrop-blur-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-semibold">
              Enter OTP Sent To Your Email
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-1">
              <Label>6-Digit Code</Label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(e, idx)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}

                    className="w-12 h-12 text-center border rounded-lg bg-white focus:ring-2 focus:ring-[#4A3AFF] text-lg"
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleVerify}
              disabled={!isFormValid || loading}
              className="w-full py-3"
              style={{ backgroundColor: "#4A3AFF" }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <p className="text-sm text-center text-gray-600">
              Didn&apos;t receive OTP?{" "}
              <Link
                href="/auth/forgot-password"
                className="text-[#4A3AFF] hover:underline"
              >
                Resend OTP
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
