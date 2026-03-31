"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  Menu,
  User,
  LogOut,
  Plus,
  ChevronDown,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useLayout } from "../../../context/layout-context";
import Logo from "@/components/brand/logo";
import Word from "../brand/word";

import { Flock } from "@/types/flock.types";
import { flockService } from "../../../services/flock.service";

export default function AdminNavbar() {
  const { dispatch } = useLayout();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFarmDropdownOpen, setIsFarmDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [selectedFarm, setSelectedFarm] = useState("Abuja farm");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const farmDropdownRef = useRef<HTMLDivElement>(null);

  // FIX: Separate refs
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Flock[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const farms = ["Abuja farm", "Lagos farm", "Ibadan farm"];

  // Close dropdowns
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

      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }

      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search (UNCHANGED)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);

      try {
        const res = await flockService.searchFlocks(searchQuery, 1, 5);
        setSearchResults(res?.data || []);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleLogout = () => {
    setIsLoggingOut(true);
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
    <>
      {/* MOBILE SEARCH */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 md:hidden">
          <div ref={mobileSearchRef} className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />

            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Flocks , Pen or Inventory"
              className="w-full h-[44px] pl-12 pr-10 rounded-xl bg-[#EFEFEF] outline-none"
            />

            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={18} />
            </button>

            {(isSearching || searchQuery) && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow z-50 max-h-60 overflow-auto">
                {isSearching && (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Searching...
                  </div>
                )}

                {!isSearching && searchResults.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No items found
                  </div>
                )}

                {!isSearching &&
                  searchResults.map((flock) => (
                    <div
                      key={flock._id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                        setIsMobileSearchOpen(false);
                      }}
                    >
                      {flock.name} - {flock.birdType} ({flock.noOfBirds})
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      <header className="h-[72px] bg-white border-b flex items-center px-4 md:px-6 justify-between gap-3">
        
        {/* LEFT */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 shrink-0"
            onClick={() => dispatch({ type: "TOGGLE" })}
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-4 shrink-0">
            <Logo className="h-[24px] w-[24px]" />
            <Word className="h-[34px] w-[80px]" />
          </div>
        </div>

        {/* DESKTOP SEARCH */}
        <div
          className="hidden md:flex flex-1 max-w-[290px]"
          ref={desktopSearchRef}
        >
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Flocks , Pen or Inventory"
              className="w-full h-[44px] pl-12 pr-4 rounded-xl bg-[#EFEFEF]"
            />

            {(isSearching || searchQuery) && (
              <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow z-50 max-h-60 overflow-auto">
                {isSearching && (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Searching...
                  </div>
                )}

                {!isSearching && searchResults.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No items found
                  </div>
                )}

                {!isSearching &&
                  searchResults.map((flock) => (
                    <div
                      key={flock._id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {flock.name} - {flock.birdType} ({flock.noOfBirds})
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 shrink-0"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <Search size={20} />
          </button>

          <button className="relative p-2 rounded-full bg-[#F1F0FB] shrink-0">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="hidden sm:block shrink-0">
            <button
              onClick={handleAddNewPen}
              className="bg-[#4A3AFF] flex items-center px-4 py-2 rounded-lg text-white gap-2"
            >
              <Plus className="h-[12px] w-[12px]" />
              <span className="text-sm whitespace-nowrap">
                Add New Pen
              </span>
            </button>
          </div>

          <div
            className="relative hidden sm:flex shrink-0"
            ref={farmDropdownRef}
          >
            <button
              onClick={() =>
                setIsFarmDropdownOpen(!isFarmDropdownOpen)
              }
              className="border rounded-lg w-32 px-4 py-2 flex justify-between"
            >
              <span className="text-[13px] truncate">
                {selectedFarm}
              </span>
              <ChevronDown />
            </button>
          </div>

          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() =>
                setIsDropdownOpen(!isDropdownOpen)
              }
              className="flex items-center gap-2 p-2 rounded-full"
            >
              <div className="h-8 w-8 rounded-full bg-[#F1F0FB] flex items-center justify-center">
                <User />
              </div>

              <ChevronDown />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow border">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2"
                >
                  <LogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}