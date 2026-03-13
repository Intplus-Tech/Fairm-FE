"use client";

import { useRouter } from "next/navigation";
// import { useEntryFlow } from "@/context/entry-flow-context";

import HealthObservation from "@/components/medication/HealthObservation";
import MedicationActions from "@/components/medication/MedicationActions";
import MedicationDetails from "@/components/medication/MedicationDetails";
import MedicationHeader from "@/components/medication/MedicationHeader";
import TreatmentsTable from "@/components/medication/TreatmentsTable";
import VaccinationSchedule from "@/components/medication/VaccinationSchedule";
import { useEntryFlow } from "../../../../context/entry-flow-context";

export default function MedicationPage() {

  const { setFlow } = useEntryFlow();
  const router = useRouter();

  const handleNext = () => {
    setFlow((prev: any) => ({
      ...prev,
      medication: true,
    }));

    router.push("/entry-officer/duty-roaster");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto space-y-6">

        <MedicationHeader />

        <TreatmentsTable />

        <MedicationDetails />

        <VaccinationSchedule />

        <HealthObservation />

        <MedicationActions />

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