export type medicationTreatmentStatus = "pending" | "done";

export type SicknessObserved =
  | "mites_observed"
  | "lice_observed"
  | "worms_observed";

export type appliedType = "yes" | "no" | "schedule";

export type VaccinationType =
  | "nd_vaccine"
  | "ib_vaccine"
  | "gumboro_vaccine"
  | "coryza_vaccine"
  | "blood_spots"
  | "fowl_pox"
  | "other";

export type VaccinationMethod = "water" | "injection" | "spray";

export interface MedicationResponse {
  _id: string;
  penId: string;
  medication: string;
  purpose: string;
  dosage: number;
  method: string;
  status: medicationTreatmentStatus;
  medicationDetails: {
    name: string;
    expiryAt: Date;
  };
  vaccinationSchedule: {
    vaccineType: VaccinationType[];
    dosage: number;
    method: VaccinationMethod;
  };
  treatment: {
    sicknessObserved: SicknessObserved[];
    treatment: string;
    applied: appliedType;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MedicationRequest {
  penId: string;
  medication: string;
  purpose: string;
  dosage: number;
  method: string;
  status: medicationTreatmentStatus;
  medicationDetails: {
    name: string;
    expiryAt: Date;
  };
  vaccinationSchedule: {
    vaccineType: VaccinationType[];
    dosage: number;
    method: VaccinationMethod;
  };
  treatment: {
    sicknessObserved: SicknessObserved[];
    treatment: string;
    applied: appliedType;
  };
}
