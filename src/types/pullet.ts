export type AlertStatus = "Critical" | "Warning" | "Normal";

export interface PulletRowData {
  id: string;

  date: string;
  pens: number;
  stock: number;

  mortality: number;
  feed: number; // not in backend → default 0
  weight: number;

  alert: AlertStatus;
}