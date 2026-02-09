export type LayerStatus = "Optimal" | "Critical";

export interface LayerRowData {
  id: number;
  date: string;
  pens: number;
  birdsAlive: string;
  mortality: number;
  feed: number;
  totalEggs: number;
  hdp: number;
  status: LayerStatus;
}
