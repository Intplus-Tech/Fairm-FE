"use client";


import { getStoredUser } from "@/lib/auth/getUser";
import { redirect } from "next/navigation";

export default function EntryOfficerGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getStoredUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== "staff" && user.role !== "super_admin") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}