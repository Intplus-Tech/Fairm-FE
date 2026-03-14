"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import HealthObservation from "@/components/medication/HealthObservation";
import MedicationActions from "@/components/medication/MedicationActions";
import MedicationDetails from "@/components/medication/MedicationDetails";
import MedicationHeader from "@/components/medication/MedicationHeader";
import TreatmentsTable from "@/components/medication/TreatmentsTable";
import VaccinationSchedule from "@/components/medication/VaccinationSchedule";
import type {
  AppliedType,
  MedicationRequest,
  MedicationTreatmentStatus,
  SicknessObserved,
  VaccinationMethod,
  VaccinationType,
} from "@/types/medication";
import { useEffect, useMemo, useState } from "react";
import { medicationService } from "../../../../services/medication.service";
import { useEntryFlow } from "../../../../context/entry-flow-context";
import { pensService } from "../../../../services/pen.service";
import { PenResponse } from "@/types/pen";

type TreatmentRow = {
  penId: string;
  penLabel: string;
  medication: string;
  purpose: string;
  dosage: number | "";
  method: string;
  status: MedicationTreatmentStatus;
};

export default function MedicationPage() {
  const [administeredBy, setAdministeredBy] = useState("");
  const [time, setTime] = useState("08:00");
  const [rows, setRows] = useState<TreatmentRow[]>([]);
  const [medicationName, setMedicationName] = useState("");
  const [expiryAt, setExpiryAt] = useState("");
  const [vaccineTypes, setVaccineTypes] = useState<VaccinationType[]>([]);
  const [otherVaccine, setOtherVaccine] = useState("");
  const [vaccineDosage, setVaccineDosage] = useState<number | "">(0);
  const [vaccineMethod, setVaccineMethod] = useState<VaccinationMethod>("water");
  const [sicknessObserved, setSicknessObserved] = useState<SicknessObserved[]>([]);
  const [treatmentName, setTreatmentName] = useState("");
  const [applied, setApplied] = useState<AppliedType>("no");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const { setFlow } = useEntryFlow();
  const router = useRouter();

  useEffect(() => {
    const fetchPens = async () => {
      try {
        const penRes = await pensService.list();
        setRows(
          penRes.map((pen: PenResponse) => ({
            penId: pen._id,
            penLabel: pen.name ?? pen._id,
            medication: "",
            purpose: "",
            dosage: 0,
            method: "",
            status: "pending" as MedicationTreatmentStatus,
          }))
        );
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
        row.penId &&
        row.medication.trim() &&
        row.purpose.trim() &&
        row.dosage !== "" &&
        row.method.trim()
    );
  }, [rows]);

  const handleSave = async () => {
    if (validRows.length === 0) {
      alert("Please complete at least one treatment row.");
      return;
    }

    if (!medicationName.trim()) {
      alert("Please enter medication name.");
      return;
    }

    if (!expiryAt) {
      alert("Please select medication expiry date.");
      return;
    }

    try {
      setLoading(true);

      await Promise.all(
        validRows.map((row) => {
          const payload: MedicationRequest = {
            penId: row.penId,
            medication: row.medication,
            purpose: row.purpose,
            dosage: Number(row.dosage),
            method: row.method,
            status: row.status,
            medicationDetails: {
              name: medicationName,
              expiryAt: new Date(expiryAt).toISOString(),
            },
            vaccinationSchedule: {
              vaccineType: vaccineTypes,
              dosage: Number(vaccineDosage || 0),
              method: vaccineMethod,
            },
            treatment: {
              sicknessObserved,
              treatment: treatmentName,
              applied,
            },
          };

          return medicationService.create(payload);
        })
      );

      alert("Medication treatment saved successfully!");
    } catch (error) {
      console.error("Failed to save medication treatment:", error);
      alert("Failed to save medication treatment.");
    } finally {
      setLoading(false);
    }
  };

    const handleNext = () => {
    setFlow((prev: {medication: boolean}) => ({
      ...prev,
      medication: true,
    }));

    router.push("/entry-officer/duty-roaster");
  };

  
  return (
    <div className="min-h-screen bg-gray-50 p-6">

       {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}


      <div className="max-w-6xl mx-auto space-y-6">
        <MedicationHeader
          administeredBy={administeredBy}
          setAdministeredBy={setAdministeredBy}
          time={time}
          setTime={setTime}
        />

        <TreatmentsTable rows={rows} setRows={setRows} />

        <MedicationDetails
          medicationName={medicationName}
          setMedicationName={setMedicationName}
          expiryAt={expiryAt}
          setExpiryAt={setExpiryAt}
        />

        <VaccinationSchedule
          vaccineTypes={vaccineTypes}
          setVaccineTypes={setVaccineTypes}
          otherVaccine={otherVaccine}
          setOtherVaccine={setOtherVaccine}
          vaccineDosage={vaccineDosage}
          setVaccineDosage={setVaccineDosage}
          vaccineMethod={vaccineMethod}
          setVaccineMethod={setVaccineMethod}
        />

        <HealthObservation
          sicknessObserved={sicknessObserved}
          setSicknessObserved={setSicknessObserved}
          treatmentName={treatmentName}
          setTreatmentName={setTreatmentName}
          applied={applied}
          setApplied={setApplied}
        />

        <MedicationActions onSave={handleSave} loading={loading} />

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Next: Duty Roaster →
          </button>
        </div>

      </div>

    </div>
  );
}