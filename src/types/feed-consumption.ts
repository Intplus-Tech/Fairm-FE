export type AbnormalFeedingType =
  | "reduced_appetite"
  | "selective_feeding"
  | "over_consumption"
  | "feed_wastage"
  | "aggression_at_feeder"
  | "other";

export type AppearanceType = "good" | "moldy" | "clumpy" | "other";

export type SmellType = "normal" | "rancid" | "musty" | "other";

export type InsectPestType = "none" | "weevils" | "moths" | "rodent_droppings";

export interface FeedConsumptionResponse {
  _id: string;
  penId: string;
  openingBags: number;
  closingBags: number;
  fedTodayBagsTime: {
    noOfBags: number;
    time: Date;
  };
  consumedBags: number;
  feedQualityCheck: {
    appearance: AppearanceType;
    smell: SmellType;
    insectPests: InsectPestType;
  };
  waterConsumption: {
    penId: string;
    opening: number;
    closing: number;
    consumptionPerLiter: number;
    notes: string;
  };
  abnormalFeedingBehavior: {
    symptoms: AbnormalFeedingType[];
    additionalNotes: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FeedConsumptionRequest {
  penId: string;
  openingBags: number;
  closingBags: number;
  fedTodayBagsTime: {
    noOfBags: number;
    time: Date;
  };
  consumedBags: number;
  feedQualityCheck: {
    appearance: string;
    smell: string;
    insectPests: string;
  };
  waterConsumption: {
    penId: string;
    opening: number;
    closing: number;
    consumptionPerLiter: number;
    notes: string;
  };
  abnormalFeedingBehavior: {
    symptoms: string[];
    additionalNotes: string;
  };
}
