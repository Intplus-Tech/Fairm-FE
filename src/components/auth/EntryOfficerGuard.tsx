"use client";

import { getUser } from "@/lib/auth/getUser";
import { redirect } from "next/navigation";

export default function EntryOfficerGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== "entry-officer") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}