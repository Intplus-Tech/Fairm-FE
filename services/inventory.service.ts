import { api } from "@/lib/api/axios";
import {
  InventoryRequest,
  InventoryResponse,
  InventoryListResponse,
} from "@/types/inventory";

export const inventoriesService = {
  async list() {
    const res = await api.get<{
      ok: boolean;
      data: InventoryListResponse;
    }>("/inventory");

    return res.data.data;
  },

  async create(payload: InventoryRequest) {
    const res = await api.post<{
      ok: boolean;
      data: InventoryResponse;
    }>("/inventory", payload);

    return res.data.data;
  },

  async getById(id: string) {
    const res = await api.get<{
      ok: boolean;
      data: InventoryResponse;
    }>(`/inventory/${id}`);

    return res.data.data;
  },

  async update(id: string, payload: Partial<InventoryRequest>) {
    const res = await api.put<{
      ok: boolean;
      data: InventoryResponse;
    }>(`/inventory/${id}`, payload);

    return res.data.data;
  },

  async remove(id: string) {
    return api.delete(`/inventory/${id}`);
  },

  // ✅ Daily stock out helper
  async dailyStockOut() {
    const res = await api.get<{
      ok: boolean;
      data: InventoryListResponse;
    }>("/inventory");

    return res.data.data.data;
  },
};