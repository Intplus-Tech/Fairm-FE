"use client";

import { useRouter } from "next/navigation";
import MortalityHeader from "@/components/mortality/mortality-header";
import PenDataTable from "@/components/mortality/pen-data-table";
import SickBirdObservation from "@/components/mortality/sick-bird-observation";
import PhotoEvidence from "@/components/mortality/photo-evidence";
import { useEntryFlow } from "../../../../context/entry-flow-context";
import { useEffect, useState } from "react";
import { CulledReason, SicknessType } from "@/types/mortality";
import { mortalityService } from "../../../../services/mortality.service";
import { pensService } from "../../../../services/pen.service";
import { PenResponse } from "@/types/pen";
import { uploadFileService } from "../../../../services/uploadFile.service";

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
  const [error, setError] = useState<string | null>(null);

  const [pens, setPens] = useState<PenResponse[]>([]);
  const [rows, setRows] = useState<PenMortalityFormRow[]>([]);

  const [symptoms, setSymptoms] = useState<SicknessType[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [photosEvidences, setPhotosEvidences] = useState<string[]>([]);
  const [checkedBy, setCheckedBy] = useState("Ajewole Iyanoluwa");
  const [checkedTime, setCheckedTime] = useState("08:00");

  // Helper to shorten MongoDB ID if no pen name exists
  const getPenLabel = (pen: PenResponse) => {
    if (pen.name && pen.name.trim()) return pen.name;
    return `Pen ${pen._id.slice(-4).toUpperCase()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        const penRes = await pensService.list();
        setPens(penRes);

        // Build rows from real pen data
        const mappedRows: PenMortalityFormRow[] = penRes.map((pen: PenResponse) => ({
          penId: pen._id, // real DB ID used for API save
          penLabel: getPenLabel(pen), // readable label for UI
          openingStock: Number(0), // if your pen model has this field
          weight: 0,
          mortality: 0,
          sickWeakCount: 0,
          treat: false,
          culledCount: 0,
          culledReason: "other",
          closingStock: Number(0), // starts same as opening
          temperatureMin: 0,
          temperatureMax: 0,
        }));

        setRows(mappedRows);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load pens";
        setError(message);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      await Promise.all(
        rows.map((row) => {
          return mortalityService.create({
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
              treat: row.treat,
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
          });
        })
      );

      alert("Mortality data saved successfully!");
    } catch (error) {
      console.error("Failed to save mortality data:", error);
      alert("Failed to save mortality data");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const base64 = await fileToBase64(file);

        const uploaded = await uploadFileService.create({
          file: base64,
        });

        uploadedUrls.push(uploaded.url);
      }

      setPhotosEvidences((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Photo upload failed:", error);
      alert("Failed to upload photo(s)");
    }
  };

  const handleNext = () => {
    setFlow((prev: { mortality: boolean }) => ({
      ...prev,
      mortality: true,
    }));

    router.push("/entry-officer/feed-consumption");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      
      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}
      
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
          onUpload={handlePhotoUpload}
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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}