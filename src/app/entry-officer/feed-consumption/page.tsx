"use client";

import AbnormalFeeding from "@/components/feed-consumption/AbnormalFeeding";
import DailyFeedHeader from "@/components/feed-consumption/DailyFeedHeader";
import FeedActions from "@/components/feed-consumption/FeedActions";
import FeedConsumptionTable from "@/components/feed-consumption/FeedConsumptionTable";
import FeedQualityCheck from "@/components/feed-consumption/FeedQualityCheck";
import WaterConsumption from "@/components/feed-consumption/WaterConsumption";

// import DailyFeedHeader from "@/components/feed/DailyFeedHeader";
// import FeedConsumptionTable from "@/components/feed/FeedConsumptionTable";
// import FeedQualityCheck from "@/components/feed/FeedQualityCheck";
// import WaterConsumption from "@/components/feed/WaterConsumption";
// import AbnormalFeeding from "@/components/feed/AbnormalFeeding";
// import FeedActions from "@/components/feed/FeedActions";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <DailyFeedHeader/>

      <FeedConsumptionTable/>

     <FeedQualityCheck/>

      <WaterConsumption/>

      <AbnormalFeeding/>

     <FeedActions/>
     </div>
  );
}