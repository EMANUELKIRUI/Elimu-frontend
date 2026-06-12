import { useMutation } from "@tanstack/react-query";
import { reportsApi, type ReportFilter } from "@/services/api/reports.api";

export function useReportGeneration() {
  return useMutation({
    mutationFn: (filter: ReportFilter) => reportsApi.runReport(filter)
  });
}
