"use client";

import { useState } from "react";
import ThresholdSettings from "./ThresholdSettings";
import clsx from "clsx";
import UserRoles from "./UserRoles";
import SecuritySettings from "./SecuritySettings";

type Tab = "threshold" | "roles" | "security";

export default function ConfigurationTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("threshold");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="inline-flex rounded-lg border bg-muted p-1">
        <button
          onClick={() => setActiveTab("threshold")}
          className={clsx(
            "px-4 py-2 text-sm rounded-md transition",
            activeTab === "threshold"
              ? "bg-white shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Threshold Settings
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={clsx(
            "px-4 py-2 text-sm rounded-md transition",
            activeTab === "roles"
              ? "bg-white shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          User Roles and Access
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={clsx(
            "px-4 py-2 text-sm rounded-md transition",
            activeTab === "security"
              ? "bg-white shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Security Settings
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "threshold" && <ThresholdSettings />}
        {activeTab === "roles" && <UserRoles />}
        {activeTab === "security" && <SecuritySettings />}
      </div>
    </div>
  );
}
