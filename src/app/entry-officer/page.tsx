"use client";

import { Card } from "@/components/ui/card";
import {
  ClipboardList,
  Activity,
  AlertTriangle,
  Feather,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function EntryOfficerHome() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#1C155F]">
          Entry Officer Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Manage daily farm records, mortality logs, and bird activities.
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Mortality */}
        <Card
          onClick={() => router.push("/entry-officer/mortality")}
          className="p-4 cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" />
            <div>
              <p className="font-semibold text-sm">Log Mortality</p>
              <p className="text-xs text-gray-500">
                Record bird deaths
              </p>
            </div>
          </div>
        </Card>

        {/* Feed */}
        <Card
          onClick={() => router.push("/entry-officer/feed")}
          className="p-4 cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <Feather className="text-yellow-500" />
            <div>
              <p className="font-semibold text-sm">Feed Entry</p>
              <p className="text-xs text-gray-500">
                Record feed usage
              </p>
            </div>
          </div>
        </Card>

        {/* Daily Report */}
        <Card
          onClick={() => router.push("/entry-officer/report")}
          className="p-4 cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <ClipboardList className="text-blue-500" />
            <div>
              <p className="font-semibold text-sm">Daily Report</p>
              <p className="text-xs text-gray-500">
                Submit daily data
              </p>
            </div>
          </div>
        </Card>

        {/* Activity */}
        <Card
          onClick={() => router.push("/entry-officer/activity")}
          className="p-4 cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <Activity className="text-green-500" />
            <div>
              <p className="font-semibold text-sm">Activity Logs</p>
              <p className="text-xs text-gray-500">
                View recent actions
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* SUMMARY SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Today’s Mortality</p>
          <p className="text-xl font-bold text-red-500">0</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Feed Used (kg)</p>
          <p className="text-xl font-bold text-yellow-600">0</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Active Birds</p>
          <p className="text-xl font-bold text-green-600">0</p>
        </Card>
      </div>

      {/* INFO SECTION */}
      <Card className="p-5">
        <h3 className="font-semibold text-[#1C155F] mb-2">
          Instructions
        </h3>
        <p className="text-sm text-gray-500">
          Use the quick actions above to log daily farm activities.
          Ensure all entries are submitted before the end of the day
          for accurate reporting.
        </p>
      </Card>
    </div>
  );
}