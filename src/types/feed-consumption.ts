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
  closingBags: 50;
  fedTodayBagsTime: {
    noOfBags: 10;
    time: Date;
  };
  consumedBags: 40;
  feedQualityCheck: {
    appearance: AppearanceType;
    smell: SmellType;
    insectPests: InsectPestType;
  };
  waterConsumption: {
    penId: string;
    opening: 100;
    closing: 50;
    consumptionPerLiter: 5;
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
  closingBags: 50;
  fedTodayBagsTime: {
    noOfBags: 10;
    time: Date;
  };
  consumedBags: 40;
  feedQualityCheck: {
    appearance: string;
    smell: string;
    insectPests: string;
  };
  waterConsumption: {
    penId: string;
    opening: 100;
    closing: 50;
    consumptionPerLiter: 5;
    notes: string;
  };
  abnormalFeedingBehavior: {
    symptoms: string[];
    additionalNotes: string;
  };
}
