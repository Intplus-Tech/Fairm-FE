"use client";

import { useRouter } from "next/navigation";

import HealthObservation from "@/components/medication/HealthObservation";
import MedicationActions from "@/components/medication/MedicationActions";
import MedicationDetails from "@/components/medication/MedicationDetails";
import MedicationHeader from "@/components/medication/MedicationHeader";
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
import TreatmentsTable from "@/components/medication/TreatmentsTable";
import AddAnotherSales from "@/components/brand/AddAnotherSales";

type TreatmentRow = {
  penId: string;
  penLabel: string;
  medication: string;
  purpose: string;
  dosage: number | "";
  method: string;
  status: MedicationTreatmentStatus;
};

type MedicationForm = {
  rows: TreatmentRow[];
  medicationName: string;
  expiryAt: string;
  vaccineTypes: VaccinationType[];
  otherVaccine: string;
  vaccineDosage: number | "";
  vaccineMethod: VaccinationMethod;
  sicknessObserved: SicknessObserved[];
  treatmentName: string;
  applied: AppliedType;
};

export default function MedicationPage() {
  const [administeredBy, setAdministeredBy] = useState("");
  const [time, setTime] = useState("08:00");

  const [forms, setForms] = useState<MedicationForm[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setFlow } = useEntryFlow();
  const router = useRouter();

  // Fetch pens once
  const [pens, setPens] = useState<PenResponse[]>([]);

  useEffect(() => {
    const fetchPens = async () => {
      try {
        const penRes = await pensService.list();
        setPens(penRes);

        // create first form
        setForms([
          {
            rows: penRes.map((pen) => ({
              penId: pen._id,
              penLabel: pen.name ?? pen._id,
              medication: "",
              purpose: "",
              dosage: 0,
              method: "",
              status: "pending",
            })),
            medicationName: "",
            expiryAt: "",
            vaccineTypes: [],
            otherVaccine: "",
            vaccineDosage: 0,
            vaccineMethod: "water",
            sicknessObserved: [],
            treatmentName: "",
            applied: "no",
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch pens:", err);
        setError("Failed to load pens");
      }
    };

    fetchPens();
  }, []);

  const handleAddSales = () => {
    setForms((prev) => [
      ...prev,
      {
        rows: pens.map((pen) => ({
          penId: pen._id,
          penLabel: pen.name ?? pen._id,
          medication: "",
          purpose: "",
          dosage: 0,
          method: "",
          status: "pending",
        })),
        medicationName: "",
        expiryAt: "",
        vaccineTypes: [],
        otherVaccine: "",
        vaccineDosage: 0,
        vaccineMethod: "water",
        sicknessObserved: [],
        treatmentName: "",
        applied: "no",
      },
    ]);
  };

  const updateForm = (index: number, field: keyof MedicationForm, value: any) => {
    setForms((prev) =>
      prev.map((form, i) =>
        i === index ? { ...form, [field]: value } : form
      )
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      for (const form of forms) {
        const validRows = form.rows.filter(
          (row) =>
            row.penId &&
            row.medication.trim() &&
            row.purpose.trim() &&
            row.dosage !== "" &&
            row.method.trim()
        );

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
                name: form.medicationName,
                expiryAt: new Date(form.expiryAt).toISOString(),
              },
              vaccinationSchedule: {
                vaccineType: form.vaccineTypes,
                dosage: Number(form.vaccineDosage || 0),
                method: form.vaccineMethod,
              },
              treatment: {
                sicknessObserved: form.sicknessObserved,
                treatment: form.treatmentName,
                applied: form.applied,
              },
            };

            return medicationService.create(payload);
          })
        );
      }

      alert("Medication saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save medication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      <div className="mx-auto">
        <MedicationHeader
          administeredBy={administeredBy}
          setAdministeredBy={setAdministeredBy}
          time={time}
          setTime={setTime}
        />

        <div className="bg-white space-y-6 p-6 rounded-b-md border">

          {forms.map((form, index) => (
            <div key={index} className="space-y-6">

              <TreatmentsTable
                rows={form.rows}
                setRows={(rows) => updateForm(index, "rows", rows)}
              />

              <MedicationDetails
                medicationName={form.medicationName}
                setMedicationName={(value) =>
                  updateForm(index, "medicationName", value)
                }
                expiryAt={form.expiryAt}
                setExpiryAt={(value) =>
                  updateForm(index, "expiryAt", value)
                }
              />

              <VaccinationSchedule
                vaccineTypes={form.vaccineTypes}
                setVaccineTypes={(value) =>
                  updateForm(index, "vaccineTypes", value)
                }
                otherVaccine={form.otherVaccine}
                setOtherVaccine={(value) =>
                  updateForm(index, "otherVaccine", value)
                }
                vaccineDosage={form.vaccineDosage}
                setVaccineDosage={(value) =>
                  updateForm(index, "vaccineDosage", value)
                }
                vaccineMethod={form.vaccineMethod}
                setVaccineMethod={(value) =>
                  updateForm(index, "vaccineMethod", value)
                }
              />

              <HealthObservation
                sicknessObserved={form.sicknessObserved}
                setSicknessObserved={(value) =>
                  updateForm(index, "sicknessObserved", value)
                }
                treatmentName={form.treatmentName}
                setTreatmentName={(value) =>
                  updateForm(index, "treatmentName", value)
                }
                applied={form.applied}
                setApplied={(value) =>
                  updateForm(index, "applied", value)
                }
              />

            </div>
          ))}

          <div className="flex items-center justify-center">
            <AddAnotherSales onClick={handleAddSales} />
          </div>

          <MedicationActions
            onSave={handleSave}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}