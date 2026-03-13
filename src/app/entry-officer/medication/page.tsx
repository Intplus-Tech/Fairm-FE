

import HealthObservation from "@/components/medication/HealthObservation";
import MedicationActions from "@/components/medication/MedicationActions";
import MedicationDetails from "@/components/medication/MedicationDetails";
import MedicationHeader from "@/components/medication/MedicationHeader";
import TreatmentsTable from "@/components/medication/TreatmentsTable";
import VaccinationSchedule from "@/components/medication/VaccinationSchedule";
import type {
  AppliedType,
  MedicationRequest,
  MedicationResponse,
  MedicationTreatmentStatus,
  SicknessObserved,
  VaccinationMethod,
  VaccinationType,
} from "@/types/medication";
import { useMemo, useState } from "react";
import { medicationService } from "../../../../services/medication.service";

type TreatmentRow = {
  pen: string;
  medication: string;
  purpose: string;
  dosage: number | "";
  method: string;
  status: MedicationTreatmentStatus;
};

export default function MedicationPage() {
    const [administeredBy, setAdministeredBy] = useState("Ajewole Iyanuloluwa");
  const [time, setTime] = useState("08:00");

  const [rows, setRows] = useState<TreatmentRow[]>([
    {
      pen: "2",
      medication: "",
      purpose: "",
      dosage: 6,
      method: "",
      status: "pending",
    },
    {
      pen: "3",
      medication: "",
      purpose: "",
      dosage: 6,
      method: "",
      status: "pending",
    },
    {
      pen: "2B",
      medication: "",
      purpose: "",
      dosage: 6,
      method: "",
      status: "pending",
    },
    {
      pen: "4",
      medication: "",
      purpose: "",
      dosage: 6,
      method: "",
      status: "pending",
    },
  ]);

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

  const firstValidRow = useMemo(() => {
    return rows.find(
      (row) =>
        row.pen &&
        row.medication.trim() &&
        row.purpose.trim() &&
        row.dosage !== "" &&
        row.method.trim()
    );
  }, [rows]);

  const handleSave = async () => {
    if (!firstValidRow) {
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

    const payload: MedicationRequest = {
      penId: firstValidRow.pen,
      medication: firstValidRow.medication,
      purpose: firstValidRow.purpose,
      dosage: Number(firstValidRow.dosage),
      method: firstValidRow.method,
      status: firstValidRow.status,
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

    try {
      setLoading(true);
      await medicationService.create(payload);
      alert("Medication treatment saved successfully!");
    } catch (error) {
      console.error("Failed to save medication treatment:", error);
      alert("Failed to save medication treatment.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-50 p-6">

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

      </div>

    </div>
  )
}