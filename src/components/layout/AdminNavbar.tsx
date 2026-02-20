"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, User, LogOut, Plus, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { useLayout } from "../../../context/layout-context";
import Logo from "@/components/brand/logo";
import Word from "../brand/word";

export default function AdminNavbar() {
  const { dispatch } = useLayout();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFarmDropdownOpen, setIsFarmDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [selectedFarm, setSelectedFarm] = useState("Abuja farm");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const farmDropdownRef = useRef<HTMLDivElement>(null);

  // Mock farms (until endpoint is ready)
  const farms = ["Abuja farm", "Lagos farm", "Ibadan farm"];

  

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        farmDropdownRef.current &&
        !farmDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFarmDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);

    // simulate logout cleanup
    setTimeout(() => {
      router.push("/auth/login");
    }, 500);
  };

  const handleAddNewPen = () => {
    window.dispatchEvent(new CustomEvent("open-add-pen-modal"));
  };


  const handleFarmSelect = (farm: string) => {
    setSelectedFarm(farm);
    setIsFarmDropdownOpen(false);
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

      {/* SEARCH */}
      <div className="hidden md:flex flex-1 px-4 max-w-[290px]">
        <div className="relative w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            placeholder="Search for Flocks , Pen or Inventory"
            className="w-full h-[44px] pl-12 pr-4 rounded-xl bg-[#EFEFEF] outline-none transition-all focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
          <Search size={20} />
        </button>

        <button className="relative p-2 rounded-full bg-[#F1F0FB] hover:bg-gray-100">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Add New Pen */}
        <div className="hidden sm:block">
          <button
            onClick={handleAddNewPen}
            className="bg-[#4A3AFF] flex items-center px-4 py-2 rounded-lg text-white gap-2 whitespace-nowrap"
          >
            <Plus className="h-[12px] w-[12px]" />
            <span className="text-sm">Add New Pen</span>
          </button>
        </div>

        {/* Farm selector */}
        <div className="relative hidden sm:flex" ref={farmDropdownRef}>
          <button
            onClick={() => setIsFarmDropdownOpen(!isFarmDropdownOpen)}
            className="border-[#D9DBE9] border rounded-lg w-32 items-center justify-between px-4 py-2 flex"
          >
            <span className="text-[13px] truncate">{selectedFarm}</span>
            <ChevronDown className="w-4 h-4 shrink-0" />
          </button>

          {isFarmDropdownOpen && (
            <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow z-50">
              {farms.map((farm) => (
                <button
                  key={farm}
                  onClick={() => handleFarmSelect(farm)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                >
                  {farm}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 bg-[#FFFFFF] rounded-full hover:bg-gray-100"
          >
            <div className="h-8 w-8 rounded-full bg-[#F1F0FB] flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <ChevronDown />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
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
