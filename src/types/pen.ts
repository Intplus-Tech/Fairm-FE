export type HouseType =
  | "deep_litter"
  | "battery_cage_system"
  | "free_range_system"
  | "semi_intensive_system"
  | "slatted_floor_system"
  | "aviary_system"
  | "controlled_environment_house";

export type FeederType =
  | "auto_feeders"
  | "hanging_feeders"
  | "trough_feeders"
  | "tray_or_bowl_feeders"
  | "treadle_automatic_click_on_feeders"
  | "spin_spinner_feeders"
  | "chicks_feeders";

export type SensorType =
  | "temperature"
  | "humidity"
  | "ammonia"
  | "carbon_dioxide"
  | "light"
  | "feed"
  | "pressure"
  | "motion_security";

export type BirdType = "broiler" | "layer" | "pullet";

export type BreedType =
  | "cobb_500"
  | "ross_308"
  | "arbor_acre"
  | "marshal"
  | "hubbard"
  | "anak"
  | "isa_brown"
  | "highland_brown"
  | "loehmann_brown"
  | "funaab_alpha"
  | "shika_brown"
  | "noiler"
  | "nigerian_indigenous_chicken"
  | "kuroiler"
  | "others";

export interface PenRequest {
  name: string;
  maxCapacity: number;
  houseType: HouseType;
  feeder: FeederType;
  sensors: SensorType[];
  birdType: BirdType;
  breed: BreedType;
  noOfBirds: number;
  ageInWeeks: number;
  startDate: Date;
}

export interface PenResponse {
  _id: string;
  name: string;
  maxCapacity: number;
  houseType: string;
  feeder: string;
  sensors: [string, string];
  birdType: string;
  breed: string;
  noOfBirds: number;
  ageInWeeks: number;
  startDate: Date;
  createdAt: string;
  updatedAt: string;
}
