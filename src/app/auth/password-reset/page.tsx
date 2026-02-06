"use client";

import Link from "next/link";
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

export default function ForgotPassword() {

  const message = "Didn't"
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4">

      {/* Wrapper to anchor arrow to card */}
      <div className="relative w-full max-w-lg md:max-w-xl">

        {/* Back arrow — aligned with card */}
        <Link
          href="/auth/login"
          className="absolute -top-10 left-2 flex items-center gap-2 text-gray-700 hover:text-[#4A3AFF] transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <Card
          className="
            w-full
           bg-transparent
          backdrop-blur-lg
          "
        >
          {/* Header */}
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl text-start font-semibold">
              Enter OTP Sent To Your Email
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
              />
            </div>

            {/* Button */}
            <Link href="/auth/new-password" className="block pt-2">
              <Button
                className="w-full py-3 text-white"
                style={{ backgroundColor: "#4A3AFF" }}
              >
                Verify OTP
              </Button>
            </Link>
            <div>
              <p className="text-sm text-gray-600 mt-2 flex justify-center gap-4">{message} receive OTP? <Link href="/auth/forgot-password" className="text-[#4A3AFF] hover:underline">Resend OTP <span className="text-black/50">(0sec)</span> </Link></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
