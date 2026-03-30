export interface EntryOfficerDashboardData {
  totalLiveBirds: number;
  totalMortality: number;
  totalFeedConsumed: number;
}

export interface EntryOfficerDashboardResponse {
  ok: boolean;
  data: EntryOfficerDashboardData;
}