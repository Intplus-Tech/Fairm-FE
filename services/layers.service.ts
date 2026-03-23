"use client";

import { api } from "@/lib/api/axios";
import {
  LayersApiResponse,
  LayersDashboardResponse,
  LayersRowData,
  LayerPen,
} from "@/types/layers";

export const layersService = {
  /* =======================
     GET DASHBOARD
  ======================== */
  getDashboard: async (): Promise<LayersDashboardResponse> => {
    const res = await api.get<LayersApiResponse>("/birds/layer/dashboard");
    const payload = res.data?.data;

    return {
      summary: {
        totalBirds: payload?.stats.totalBirds ?? 0,
        totalMortality: payload?.stats.totalMortality ?? 0,
        totalAlive: payload?.stats.totalAliveBirds ?? 0,
        totalEggs: payload?.stats.totalEggs ?? 0,
        netProfit: payload?.stats.netProfit ?? 0,
      },
      rows:
        payload?.pens.map((pen: LayerPen): LayersRowData => ({
          id: pen.penId,
          date: pen.date,
          pens: pen.noOfPens,
          birdsAlive: pen.birdsAlive,
          mortality: pen.mortality,
          feed: pen.feedConsumed,
          totalEggs: pen.totalEggs,
          hdp: pen.hdp,
          status: pen.alerts.includes("Low Production")
            ? "Warning"
            : pen.mortality > 5
            ? "Critical"
            : "Optimal",
        })) ?? [],
    };
  },

  /* =======================
     GET PEN BY ID
  ======================== */
  getById: async (id: string): Promise<LayersRowData | null> => {
    const res = await api.get(`/birds/layer/${id}`);
    const pen: LayerPen | undefined = res.data?.data;

    if (!pen) return null;

    return {
      id: pen.penId,
      date: pen.date,
      pens: pen.noOfPens,
      birdsAlive: pen.birdsAlive,
      mortality: pen.mortality,
      feed: pen.feedConsumed,
      totalEggs: pen.totalEggs,
      hdp: pen.hdp,
      status: pen.alerts.includes("Low Production")
        ? "Warning"
        : pen.mortality > 5
        ? "Critical"
        : "Optimal",
    };
  },
};