"use client";

import { useRouter } from "next/navigation";
import { useEntryFlow } from "../../../../context/entry-flow-context";

import CollectionIssues from "@/components/egg-production/CollectionIssues";
import EggCollectionTable from "@/components/egg-production/EggCollectionTable";
import PageNavigation from "@/components/egg-production/PageNavigation";
import PhotosEvidence from "@/components/egg-production/PhotosEvidence";
import { useEffect, useState } from "react";
import { uploadFileService } from "../../../../services/uploadFile.service";
import { CollectionIssuesType, EggProductionRequest } from "@/types/egg-production";
import { eggProductionService } from "../../../../services/egg-production.service";
import { pensService } from "../../../../services/pen.service";
import { PenResponse } from "@/types/pen";

type EggSlot = { goodEggs: number; defectEggs: number };
type EggCollectionRow = {
  penId: string;
  penLabel: string;
  sixAm: EggSlot;
  nineAm: EggSlot;
  twoPm: EggSlot;
}

const emptySlot = (): EggSlot => ({ goodEggs: 0, defectEggs: 0 });

export default function EggProductionPage() {
  const [rows, setRows] = useState<EggCollectionRow[]>([]);
  const [collectionIssues, setCollectionIssues] = useState<CollectionIssuesType[]>([]);
  const [photosEvidences, setPhotosEvidences] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const { setFlow } = useEntryFlow();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchPens = async () => {
      try {
        const penRes = await pensService.list();
        setRows(
          penRes.map((pen: PenResponse) => ({
            penId: pen._id,
            penLabel: pen.name,
            sixAm: emptySlot(),
            nineAm: emptySlot(),
            twoPm: emptySlot(),
          }))
        );
      } catch (err) {
        console.error("Failed to fetch pens:", err);
        setError("Failed to load pens");
      }
    };
    fetchPens();
  }, []);

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        // If your backend expects base64 string:
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

  const handleSave = async () => {
    try {
      setSaving(true);

      const payloads: EggProductionRequest[] = rows.map((row) => ({
        penId: row.penId,
        sixAm: row.sixAm,
        nineAm: row.nineAm,
        twoPm: row.twoPm,
        collectionIssues,
        photosEvidences,
      }));

      await Promise.all(payloads.map((payload) => eggProductionService.create(payload)));

      alert("Egg production data saved successfully!");
      router.push("/entry-officer/farm-gate-sales");
    } catch (error) {
      console.error("Failed to save egg production data:", error);
      alert("Failed to save egg production data");
    } finally {
      setSaving(false);
    }
  };

    const handleNext = () => {
    setFlow((prev: {egg: boolean}) => ({
      ...prev,
      egg: true,
    }));

    router.push("/entry-officer/farm-gate-sales");
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      <header className="mb-6 bg-purple-600 text-white p-4 rounded-md">
        <h1 className="text-xl font-bold">Daily Egg Production</h1>
        <p className="text-sm">{new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
      </header>

      <section className="mb-6">
        <EggCollectionTable data={rows} onChange={setRows} />
      </section>

      <section>
        <CollectionIssues 
          value={collectionIssues} onChange={setCollectionIssues}
           />
        <PhotosEvidence
          value={photosEvidences}
          onUpload={handlePhotoUpload}
         />
        <PageNavigation onSave={handleSave} loading={saving} />
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