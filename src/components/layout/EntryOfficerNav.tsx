"use client";

import { ChevronDown, User } from "lucide-react";
import Logo from "@/components/brand/logo";
import Word from "@/components/brand/word";
import { getStoredUser } from "@/lib/auth/getUser";
// import { getUser } from "@/lib/auth/getUser";

export default function EntryOfficerNav() {
  const user = getStoredUser();

  const fullName = user?.fullName || "User";

  return (
    <nav className="w-full h-[72px] bg-[#F5F5F7] border-b border-gray-200 flex items-center justify-between px-6">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <Logo className="h-[23px] w-[23px]" />
        <Word className="h-[32px] w-[85px]" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* USER NAME */}
        <span className="text-[15px] font-medium text-gray-800">
          {fullName}
        </span>

        {/* AVATAR + DROPDOWN */}
        <div className="flex items-center gap-2 cursor-pointer">

          <div className="w-9 h-9 rounded-full bg-[#E9E9EF] flex items-center justify-center">
            <User size={18} className="text-gray-700" />
          </div>

          <ChevronDown size={18} className="text-gray-600" />

        </div>
      </div>
    </nav>
  );
}