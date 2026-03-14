export type SicknessType =
  | "lethargy"
  | "coughing"
  | "diarrhea"
  | "limping"
  | "sneezing"
  | "swelling"
  | "discharge"
  | "ruffled_feathers";

export type CulledReason =
  | "injured"
  | "non_productive"
  | "aggressive"
  | "other"
  | "deformed";

export interface MortalityResponse {
  _id: string;
  penId: string;
  openingStock: number;
  closingStock: number;
  mortality: number;
  weight: number;
  temperatureRange: {
    min: number;
    max: number;
  };
  sickWeak: {
    noOfSickWeak: number;
    treat: true;
  };
  culled: {
    noOfCulled: number;
    reason: CulledReason;
  };
  sickBirdObservations: {
    symptoms: SicknessType[];
    additionalNotes: string;
  };
  photosEvidences: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MortalityRequest {
  penId: string;
  openingStock: number;
  closingStock: number;
  mortality: number;
  weight: number;
  temperatureRange: {
    min: number;
    max: number;
  };
  sickWeak: {
    noOfSickWeak: number;
    treat: boolean;
  };
  culled: {
    noOfCulled: number;
    reason: CulledReason;
  };
  sickBirdObservations: {
    symptoms: SicknessType[];
    additionalNotes: string;
  };
  photosEvidences: string[];
}
