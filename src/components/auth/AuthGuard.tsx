"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth/getUser";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const user = getStoredUser();

    if (!user) {
      router.replace("/auth/login");
    } else {
      setIsChecking(false);
    }
  }, [router]);

if (isChecking) {
  return <div>Loading...</div>;
}

  return <>{children}</>;
}