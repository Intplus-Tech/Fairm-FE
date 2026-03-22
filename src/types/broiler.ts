export type BroilerAlert = "Critical" | "Warning";

export interface PenDetail {
  penName: string;
  age: number;
  liveBirds: number;
  mortality: number;
  culls: number;
  feed: number;
  water: number;
  weight: number;
  alert: "Critical" | "Warning";
}

export interface BroilerRowData {
  id: number;
  date: string;
  pens: number;
  stock: number;
  mortality: number;
  culls: number;
  feed: number;
  water: number;
  weight: number;
  alert: BroilerAlert;
}
