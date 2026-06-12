import { apiClient } from "@/services/api-client";

export type AuthLoginPayload = {
  email: string;
  password: string;
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
    // Placeholder for backend authentication.
    await new Promise((resolve) => setTimeout(resolve, 250));
    return {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      user: {
        id: "user-001",
        name: "AfricaSchool Operator",
        email: payload.email,
        role: "Principal",
        department: "Leadership"
      }
    };
  },
  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post("/auth/refresh", { refreshToken });
    return response.data;
  }
};
