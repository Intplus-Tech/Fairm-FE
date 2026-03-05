import type {
  HouseType,
  FeederType,
  SensorType,
  BirdType,
  BreedType,
} from "@/types/pen";

export const HOUSE_TYPES: HouseType[] = [
  "deep_litter",
  "battery_cage_system",
  "free_range_system",
  "semi_intensive_system",
  "slatted_floor_system",
  "aviary_system",
  "controlled_environment_house",
];

export const FEEDER_TYPES: FeederType[] = [
  "auto_feeders",
  "hanging_feeders",
  "trough_feeders",
  "tray_or_bowl_feeders",
  "treadle_automatic_click_on_feeders",
  "spin_spinner_feeders",
  "chicks_feeders",
];

export const SENSOR_TYPES: SensorType[] = [
  "temperature",
  "humidity",
  "ammonia",
  "carbon_dioxide",
  "light",
  "feed",
  "pressure",
  "motion_security",
];

export const BIRD_TYPES: BirdType[] = ["broiler", "layer", "pullet"];

export const BREED_TYPES: BreedType[] = [
  "cobb_500",
  "ross_308",
  "arbor_acre",
  "marshal",
  "hubbard",
  "anak",
  "isa_brown",
  "highland_brown",
  "loehmann_brown",
  "funaab_alpha",
  "shika_brown",
  "noiler",
  "nigerian_indigenous_chicken",
  "kuroiler",
  "others",
];
