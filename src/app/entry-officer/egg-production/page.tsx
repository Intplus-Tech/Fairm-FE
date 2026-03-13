// app/egg-production/page.tsx
// import EggCollectionTable from "@/components/EggCollectionTable";
// import CollectionIssues from "@/components/CollectionIssues";
// import PhotosEvidence from "@/components/PhotosEvidence";
// import PageNavigation from "@/components/PageNavigation";

import CollectionIssues from "@/components/egg-production/CollectionIssues";
import EggCollectionTable from "@/components/egg-production/EggCollectionTable";
import PageNavigation from "@/components/egg-production/PageNavigation";
import PhotosEvidence from "@/components/egg-production/PhotosEvidence";
// import { useState } from "react";
import { uploadFileService } from "../../../../services/uploadFile.service";
import { CollectionIssuesType, EggProductionRequest } from "@/types/egg-production";
import { eggProductionService } from "../../../../services/egg-production.service";

const initialRows: EggCollectionRow[] = [
  {
    penId: "2",
    sixAm: { goodEggs: 1000, defectEggs: 80 },
    nineAm: { goodEggs: 800, defectEggs: 80 },
    twoPm: { goodEggs: 900, defectEggs: 20 },
  },
  {
    penId: "3",
    sixAm: { goodEggs: 0, defectEggs: 0 },
    nineAm: { goodEggs: 0, defectEggs: 0 },
    twoPm: { goodEggs: 0, defectEggs: 0 },
  },
  {
    penId: "2B",
    sixAm: { goodEggs: 0, defectEggs: 0 },
    nineAm: { goodEggs: 0, defectEggs: 0 },
    twoPm: { goodEggs: 0, defectEggs: 0 },
  },
  {
    penId: "4",
    sixAm: { goodEggs: 0, defectEggs: 0 },
    nineAm: { goodEggs: 0, defectEggs: 0 },
    twoPm: { goodEggs: 0, defectEggs: 0 },
  },
];

export default function EggProductionPage() {
  const [rows, setRows] = useState<EggCollectionRow[]>(initialRows);
  const [collectionIssues, setCollectionIssues] = useState<CollectionIssuesType[]>([]);
  const [photosEvidences, setPhotosEvidences] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

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
    } catch (error) {
      console.error("Failed to save egg production data:", error);
      alert("Failed to save egg production data");
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6 bg-purple-600 text-white p-4 rounded-md">
        <h1 className="text-xl font-bold">Daily Egg Production</h1>
        <p className="text-sm">Sunday, February 1, 2026</p>
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