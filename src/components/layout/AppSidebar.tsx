"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  User,
  Wallet,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useLayout } from "../../../context/layout-context";
import { useEffect, useState } from "react";

import { getStoredUser } from "@/lib/auth/getUser";
import { isAdmin } from "@/lib/auth/role";
// import { isAdmin } from "@/lib/auth/roles";

const ACTIVE_COLOR = "#4A3AFF";

const menu = [
  { label: "Inventory & Stocks", icon: User, href: "/inventory" },
  { label: "Employee Management", icon: Wallet, href: "/employee" },
  { label: "Configuration", icon: Settings, href: "/configuration" },
];

const birdSubMenu = [
  { label: "Broilers", href: "/bird/broilers" },
  { label: "Pullets", href: "/bird/pullets" },
  { label: "Layers", href: "/bird/layers" },
  { label: "Historical Archives", href: "/bird/archives" },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, dispatch } = useLayout();

  const [userRole, setUserRole] = useState<string | undefined>();
  const [birdOpen, setBirdOpen] = useState(false);

  const isBirdRoute = pathname.startsWith("/bird");

  useEffect(() => {
    const user = getStoredUser();
    setUserRole(user?.role);
  }, []);

  const isAdminUser = isAdmin(userRole);

  useEffect(() => {
    setBirdOpen(isBirdRoute);
  }, [isBirdRoute]);

  useEffect(() => {
    const stored = localStorage.getItem("sidebarOpen");
    if (stored === "true") {
      dispatch({ type: "TOGGLE" });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", String(state.sidebarOpen));
  }, [state.sidebarOpen]);

  return (
    <>
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => dispatch({ type: "CLOSE" })}
        />
      )}

      <aside
        className={`
          fixed md:static
          top-[72px]
          z-50
          w-[260px]
          h-[calc(100vh-72px)]
          bg-white
          px-4 py-6
          border-r
          transition-transform duration-300
          ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        <nav className="flex-1 overflow-y-auto space-y-1">

          {/* DASHBOARD */}
          <Link
            href="/dashboard"
            onClick={() => dispatch({ type: "CLOSE" })}
            className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-600"
            style={{
              color: pathname === "/dashboard" ? ACTIVE_COLOR : undefined,
            }}
          >
            <Home size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          {/* BIRD MANAGEMENT */}
          <button
            onClick={() => setBirdOpen((prev) => !prev)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-gray-600"
            style={{ color: birdOpen ? ACTIVE_COLOR : undefined }}
          >
            <Users size={18} />
            <span className="flex-1 text-sm font-medium">
              Bird Management
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                birdOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {birdOpen && (
            <div className="ml-8 space-y-1">
              {birdSubMenu.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => dispatch({ type: "CLOSE" })}
                    className="block px-3 py-2 text-sm text-gray-600"
                    style={{
                      color: isActive ? ACTIVE_COLOR : undefined,
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* MAIN MENU */}
          {menu.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => dispatch({ type: "CLOSE" })}
                className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-600"
                style={{
                  color: isActive ? ACTIVE_COLOR : undefined,
                }}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* ADMIN ONLY ENTRY OFFICER PAGE */}
          {isAdminUser && (
            <button
              onClick={() => {
                dispatch({ type: "CLOSE" });
                router.push("/entry-officer");
              }}
              className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-600 w-full text-left"
              style={{
                color:
                  pathname === "/entry-officer"
                    ? ACTIVE_COLOR
                    : undefined,
              }}
            >
              <User size={18} />
              <span className="text-sm font-medium">
                Entry Officer
              </span>
            </button>
          )}
        </nav>
      </aside>
    </>
  );
}