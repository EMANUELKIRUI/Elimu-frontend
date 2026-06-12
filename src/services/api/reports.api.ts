import { apiClient } from "@/services/api-client";

export type ReportFilter = {
  type: string;
  term: string;
  year: string;
};

export const reportsApi = {
  runReport: async (filter: ReportFilter) => {
    const response = await apiClient.post("/reports/generate", filter);
    return response.data;
  }
};
