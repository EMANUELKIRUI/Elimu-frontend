import { create } from "zustand";
import type { Role } from "@/types";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
};

type AuthState = {
  user?: AuthUser;
  accessToken?: string;
  refreshToken?: string;
  isAuthenticated: boolean;
  role: Role;
  userName: string;
  department: string;
  login: (user: AuthUser, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshSession: (accessToken: string, refreshToken: string) => void;
  validateSession: () => boolean;
  setRole: (role: Role) => void;
};

const getStoredAuth = () => {
  if (typeof window === "undefined") return {
    user: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    isAuthenticated: false,
    role: "Principal" as Role,
    userName: "",
    department: ""
  };

  const storedUser = window.localStorage.getItem("elimu_user");
  const storedAccessToken = window.localStorage.getItem("elimu_access_token") ?? undefined;
  const storedRefreshToken = window.localStorage.getItem("elimu_refresh_token") ?? undefined;
  const user = storedUser ? JSON.parse(storedUser) as AuthUser : undefined;
  const isAuthenticated = Boolean(storedAccessToken);

  return {
    user,
    accessToken: storedAccessToken,
    refreshToken: storedRefreshToken,
    isAuthenticated,
    role: user?.role ?? "Principal" as Role,
    userName: user?.name ?? "",
    department: user?.department ?? ""
  };
};

const saveAuth = (user: AuthUser | undefined, accessToken?: string, refreshToken?: string) => {
  if (typeof window === "undefined") return;
  if (accessToken) {
    localStorage.setItem("elimu_access_token", accessToken);
    document.cookie = `elimu_token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
  } else {
    localStorage.removeItem("elimu_access_token");
    document.cookie = "elimu_token=; path=/; max-age=0";
  }

  if (refreshToken) {
    localStorage.setItem("elimu_refresh_token", refreshToken);
  } else {
    localStorage.removeItem("elimu_refresh_token");
  }

  if (user) {
    localStorage.setItem("elimu_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("elimu_user");
  }
};

export const useAuthStore = create<AuthState>((set, get) => {
  const stored = getStoredAuth();

  return {
    ...stored,
    login: (user, accessToken, refreshToken) => {
      saveAuth(user, accessToken, refreshToken);
      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        role: user.role,
        userName: user.name,
        department: user.department
      });
    },
    logout: () => {
      saveAuth(undefined, undefined, undefined);
      set({
        user: undefined,
        accessToken: undefined,
        refreshToken: undefined,
        isAuthenticated: false,
        role: "Principal",
        userName: "",
        department: ""
      });
    },
    refreshSession: (accessToken, refreshToken) => {
      saveAuth(get().user, accessToken, refreshToken);
      set({ accessToken, refreshToken, isAuthenticated: true });
    },
    validateSession: () => {
      const { accessToken, refreshToken } = get();
      return Boolean(accessToken && refreshToken);
    },
    setRole: (role) =>
      set({
        role,
        department:
          role === "Bursar"
            ? "Finance"
            : role.includes("Academics")
              ? "Academics"
              : role.includes("Administration")
                ? "Administration"
                : role.includes("HOD")
                  ? role.replace(" HOD", "")
                  : "Leadership"
      })
  };
});
