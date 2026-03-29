import { api } from "@/lib/api/axios";
import { FlockSearchResponse } from "@/types/flock.types";

/* =======================
   FLOCK SERVICE
======================= */
export const flockService = {
  async searchFlocks(
    search: string,
    page = 1,
    limit = 10,
    penId?: string,
    employeeId?: string,
    inventoryId?: string
  ): Promise<FlockSearchResponse> {
    const res = await api.get<FlockSearchResponse>("/admin/search", {
      params: {
        search,
        page,
        limit,
        penId,
        employeeId,
        inventoryId,
      },
    });
    return res.data;
  },
};