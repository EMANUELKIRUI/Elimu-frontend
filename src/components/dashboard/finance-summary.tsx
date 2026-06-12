"use client";

import { useFinance } from "@/hooks/use-finance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FinanceSummary() {
  const { data, isLoading } = useFinance();

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Finance summary</CardTitle>
          <CardDescription>Key revenue and expense metrics for the active school.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading finance summary...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">Collected today</p>
              <strong className="text-xl">{data?.collectedToday ?? "KES 0"}</strong>
            </div>
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">Outstanding fees</p>
              <strong className="text-xl">{data?.outstandingFees ?? "KES 0"}</strong>
            </div>
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <strong className="text-xl">{data?.revenue ?? "KES 0"}</strong>
            </div>
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">Expenses</p>
              <strong className="text-xl">{data?.expenses ?? "KES 0"}</strong>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
