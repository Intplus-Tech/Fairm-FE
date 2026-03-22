export interface Alert {
  id: string;
  date: string;
  status: "Critical" | "Warning";
  issue: string;
  description: string;
}