"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/services/api/dashboard.api";

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: () => dashboardApi.getOverview()
  });
}

export function useDashboardActivities() {
  return useQuery({
    queryKey: ["dashboard", "activities"],
    queryFn: () => dashboardApi.getActivities()
  });
}

export function useDashboardEvents() {
  return useQuery({
    queryKey: ["dashboard", "events"],
    queryFn: () => dashboardApi.getUpcomingEvents()
  });
}

export function useDashboardNotifications() {
  return useQuery({
    queryKey: ["dashboard", "notifications"],
    queryFn: () => dashboardApi.getNotifications()
  });
}

export function useEnrollmentTrend() {
  return useQuery({
    queryKey: ["dashboard", "enrollment-trend"],
    queryFn: () => dashboardApi.getEnrollmentTrend()
  });
}

export function useAttendanceTrend() {
  return useQuery({
    queryKey: ["dashboard", "attendance-trend"],
    queryFn: () => dashboardApi.getAttendanceTrend()
  });
}

export function useRevenueTrend() {
  return useQuery({
    queryKey: ["dashboard", "revenue-trend"],
    queryFn: () => dashboardApi.getRevenueTrend()
  });
}
