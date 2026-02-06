"use client";

import { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/brand/logo";
import Word from "@/components/brand/word";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-6">
        <Logo className="h-[23px] w-[23px]" />
        <Word className="h-[34px] w-[80px]" />
      </div>

      {/* Card */}
      <Card
        className="
          w-full
          max-w-lg
          md:max-w-xl
          bg-transparent
          backdrop-blur-lg
        "
      >
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-2xl text-start font-semibold">
            Login to Your FAIRM Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 md:px-8 pb-8 space-y-4">
          {/* Form block (moved slightly up) */}
          <div className="space-y-6">
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

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-white pr-10"
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

            {/* Remember + Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-[#4A3AFF]"
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember
                </Label>
              </div>

              <Link
                href="/auth/forgot-password"
                className="text-sm text-gray-600 hover:text-[#4A3AFF] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login button → Dashboard */}
          <Link href="/dashboard" className="block">
            <Button
              className="w-full py-3 text-white"
              style={{ backgroundColor: "#4A3AFF" }}
            >
              Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
