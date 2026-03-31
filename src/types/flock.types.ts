/* =======================
   FLOCK TYPES
======================= */
export interface Flock {
  _id: string;
  name: string;
  maxCapacity: number;
  houseType: string;
  feeder: string;
  sensors: string[];
  birdType: string;
  batchNo: string;
  breed: string;
  noOfBirds: number;
  ageInWeeks: number;
  startDate: string;
  farmId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  employee: Record<string, unknown>;
}

export interface FlockSearchResponse {
  data: Flock[];
  total: number;
  page: number;
  limit: number;
}