import { DashboardOverview, Activity, CalendarEvent, Notification } from "@/types/modules";
import { apiClient } from "@/services/api-client";

export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    return apiClient.get("/dashboard/overview");
  },

  getActivities: async (): Promise<Activity[]> => {
    return apiClient.get("/activities/recent");
  },

  getUpcomingEvents: async (): Promise<CalendarEvent[]> => {
    return apiClient.get("/calendar/upcoming");
  },

  getNotifications: async (): Promise<Notification[]> => {
    return apiClient.get("/notifications");
  },

  getEnrollmentTrend: async () => {
    return apiClient.get("/analytics/enrollment");
  },

  getAttendanceTrend: async () => {
    return apiClient.get("/analytics/attendance");
  },

  getRevenueTrend: async () => {
    return apiClient.get("/analytics/revenue");
  }
};
