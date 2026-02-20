"use client";

import { Suspense } from "react";
import InviteRegisterForm from "@/components/configuration/user-roles/InviteRegisterForm";

export default function InviteRegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] px-4">
        <InviteRegisterForm />
      </div>
    </Suspense>
  );
}