"use client";

/* =======================
   ALERT & STATUS TYPES
======================= */
export type LayerStatus = "Optimal" | "Critical" | "Warning";

/* =======================
   UI ROW DATA
======================= */
export interface LayersRowData {
  id: string;
  date: string;
  pens: number;
  birdsAlive: number;
  mortality: number;
  feed: number;
  totalEggs: number;
  hdp: number;
  status: LayerStatus;
}

/* =======================
   DASHBOARD RESPONSE
======================= */
export interface LayersDashboardResponse {
  summary: {
    totalBirds: number;
    totalMortality: number;
    totalAlive: number;
    totalEggs: number;
    netProfit: number;
  };
  rows: LayersRowData[];
}

/* =======================
   BACKEND API TYPES
======================= */
export interface LayersApiResponse {
  ok: boolean;
  data: LayersData;
}

export interface LayersData {
  stats: {
    totalBirds: number;
    totalMortality: number;
    totalAliveBirds: number;
    totalEggs: number;
    netProfit: number;
  };
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  pens: LayerPen[];
}

export interface LayerPen {
  penId: string;
  date: string;
  noOfPens: number;
  birdsAlive: number;
  mortality: number;
  feedConsumed: number;
  totalEggs: number;
  hdp: number;
  alerts: string[];
}