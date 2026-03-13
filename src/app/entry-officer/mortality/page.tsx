"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import MortalityHeader from "@/components/mortality/mortality-header";
import PenDataTable from "@/components/mortality/pen-data-table";
import SickBirdObservation from "@/components/mortality/sick-bird-observation";
import PhotoEvidence from "@/components/mortality/photo-evidence";
import { useEntryFlow } from "../../../../context/entry-flow-context";

export default function MortalityPage() {
  const { setFlow } = useEntryFlow();
  const router = useRouter();

  const handleNext = () => {
    setFlow((prev: any) => ({
      ...prev,
      mortality: true,
    }));

    router.push("/entry-officer/feed-consumption");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <MortalityHeader />

      <div className="bg-white rounded-xl shadow p-6">
        <PenDataTable />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <SickBirdObservation />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <PhotoEvidence />
      </div>

      <div className="flex justify-end gap-4">
        <button className="border border-indigo-500 text-indigo-600 px-6 py-2 rounded-lg">
          Save Flock Health Data
        </button>

        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Next: Feed Consumption →
        </button>
      </div>
    </div>
  );
}