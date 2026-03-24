export type BroilerAlert = "Critical" | "Warning";

/* =======================
   FINAL ROW DATA (UI NEEDS THIS)
======================= */
export interface BroilerRowData {
  id: string;

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