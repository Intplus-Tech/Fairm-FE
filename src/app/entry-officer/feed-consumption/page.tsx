"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import AbnormalFeeding from "@/components/feed-consumption/AbnormalFeeding";
import DailyFeedHeader from "@/components/feed-consumption/DailyFeedHeader";
import FeedActions from "@/components/feed-consumption/FeedActions";
import FeedConsumptionTable from "@/components/feed-consumption/FeedConsumptionTable";
import FeedQualityCheck from "@/components/feed-consumption/FeedQualityCheck";
import WaterConsumption from "@/components/feed-consumption/WaterConsumption";
import { feedConsumptionService } from "../../../../services/feed-consumption.service";
import { AbnormalFeedingType, AppearanceType, FeedConsumptionRequest, InsectPestType, SmellType } from "@/types/feed-consumption";
import { useEffect, useMemo, useState } from "react";
import { useEntryFlow } from "../../../../context/entry-flow-context";
import { pensService } from "../../../../services/pen.service";
import { PenResponse } from "@/types/pen";

type FeedRow = {
  pen: string;
  feed: string;
  opening: number | "";
  fed: number | "";
  closing: number | "";
};

export default function Page() {
  const { setFlow } = useEntryFlow();
  const router = useRouter();

  const [time, setTime] = useState("08:00");
  const [checker, setChecker] = useState("");
  const [rows, setRows] = useState<FeedRow[]>([]);
  const [appearance, setAppearance] = useState<AppearanceType>("good");
  const [smell, setSmell] = useState<SmellType>("normal");
  const [insectPests, setInsectPests] = useState<InsectPestType>("none");
  const [water, setWater] = useState({
    penId: "",
    opening: 0,
    closing: 0,
    notes: "",
  });
  const [symptoms, setSymptoms] = useState<AbnormalFeedingType[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPenLabel = (pen: PenResponse) => {
    if (pen.name && pen.name.trim()) return pen.name;
    return `Pen ${pen._id.slice(-4).toUpperCase()}`;
  };

  useEffect(() => {
    const fetchPens = async () => {
      try {
        const penRes = await pensService.list();
        setRows(
          penRes.map((pen: PenResponse) => ({
            pen: pen._id,
            feed: "",
            opening: "",
            fed: "",
            closing: "",
            penLabel: getPenLabel(pen),
          }))
        );
        if (penRes.length > 0) {
          setWater((prev) => ({ ...prev, penId: penRes[0]._id }));
        }
      } catch (err) {
        console.error("Failed to fetch pens:", err);
        setError("Failed to load pens");
      }
    };
    fetchPens();
  }, []);

  const validRows = useMemo(() => {
    return rows.filter(
      (row) =>
        row.pen &&
        row.feed &&
        row.opening !== "" &&
        row.fed !== "" &&
        row.closing !== ""
    );
  }, [rows]);

  const handleSubmit = async () => {
    if (validRows.length === 0) {
      alert("Please complete at least one feed consumption row.");
      return;
    }

    try {
      setLoading(true);

      await Promise.all(
        validRows.map((row) => {
          const opening = Number(row.opening);
          const fed = Number(row.fed);
          const closing = Number(row.closing);
          const consumed = opening + fed - closing;

          const payload: FeedConsumptionRequest = {
            penId: row.pen,
            openingBags: opening,
            closingBags: closing,
            fedTodayBagsTime: {
              noOfBags: fed,
              time:
                new Date().toISOString().split("T")[0] +
                `T${time}:00.000Z`,
            },
            consumedBags: consumed,
            feedQualityCheck: { appearance, smell, insectPests },
            waterConsumption: {
              penId: water.penId,
              opening: Number(water.opening),
              closing: Number(water.closing),
              consumptionPerLiter: water.closing - water.opening,
              notes: water.notes,
            },
            abnormalFeedingBehavior: { symptoms, additionalNotes },
          };

          return feedConsumptionService.create(payload);
        })
      );

      alert("Feed consumption saved successfully!");
    } catch (error) {
      console.error("Failed to save feed consumption:", error);
      alert("Failed to save feed consumption.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setFlow((prev: { feed: boolean}) => ({ ...prev, feed: true }));
    router.push("/entry-officer/egg-production");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}
      
      
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

      <FeedActions onSave={handleSubmit} loading={loading} handleNext={handleNext} />
     </div>
  );
}