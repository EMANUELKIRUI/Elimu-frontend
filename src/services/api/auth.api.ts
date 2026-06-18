import { apiClient } from "@/services/api-client";

export type AuthLoginPayload = {
  identifier: string;
  password: string;
  schoolId?: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
  };
};

export const authApi = {
  login: async (payload: AuthLoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post("/auth/refresh", { refreshToken });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  forgotPassword: async (payload: { email?: string; phone?: string }) => {
    const response = await apiClient.post("/auth/forgot-password", payload);
    return response.data;
  },

  resetPassword: async (payload: { otp: string; password: string; confirmPassword: string }) => {
    const response = await apiClient.post("/auth/reset-password", payload);
    return response.data;
  },

  verifyMfa: async (payload: { code: string }) => {
    const response = await apiClient.post("/auth/mfa", payload);
    return response.data;
  }
};
