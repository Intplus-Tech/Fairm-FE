"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import AskFairmAIButton from "../dashboard/AskFairmAIButton";


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
  const { state, dispatch } = useLayout();

  // keep open if inside /bird/*
  const isBirdRoute = pathname.startsWith("/bird");

  const [birdOpen, setBirdOpen] = useState(isBirdRoute);

  /* -------------------------------------------
     AUTO OPEN / CLOSE BIRD DROPDOWN ON ROUTE
  -------------------------------------------- */
  useEffect(() => {
    setBirdOpen(isBirdRoute);
  }, [isBirdRoute]);

  /* -------------------------------------------
     SIDEBAR STATE PERSISTENCE
  -------------------------------------------- */
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
      {/* MOBILE OVERLAY */}
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
        {/* SCROLLABLE MENU */}
        <nav
          className="flex-1 overflow-y-auto scrollbar-hide space-y-1"
          role="navigation"
          aria-label="Sidebar navigation"
        >
          {/* DASHBOARD */}
          <Link
            href="/dashboard"
            onClick={() => dispatch({ type: "CLOSE" })}
            className="relative flex items-center gap-3 px-3 py-3 rounded-md transition-colors text-gray-600"
            style={{
              color: pathname === "/dashboard" ? ACTIVE_COLOR : undefined,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = ACTIVE_COLOR)
            }
            onMouseLeave={(e) =>
              pathname !== "/dashboard" &&
              (e.currentTarget.style.color = "")
            }
          >
            {pathname === "/dashboard" && (
              <span
                className="absolute left-0 h-full w-[3px] rounded-r"
                style={{ backgroundColor: ACTIVE_COLOR }}
              />
            )}
            <Home size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          {/* BIRD MANAGEMENT */}
          <button
            type="button"
            aria-expanded={birdOpen}
            aria-controls="bird-submenu"
            onClick={() => setBirdOpen((p) => !p)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setBirdOpen((p) => !p);
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-gray-600 transition-colors"
            style={{ color: birdOpen ? ACTIVE_COLOR : undefined }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = ACTIVE_COLOR)
            }
            onMouseLeave={(e) =>
              !birdOpen && (e.currentTarget.style.color = "")
            }
          >
            <Users size={18} />
            <span className="flex-1 text-sm font-medium">
              Bird Management
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${birdOpen ? "rotate-180" : ""}`}
            />
          </button>

          {birdOpen && (
            <div
              id="bird-submenu"
              role="menu"
              className="ml-8 space-y-1"
            >
              {birdSubMenu.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => dispatch({ type: "CLOSE" })}
                    className="block px-3 py-2 rounded-md text-sm transition-colors text-gray-600"
                    style={{
                      color: isActive ? ACTIVE_COLOR : undefined,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = ACTIVE_COLOR)
                    }
                    onMouseLeave={(e) =>
                      !isActive && (e.currentTarget.style.color = "")
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* OTHER MENU ITEMS */}
          {menu.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => dispatch({ type: "CLOSE" })}
                className="relative flex items-center gap-3 px-3 py-3 rounded-md transition-colors text-gray-600"
                style={{
                  color: isActive ? ACTIVE_COLOR : undefined,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = ACTIVE_COLOR)
                }
                onMouseLeave={(e) =>
                  !isActive && (e.currentTarget.style.color = "")
                }
              >
                {isActive && (
                  <span
                    className="absolute left-0 h-full w-[3px] rounded-r"
                    style={{ backgroundColor: ACTIVE_COLOR }}
                  />
                )}
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* AI BUTTON */}
        <div className="pt-4">
         <AskFairmAIButton/>
        </div>
      </aside>
    </>
  );
}
