"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import MortalityHeader from "@/components/mortality/mortality-header";
import PenDataTable from "@/components/mortality/pen-data-table";
import SickBirdObservation from "@/components/mortality/sick-bird-observation";
import PhotoEvidence from "@/components/mortality/photo-evidence";
import { useEntryFlow } from "../../../../context/entry-flow-context";
import { useState } from "react";
import { CulledReason, SicknessType } from "@/types/mortality";
import { mortalityService } from "../../../../services/mortality.service";

interface PenMortalityFormRow {
  penId: string;
  penLabel: string;
  openingStock: number;
  weight: number;
  mortality: number;
  sickWeakCount: number;
  treat: boolean;
  culledCount: number;
  culledReason: CulledReason;
  closingStock: number;
  temperatureMin: number;
  temperatureMax: number;
}

export default function MortalityPage() {
  const { setFlow } = useEntryFlow();
  const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [rows, setRows] = useState<PenMortalityFormRow[]>([
    {
      penId: "pen_2_id", // replace with real pen IDs from backend later
      penLabel: "2",
      openingStock: 4356,
      weight: 0,
      mortality: 0,
      sickWeakCount: 0,
      treat: false,
      culledCount: 0,
      culledReason: "other",
      closingStock: 4356,
      temperatureMin: 0,
      temperatureMax: 0,
    },
    {
      penId: "pen_3_id",
      penLabel: "3",
      openingStock: 3234,
      weight: 0,
      mortality: 0,
      sickWeakCount: 0,
      treat: false,
      culledCount: 0,
      culledReason: "other",
      closingStock: 3234,
      temperatureMin: 0,
      temperatureMax: 0,
    },
    {
      penId: "pen_2b_id",
      penLabel: "2B",
      openingStock: 0,
      weight: 0,
      mortality: 0,
      sickWeakCount: 0,
      treat: false,
      culledCount: 0,
      culledReason: "other",
      closingStock: 0,
      temperatureMin: 0,
      temperatureMax: 0,
    },
    {
      penId: "pen_4_id",
      penLabel: "4",
      openingStock: 0,
      weight: 0,
      mortality: 0,
      sickWeakCount: 0,
      treat: false,
      culledCount: 0,
      culledReason: "other",
      closingStock: 0,
      temperatureMin: 0,
      temperatureMax: 0,
    },
  ]);

    const [symptoms, setSymptoms] = useState<SicknessType[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState(
    "Only Birds in Pen 2 have these symptoms"
  );
  const [photosEvidences, setPhotosEvidences] = useState<string[]>([]);
  const [checkedBy, setCheckedBy] = useState("Ajewole Iyanoluwa");
  const [checkedTime, setCheckedTime] = useState("08:00");

    const handleSave = async () => {
    try {
      setLoading(true);

      await Promise.all(
        rows.map((row) =>
          mortalityService.create({
            penId: row.penId,
            openingStock: Number(row.openingStock),
            closingStock: Number(row.closingStock),
            mortality: Number(row.mortality),
            weight: Number(row.weight),
            temperatureRange: {
              min: Number(row.temperatureMin),
              max: Number(row.temperatureMax),
            },
            sickWeak: {
              noOfSickWeak: Number(row.sickWeakCount),
              treat: row.treat as true, // see note below
            },
            culled: {
              noOfCulled: Number(row.culledCount),
              reason: row.culledReason,
            },
            sickBirdObservations: {
              symptoms,
              additionalNotes,
            },
            photosEvidences,
          })
        )
      );

      alert("Mortality data saved successfully!");
    } catch (error) {
      console.error("Failed to save mortality data:", error);
      alert("Failed to save mortality data");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setFlow((prev: any) => ({
      ...prev,
      mortality: true,
    }));

    router.push("/entry-officer/feed-consumption");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <MortalityHeader
        checkedBy={checkedBy}
        checkedTime={checkedTime}
        onCheckedByChange={setCheckedBy}
        onCheckedTimeChange={setCheckedTime}
      />

      <div className="bg-white rounded-xl shadow p-6">
        <PenDataTable rows={rows} setRows={setRows} />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <SickBirdObservation
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          additionalNotes={additionalNotes}
          setAdditionalNotes={setAdditionalNotes}
        />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <PhotoEvidence
          photosEvidences={photosEvidences}
          setPhotosEvidences={setPhotosEvidences}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="border border-indigo-500 text-indigo-600 px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Flock Health Data"}
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