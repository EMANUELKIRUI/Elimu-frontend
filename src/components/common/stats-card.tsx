"use client";

import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: number; direction: "up" | "down" };
  className?: string;
}

export function StatsCard({ title, value, icon, trend, className = "" }: StatsCardProps) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
          {trend && (
            <p className={`mt-2 text-sm font-medium ${trend.direction === "up" ? "text-green-600" : "text-red-600"}`}>
              {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
    </div>
  );
}
