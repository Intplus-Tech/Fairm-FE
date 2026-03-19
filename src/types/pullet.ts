export type AlertStatus = "Critical" | "Warning";


export interface PulletRowData {
  id: number;
  date: string;
  pens: number;
  stock: number; // ✅ FIXED (was string before)
  mortality: number;
  feed: number;
  weight: number;
  alert: "Critical" | "Warning" | "Normal";
}