import { useQuery } from "@tanstack/react-query";
import { financeApi, type FinanceSummary } from "@/services/api/finance.api";

export function useFinance() {
  return useQuery<FinanceSummary, Error>({
    queryKey: ["finance-summary"],
    queryFn: financeApi.summary,
    staleTime: 1000 * 60 * 2
  });
}
