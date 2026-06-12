import { apiClient } from "@/services/api-client";

export type FinanceSummary = {
  collectedToday: string;
  outstandingFees: string;
  revenue: string;
  expenses: string;
};

export const financeApi = {
  summary: async (): Promise<FinanceSummary> => {
    const response = await apiClient.get("/finance/summary");
    return response.data;
  }
};
