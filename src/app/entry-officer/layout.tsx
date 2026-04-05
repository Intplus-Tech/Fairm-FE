"use client";

import { useState } from "react";
import EntryOfficerNav from "@/components/layout/EntryOfficerNav";
import EntryOfficerSide from "@/components/layout/EntryOfficerSide";
import EntryOfficerGuard from "@/components/auth/EntryOfficerGuard";
import { EntryFlowProvider } from "../../../context/entry-flow-context";

export default function EntryOfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <EntryOfficerGuard>
      <EntryFlowProvider>
        <div className="min-h-screen bg-[#F5F5F7]">

          {/* NAVBAR */}
          <EntryOfficerNav setSidebarOpen={setSidebarOpen} />

          <div className="flex pt-[72px]">

            {/* SIDEBAR */}
            <EntryOfficerSide
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            {/* CONTENT */}
            <main className="flex-1 w-full p-4 sm:p-6 overflow-x-hidden">
              {children}
            </main>

          </div>
        </div>
      </EntryFlowProvider>
    </EntryOfficerGuard>
  );
}