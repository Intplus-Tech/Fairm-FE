export type LayerStatus = "Optimal" | "Critical" | "Warning";

export interface LayersRowData {
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