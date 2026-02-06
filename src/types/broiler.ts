export type BroilerAlert = "Critical" | "Warning";

export interface BroilerRowData {
  id: number;
  date: string;
  pens: number;
  stock: string;
  mortality: number;
  culls: number;
  feed: number;
  water: number;
  weight: number;
  alert: BroilerAlert;
}
