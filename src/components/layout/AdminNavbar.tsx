"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, User, LogOut, Plus, ChevronDown } from "lucide-react";

import { useLayout } from "../../../context/layout-context";
import Logo from "@/components/brand/logo";
import Word from "../brand/word";

export default function AdminNavbar() {
  const { dispatch } = useLayout();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
  };

  return (
    <header className="h-[72px] bg-white border-b flex items-center px-4 md:px-6 justify-between gap-3">
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors shrink-0"
          onClick={() => dispatch({ type: "TOGGLE" })}
          aria-label="Toggle sidebar menu"
        >
          <Menu size={22} />
        </button>

        <div className="relative flex items-center gap-4 left-10 min-w-0">
          <Logo className="h-[24px] w-[24px] shrink-0" />
          <Word className="h-[34px] w-[80px] shrink-0" />
        </div>
      </div>

      {/* SEARCH (desktop only) */}
      <div className="hidden md:flex flex-1 px-4 max-w-[290px]">
        <div className="relative w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            placeholder="Search for Flocks , Pen or Inventory"
            className="w-full h-[44px] pl-12 pr-4 rounded-xl bg-[#EFEFEF] outline-none transition-all focus:ring-2 focus:ring-primary/50"
            aria-label="Search"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Mobile search */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Add New Pen */}
        <div className="hidden sm:block">
          <button className="bg-[#4A3AFF] flex items-center px-3 py-1 rounded-lg text-white gap-2 whitespace-nowrap">
            <Plus className="h-[12px] w-[12px]" />
            <span className="text-sm">Add New Pen</span>
          </button>
        </div>

        {/* Farm selector */}
        <div className="hidden sm:flex border-gray-500 border rounded-lg w-32 items-center justify-between px-2 py-1">
          <span className="text-[13px] truncate">Abuja farm</span>
          <ChevronDown className="w-4 h-4 shrink-0" />
        </div>

        {/* User Dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="User menu"
            aria-expanded={isDropdownOpen}
          >
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <ChevronDown />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
