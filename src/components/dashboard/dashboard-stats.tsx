"use client";

import { useDashboardOverview } from "@/hooks/use-dashboard";
import { StatsCard } from "@/components/common/stats-card";
import { Loading } from "@/components/common/loading";
import { Users, BookOpen, BarChart3, TrendingUp, DollarSign, Zap } from "lucide-react";

export function DashboardStats() {
  const { data: overview, isPending } = useDashboardOverview();

  return (
    <Loading isLoading={isPending}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Students"
          value={overview?.students || 0}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Total Teachers"
          value={overview?.teachers || 0}
          icon={<BookOpen className="h-6 w-6" />}
        />
        <StatsCard
          title="Classes"
          value={overview?.classes || 0}
          icon={<BarChart3 className="h-6 w-6" />}
        />
        <StatsCard
          title="Attendance Today"
          value={`${overview?.attendance || 0}%`}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatsCard
          title="Fee Collection"
          value={`KES ${(overview?.revenue || 0) / 1000000}M`}
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatsCard
          title="Active Courses"
          value="120"
          icon={<Zap className="h-6 w-6" />}
        />
      </div>
    </Loading>
  );
}
