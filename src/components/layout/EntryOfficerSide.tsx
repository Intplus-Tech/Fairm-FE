"use client";

import Link from "next/link";
import { useEntryFlow } from "../../../context/entry-flow-context";
import { X } from "lucide-react";

export default function EntryOfficerSide({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) {
  const { flow } = useEntryFlow();

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:static
        top-[72px]
        left-0
        h-[calc(100vh-72px)]
        w-[260px]
        bg-white
        border-r
        p-4
        space-y-3
        z-50
        transform
        transition-transform
        duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <div className="flex justify-end md:hidden mb-2">
          <button onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <SidebarItem
          title="Daily Mortality & Health Entry"
          href="/entry-officer/mortality"
          enabled={true}
        />

        <SidebarItem
          title="Daily Feed Consumption"
          href="/entry-officer/feed-consumption"
          enabled={flow.mortality}
        />

        <SidebarItem
          title="Daily Egg Production"
          href="/entry-officer/egg-production"
          enabled={flow.feed}
        />

        <SidebarItem
          title="Farm Gate Sales Entry"
          href="/entry-officer/farm-gate-sales"
          enabled={flow.egg}
        />

        <SidebarItem
          title="Bulk Transfer to Lagos"
          href="/entry-officer/lagos-transfer"
          enabled={flow.farm}
        />

        <SidebarItem
          title="Daily Medication & Treatment"
          href="/entry-officer/medication"
          enabled={flow.lagos}
        />

        <SidebarItem
          title="Daily Duty Roaster"
          href="/entry-officer/duty-roaster"
          enabled={flow.medication}
        />
      </aside>
    </>
  );
}

function SidebarItem({
  title,
  href,
  enabled,
}: {
  title: string;
  href: string;
  enabled: boolean;
}) {
  return (
    <Link
      href={enabled ? href : "#"}
      className={`block p-3 rounded-md text-sm transition ${
        enabled
          ? "hover:bg-gray-100 text-black"
          : "text-gray-400 cursor-not-allowed"
      }`}
    >
      {title}
    </Link>
  );
}