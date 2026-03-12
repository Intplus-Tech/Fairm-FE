"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AcceptInviteClient() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const email = params.get("email");
    const role = params.get("role");
    const name = params.get("name");

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    router.replace(
      `/auth/register-invite?token=${token}&email=${email}&role=${role}&name=${name}`
    );
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Verifying invitation...
      </p>
    </div>
  );
}