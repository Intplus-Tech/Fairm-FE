export type AlertStatus = "Critical" | "Warning";


export interface PulletRowData {
  id: number;
  date: string;
  pens: number;
  stock: string;
  mortality: number;
  feed: number;
  weight: number;
  alert: AlertStatus;
}