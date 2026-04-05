"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  User,
  LogOut,
  Home,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/brand/logo";
import Word from "@/components/brand/word";
import { getStoredUser, clearUser } from "@/lib/auth/getUser";

interface StoredUser {
  id: string;
  email: string;
  role: string;
  fullName: string;
  avatarUrl?: string;
}

export default function EntryOfficerNav({
  setSidebarOpen,
}: {
  setSidebarOpen: (value: boolean) => void;
}) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const loadUser = () => {
    const storedUser = getStoredUser();
    setUser(storedUser);
  };

  useEffect(() => {
    loadUser();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "fairm_user") {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const fullName =
    user?.fullName && user.fullName !== "undefined"
      ? user.fullName
      : "User";

  const handleLogout = () => {
    clearUser();
    router.push("/auth/login");
  };

  const handleHome = () => {
    router.push("/dashboard");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full h-[72px] bg-[#F5F5F7] border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu */}
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>

        <Logo className="h-[23px] w-[23px]" />
        <Word className="h-[32px] w-[85px]" />

        <button
          onClick={handleHome}
          className="hidden sm:flex items-center gap-1 ml-4 text-gray-700 hover:text-gray-900"
        >
          <Home size={18} /> Home
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4 relative">

        <span className="text-[13px] sm:text-[15px] font-medium text-gray-800 truncate max-w-[120px] sm:max-w-none">
          {fullName}
        </span>

        <div className="relative">
          <div
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E9E9EF] flex items-center justify-center overflow-hidden">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={18} />
              )}
            </div>

            <ChevronDown size={18} />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded border z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
}