import { api } from "@/lib/api/axios";
import { EntryOfficerDashboardResponse } from "@/types/officer";

class OfficerService {
  async getEntryOfficerDashboard(): Promise<EntryOfficerDashboardResponse> {
    try {
      const res = await api.get<EntryOfficerDashboardResponse>(
        "/admin/entry-officer-dashboard"
      );

      return res.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized");
      }

      if (error.response?.status === 403) {
        throw new Error(
          "Forbidden — requires SUPER_ADMIN or MANAGER"
        );
      }

      throw error;
    }
  }
}

export const officerService = new OfficerService();