

import HealthObservation from "@/components/medication/HealthObservation";
import MedicationActions from "@/components/medication/MedicationActions";
import MedicationDetails from "@/components/medication/MedicationDetails";
import MedicationHeader from "@/components/medication/MedicationHeader";
import TreatmentsTable from "@/components/medication/TreatmentsTable";
import VaccinationSchedule from "@/components/medication/VaccinationSchedule";

export default function MedicationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto space-y-6">

        <MedicationHeader />

        <TreatmentsTable />

        <MedicationDetails />

        <VaccinationSchedule />

        <HealthObservation />

        <MedicationActions />

      </div>

    </div>
  )
}