"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function OTPVerification() {
  const router = useRouter();
  const CODE_LENGTH = 6;
  const [otp, setOtp] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) {
      setOtp((prev) => {
        const copy = [...prev];
        copy[idx] = "";
        return copy;
      });
      return;
    }

    const valueArray = value.split("").slice(0, CODE_LENGTH - idx);
    setOtp((prev) => {
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

  const isFormValid = otp.every((digit) => digit !== "");

  const handleVerify = () => {
    if (!isFormValid) {
      alert("Please enter the full 6-digit code.");
      return;
    }
    router.push("/auth/new-password");
  };

  const message = "Didn't";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4">
      <div className="relative w-full max-w-lg md:max-w-xl">
        {/* Back arrow */}
        <Link
          href="/auth/forgot-password"
          className="absolute -top-10 left-2 flex items-center gap-2 text-gray-700 hover:text-[#4A3AFF] transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <Card className="w-full bg-transparent backdrop-blur-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl text-start font-semibold">
              Enter OTP Sent To Your Email
            </CardTitle>
          </CardHeader>

          <CardContent className="px-6 md:px-8 pb-10 space-y-6">
            {/* OTP Input */}
            <div className="space-y-1">
              <Label htmlFor="otp">6-Digit Code</Label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}
                    className="w-12 h-12 text-center border rounded-lg bg-white focus:ring-2 focus:ring-[#4A3AFF] text-lg"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              disabled={!isFormValid}
              className="w-full py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#4A3AFF" }}
            >
              Verify OTP
            </Button>

            {/* Resend */}
            <div>
              <p className="text-sm text-gray-600 mt-2 flex justify-center gap-4">
                {message} receive OTP?{" "}
                <Link
                  href="/auth/forgot-password"
                  className="text-[#4A3AFF] hover:underline"
                >
                  Resend OTP <span className="text-black/50">(0sec)</span>
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
``
