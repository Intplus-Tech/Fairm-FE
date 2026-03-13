"use client";

import AbnormalFeeding from "@/components/feed-consumption/AbnormalFeeding";
import DailyFeedHeader from "@/components/feed-consumption/DailyFeedHeader";
import FeedActions from "@/components/feed-consumption/FeedActions";
import FeedConsumptionTable from "@/components/feed-consumption/FeedConsumptionTable";
import FeedQualityCheck from "@/components/feed-consumption/FeedQualityCheck";
import WaterConsumption from "@/components/feed-consumption/WaterConsumption";
import { feedConsumptionService } from "../../../../services/feed-consumption.service";
import { AbnormalFeedingType, AppearanceType, FeedConsumptionRequest, InsectPestType, SmellType } from "@/types/feed-consumption";
import { useMemo, useState } from "react";

// import DailyFeedHeader from "@/components/feed/DailyFeedHeader";
// import FeedConsumptionTable from "@/components/feed/FeedConsumptionTable";
// import FeedQualityCheck from "@/components/feed/FeedQualityCheck";
// import WaterConsumption from "@/components/feed/WaterConsumption";
// import AbnormalFeeding from "@/components/feed/AbnormalFeeding";
// import FeedActions from "@/components/feed/FeedActions";

type FeedRow = {
  pen: string;
  feed: string;
  opening: number | "";
  fed: number | "";
  closing: number | "";
};

export default function Page() {
    const [time, setTime] = useState("08:00");
  const [checker, setChecker] = useState("Ajewole Iyanuloluwa");

  const [rows, setRows] = useState<FeedRow[]>([
    { pen: "2", feed: "LM", opening: 45, fed: 6, closing: 24 },
    { pen: "3", feed: "LM", opening: 32.5, fed: 13, closing: 19.5 },
    { pen: "2B", feed: "", opening: "", fed: "", closing: "" },
    { pen: "4", feed: "", opening: "", fed: "", closing: "" },
  ]);

  const [appearance, setAppearance] = useState<AppearanceType>("good");
  const [smell, setSmell] = useState<SmellType>("normal");
  const [insectPests, setInsectPests] = useState<InsectPestType>("none");

  const [water, setWater] = useState({
    penId: "2",
    opening: 12450,
    closing: 13700,
    notes: "Normal Flow",
  });

  const [symptoms, setSymptoms] = useState<AbnormalFeedingType[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState(
    "Water leak in Pen 3 needs repair. Birds eating normally."
  );

  const [loading, setLoading] = useState(false);

  const firstValidRow = useMemo(() => {
    return rows.find(
      (row) =>
        row.pen &&
        row.opening !== "" &&
        row.fed !== "" &&
        row.closing !== ""
    );
  }, [rows]);

  const handleSubmit = async () => {
    if (!firstValidRow) {
      alert("Please complete at least one feed consumption row.");
      return;
    }

    const opening = Number(firstValidRow.opening);
    const fed = Number(firstValidRow.fed);
    const closing = Number(firstValidRow.closing);
    const consumed = opening + fed - closing;

    const waterConsumptionPerLiter = water.closing - water.opening;

    const payload: FeedConsumptionRequest = {
      penId: firstValidRow.pen,
      openingBags: opening,
      closingBags: closing,
      fedTodayBagsTime: {
        noOfBags: fed,
        time: new Date().toISOString().split("T")[0] + `T${time}:00.000Z`,
      },
      consumedBags: consumed,
      feedQualityCheck: {
        appearance,
        smell,
        insectPests,
      },
      waterConsumption: {
        penId: water.penId,
        opening: Number(water.opening),
        closing: Number(water.closing),
        consumptionPerLiter: Number(waterConsumptionPerLiter),
        notes: water.notes,
      },
      abnormalFeedingBehavior: {
        symptoms,
        additionalNotes,
      },
    };

    try {
      setLoading(true);
      await feedConsumptionService.create(payload);
      alert("Feed consumption saved successfully!");
    } catch (error) {
      console.error("Failed to save feed consumption:", error);
      alert("Failed to save feed consumption.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <DailyFeedHeader
        time={time}
        setTime={setTime}
        checker={checker}
        setChecker={setChecker}
      />

      <FeedConsumptionTable rows={rows} setRows={setRows} />

      <FeedQualityCheck
        appearance={appearance}
        setAppearance={setAppearance}
        smell={smell}
        setSmell={setSmell}
        insectPests={insectPests}
        setInsectPests={setInsectPests}
      />

      <WaterConsumption water={water} setWater={setWater} />

      <AbnormalFeeding
        symptoms={symptoms}
        setSymptoms={setSymptoms}
        additionalNotes={additionalNotes}
        setAdditionalNotes={setAdditionalNotes}
      />

      <FeedActions onSave={handleSubmit} loading={loading} />
     </div>
  );
}