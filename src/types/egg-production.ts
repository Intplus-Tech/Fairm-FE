export type CollectionIssuesType =
  | "egg_eating"
  | "floor_eggs"
  | "broken_in_nest"
  | "dirty_eggs"
  | "blood_spots"
  | "double_yolks";

export interface EggProductionResponse {
  _id: string;
  penId: string;
  sixAm: {
    goodEggs: number;
    defectEggs: number;
  };
  nineAm: {
    goodEggs: number;
    defectEggs: number;
  };
  twoPm: {
    goodEggs: number;
    defectEggs: number;
  };
  collectionIssues: CollectionIssuesType[];
  photosEvidences: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EggProductionRequest {
  penId: string;
  sixAm: {
    goodEggs: number;
    defectEggs: number;
  };
  nineAm: {
    goodEggs: number;
    defectEggs: number;
  };
  twoPm: {
    goodEggs: number;
    defectEggs: number;
  };
  collectionIssues: CollectionIssuesType[];
  photosEvidences: string[];
}
