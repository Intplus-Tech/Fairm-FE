import { CulledReason } from "./mortality";

export interface PenMortalityFormRow {
  penId: string;
  penLabel: string;

  openingStock: number;
  weight: number;
  mortality: number;
  sickWeakCount: number;
  treat: boolean;
  culledCount: number;
  culledReason: CulledReason;

  closingStock: number;
  temperatureMin: number;
  temperatureMax: number;
}

export interface PenData {
  pen: string;
  openingStock: number;
  avgBirdWeight?: number;
  mortality?: number;
  sick?: number;
  culled?: number;
  closingStock?: number;
};