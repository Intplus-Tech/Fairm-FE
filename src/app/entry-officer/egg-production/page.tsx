"use client";

import { useRouter } from "next/navigation";
import { useEntryFlow } from "../../../../context/entry-flow-context";

import CollectionIssues from "@/components/egg-production/CollectionIssues";
import EggCollectionTable from "@/components/egg-production/EggCollectionTable";
import PageNavigation from "@/components/egg-production/PageNavigation";
import PhotosEvidence from "@/components/egg-production/PhotosEvidence";

import { useEffect, useState } from "react";
import { uploadFileService } from "../../../../services/uploadFile.service";
import {
  CollectionIssuesType,
  EggProductionRequest,
} from "@/types/egg-production";

import { eggProductionService } from "../../../../services/egg-production.service";
import { pensService } from "../../../../services/pen.service";
import { PenResponse } from "@/types/pen";

import { toast } from "sonner";

type EggSlot = { goodEggs: number; defectEggs: number };

type EggCollectionRow = {
  penId: string;
  penLabel: string;
  sixAm: EggSlot;
  nineAm: EggSlot;
  twoPm: EggSlot;
};

const emptySlot = (): EggSlot => ({ goodEggs: 0, defectEggs: 0 });

export default function EggProductionPage() {
  const [rows, setRows] = useState<EggCollectionRow[]>([]);
  const [collectionIssues, setCollectionIssues] = useState<
    CollectionIssuesType[]
  >([]);
  const [photosEvidences, setPhotosEvidences] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const { setFlow } = useEntryFlow();
  const router = useRouter();

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
      } catch (err: any) {
        toast.error(err.message || "Failed to load pens");
      }
    };

    fetchPens();
  }, []);

  // ✅ PHOTO UPLOAD
const handlePhotoUpload = async (files: FileList | null) => {
  if (!files || files.length === 0) return;

  try {
    const uploadedFiles = await uploadFileService.create(files);

    // Ensure uploadedFiles is always treated as an array
    const uploadedArray = Array.isArray(uploadedFiles)
      ? uploadedFiles
      : [uploadedFiles];

    const uploadedUrls = uploadedArray.map((file) => file.url);

    setPhotosEvidences((prev) => [...prev, ...uploadedUrls]);

    toast.success(`${uploadedUrls.length} file(s) uploaded successfully`);
  } catch (error: any) {
    toast.error(error.message || "Failed to upload photo(s)");
  }
};
  // ✅ SAVE
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

      await Promise.all(
        payloads.map((payload) => eggProductionService.create(payload))
      );

      toast.success("Egg production saved successfully");

      router.push("/entry-officer/farm-gate-sales");
    } catch (error: any) {
      toast.error(error.message || "Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    setFlow((prev: { egg: boolean }) => ({
      ...prev,
      egg: true,
    }));

    router.push("/entry-officer/farm-gate-sales");
  };

  return (
    <div className="mx-auto p-6 max-h-screen">
      <header className="bg-purple-600 text-white p-4 rounded-t-xl">
        <h1 className="text-xl font-bold">Daily Egg Production</h1>

        <p className="text-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="bg-white rounded-b-2xl shadow-md p-6">
        <section className="mb-6 bg-white">
          <EggCollectionTable data={rows} onChange={setRows} />
        </section>

        <section>
          <CollectionIssues
            value={collectionIssues}
            onChange={setCollectionIssues}
          />

          <PhotosEvidence
            value={photosEvidences}
            onUpload={handlePhotoUpload}
          />

          <PageNavigation
            onSave={handleSave}
            loading={saving}
            onNext={handleNext}
          />
        </section>
      </div>
    </div>
  );
}