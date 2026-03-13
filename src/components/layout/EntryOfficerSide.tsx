"use client";

import Link from "next/link";
import { useEntryFlow } from "../../../context/entry-flow-context";


export default function EntryOfficerSide() {
  const { flow } = useEntryFlow();

  return (
    <div className="w-[260px] border-r bg-white h-full p-4 space-y-3">

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
    </div>
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
      className={`block p-3 rounded-md text-sm ${
        enabled
          ? "hover:bg-gray-100 text-black"
          : "text-gray-400 cursor-not-allowed"
      }`}
    >
      {title}
    </Link>
  );
}