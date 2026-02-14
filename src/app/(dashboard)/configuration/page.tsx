"use client";


import { useState } from "react";
import ThresholdModal from "@/components/configuration/ThresholdModal";
import ConfigurationTabs from "@/components/configuration/ConfigurationTabs";



export default function ConfigurationPage() {
  const [open, setOpen] = useState(false);

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-xl font-semibold">Configuration</h1>
        <p className="text-sm text-muted-foreground">  Manage alert thresholds, user permissions, and security settings for your farm management system.
        </p>
      </header>

      {/* Tabs */}
      <ConfigurationTabs/>

      {/* Info Cards */}
     
      {open && <ThresholdModal onClose={() => setOpen(false)} />}
    </section>
  );
}