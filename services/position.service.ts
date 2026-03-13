import { api } from "@/lib/api/axios";
import { PositionResponse } from "@/types/position";
import { PaginatedResponse } from ".";

export const positionService = {
  list() {
    return api
      .get<{ data: PaginatedResponse<PositionResponse> }>("/positions")
      .then((res) => res.data.data.data);
  },

  getById(id: string) {
    return api
      .get<{ data: PositionResponse }>(`/positions/${id}`)
      .then((res) => res.data.data);
  },
};
