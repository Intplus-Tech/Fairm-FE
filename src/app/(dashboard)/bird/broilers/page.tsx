"use client";

import { useState } from "react";
import BroilerReport from "@/components/birds/broiler/BirdReport";
import TopBroiler from "@/components/birds/broiler/TopBroiler";

export default function BirdsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <TopBroiler />

      <BroilerReport
        search={search}
        onSearch={setSearch}
      />
    </div>
  );
}
