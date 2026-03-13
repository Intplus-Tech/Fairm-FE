"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import AbnormalFeeding from "@/components/feed-consumption/AbnormalFeeding";
import DailyFeedHeader from "@/components/feed-consumption/DailyFeedHeader";
import FeedActions from "@/components/feed-consumption/FeedActions";
import FeedConsumptionTable from "@/components/feed-consumption/FeedConsumptionTable";
import FeedQualityCheck from "@/components/feed-consumption/FeedQualityCheck";
import WaterConsumption from "@/components/feed-consumption/WaterConsumption";
import { useEntryFlow } from "../../../../context/entry-flow-context";

export default function FeedConsumptionPage() {
  const { setFlow } = useEntryFlow();
  const router = useRouter();

  const handleNext = () => {
    setFlow((prev: any) => ({
      ...prev,
      feed: true,
    }));

    router.push("/entry-officer/egg-production");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <DailyFeedHeader />

      <FeedConsumptionTable />

      <FeedQualityCheck />

      <WaterConsumption />

      <AbnormalFeeding />

      <FeedActions />

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Next: Egg Production →
        </button>
      </div>
    </div>
  );
}