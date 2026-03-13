"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import CollectionIssues from "@/components/egg-production/CollectionIssues";
import EggCollectionTable from "@/components/egg-production/EggCollectionTable";
import PageNavigation from "@/components/egg-production/PageNavigation";
import PhotosEvidence from "@/components/egg-production/PhotosEvidence";
import { useEntryFlow } from "../../../../context/entry-flow-context";

export default function EggProductionPage() {
  const { setFlow } = useEntryFlow();
  const router = useRouter();

  const handleNext = () => {
    setFlow((prev: any) => ({
      ...prev,
      egg: true,
    }));

    router.push("/entry-officer/farm-gate-sales");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <header className="mb-6 bg-purple-600 text-white p-4 rounded-md">
        <h1 className="text-xl font-bold">Daily Egg Production</h1>
        <p className="text-sm">Sunday, February 1, 2026</p>
      </header>

      <section className="mb-6">
        <EggCollectionTable />
      </section>

      <section>
        <CollectionIssues />
        <PhotosEvidence />
        <PageNavigation />
      </section>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Next: Farm Gate Sales →
        </button>
      </div>

    </div>
  );
}