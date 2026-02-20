"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AcceptInviteClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    router.replace(
      `/auth/register-invite?token=${encodeURIComponent(token)}&email=${encodeURIComponent(
        email ?? ""
      )}&name=${encodeURIComponent(name ?? "")}`
    );
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Verifying invitation...
      </p>
    </div>
  );
}