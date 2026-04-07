"use client";

import Image from "next/image";
import SignupSidebar from "./signup-sidebar";

export default function SignupLayout({
  children,
  step,
}: {
  children: React.ReactNode;
  step: number;
}) {
  return (
    <div className="min-h-screen flex bg-[#F7F7FB]">
      <SignupSidebar step={step} />

      <div className="flex-1 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}