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
import { getStoredUser } from "@/lib/auth/getUser";
import { PenMortalityFormRow } from "@/types/mortality-form";
import toast from "react-hot-toast"; // ✅ toast import
import { UploadFileResponse } from "@/types/upload-file";

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

  const [checkedBy, setCheckedBy] = useState("");
  const [checkedTime, setCheckedTime] = useState("");

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

        const mappedRows: PenMortalityFormRow[] = penRes.map((pen: PenResponse) => ({
          penId: pen._id,
          penLabel: getPenLabel(pen),
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
        }));

        setRows(mappedRows);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load pens");
      }
    };

    fetchData();

    const user = getStoredUser();
    if (user?.fullName) setCheckedBy(user.fullName);

    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    setCheckedTime(`${hh}:${mm}`);
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      await Promise.all(
        rows.map((row) => {
          const payload = {
            penId: row.penId,
            openingStock: Number(row.openingStock) || 0,
            closingStock: Number(row.closingStock) || 0,
            mortality: Number(row.mortality) || 0,
            weight: Number(row.weight) || 0,
            temperatureRange: {
              min: Number(row.temperatureMin) || 0,
              max: Number(row.temperatureMax) || 0,
            },
            sickWeak: {
              noOfSickWeak: Number(row.sickWeakCount) || 0,
              treat: row.treat,
            },
            culled: {
              noOfCulled: Number(row.culledCount) || 0,
              reason: row.culledReason as CulledReason,
            },
            sickBirdObservations: {
              symptoms,
              additionalNotes,
            },
            photosEvidences,
          };

          return mortalityService.create(payload);
        })
      );

      // ✅ Success toast
      toast.success(
        <div>
          <p>Mortality data saved successfully!</p>
          <p>Checked By: {checkedBy}</p>
          <p>Time: {checkedTime}</p>
        </div>,
        { duration: 4000 } // auto-dismiss
      );
    } catch (err: any) {
      console.error("Failed to save mortality data:", err);
      const message = err?.response?.data?.message || "Failed to save mortality data";
      setError(message);

      // ✅ Error toast
      toast.error(
        <div>
          <p>{message}</p>
        </div>,
        { duration: 4000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (files: FileList | null) => {
  if (!files || files.length === 0) return;

  try {
    const uploadedFiles = await uploadFileService.create(files);

    const uploadedIds = uploadedFiles.map((file) => file._id);

    setPhotosEvidences((prev) => [...prev, ...uploadedIds]);
  } catch (err) {
    console.error("Photo upload failed:", err);

    toast.error(
      <div>
        <p>Failed to upload photo(s)</p>
      </div>,
      { duration: 4000 }
    );
  }
};
  const handleNext = () => {
    setFlow((prev: { mortality: boolean }) => ({ ...prev, mortality: true }));
    router.push("/entry-officer/feed-consumption");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6  ">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      
      <div className="bg-white space-y-6 pb-9 rounded-xl shadow ">
      <div className="">
         <MortalityHeader
        checkedBy={checkedBy}
        checkedTime={checkedTime}
        onCheckedByChange={setCheckedBy}
        onCheckedTimeChange={setCheckedTime}
      />

      <div className="bg-white rounded-b-xl shadow p-8 border-2 border-gray-200">
        <PenDataTable rows={rows} setRows={setRows} />
      </div>


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
        <PhotoEvidence onUpload={handlePhotoUpload} />
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
    </div>
  );
}