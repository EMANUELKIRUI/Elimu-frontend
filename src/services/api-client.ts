import axios from "axios";
import { useAuthStore } from "@/stores/auth-store";
import { useCurrentSchoolStore } from "@/stores/current-school-store";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  const tenantId = useCurrentSchoolStore.getState().schoolId;
  const accessToken = useAuthStore.getState().accessToken;

  if (config.headers) {
    config.headers["X-Client-App"] = "elimu-frontend";
    config.headers["X-Tenant-ID"] = tenantId;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return config;
});
