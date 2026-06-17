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
  rememberSession: boolean;
  login: (user: AuthUser, accessToken: string, refreshToken: string, rememberSession: boolean) => void;
  logout: () => void;
  refreshSession: (accessToken: string, refreshToken: string) => void;
  validateSession: () => boolean;
  setRole: (role: Role) => void;
};

const STORAGE_KEYS = {
  user: "elimu_user",
  accessToken: "elimu_access_token",
  refreshToken: "elimu_refresh_token"
};

const getStoredAuth = () => {
  if (typeof window === "undefined") {
    return {
      user: undefined,
      accessToken: undefined,
      refreshToken: undefined,
      isAuthenticated: false,
      role: "Principal" as Role,
      userName: "",
      department: "",
      rememberSession: true
    };
  }

  const storedUser = window.localStorage.getItem(STORAGE_KEYS.user) ?? window.sessionStorage.getItem(STORAGE_KEYS.user);
  const storedAccessToken = window.localStorage.getItem(STORAGE_KEYS.accessToken) ?? window.sessionStorage.getItem(STORAGE_KEYS.accessToken) ?? undefined;
  const storedRefreshToken = window.localStorage.getItem(STORAGE_KEYS.refreshToken) ?? window.sessionStorage.getItem(STORAGE_KEYS.refreshToken) ?? undefined;
  const user = storedUser ? (JSON.parse(storedUser) as AuthUser) : undefined;
  const isAuthenticated = Boolean(storedAccessToken);
  const rememberSession = Boolean(window.localStorage.getItem(STORAGE_KEYS.accessToken));

  return {
    user,
    accessToken: storedAccessToken,
    refreshToken: storedRefreshToken,
    isAuthenticated,
    role: user?.role ?? ("Principal" as Role),
    userName: user?.name ?? "",
    department: user?.department ?? "",
    rememberSession
  };
};

const saveAuth = (user: AuthUser | undefined, accessToken?: string, refreshToken?: string, rememberSession = true) => {
  if (typeof window === "undefined") return;

  const activeStorage = rememberSession ? window.localStorage : window.sessionStorage;
  const inactiveStorage = rememberSession ? window.sessionStorage : window.localStorage;

  inactiveStorage.removeItem(STORAGE_KEYS.user);
  inactiveStorage.removeItem(STORAGE_KEYS.accessToken);
  inactiveStorage.removeItem(STORAGE_KEYS.refreshToken);

  if (accessToken) {
    activeStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
    document.cookie = `elimu_token=${accessToken}; path=/; ${rememberSession ? "max-age=604800;" : ""}`;
  } else {
    activeStorage.removeItem(STORAGE_KEYS.accessToken);
    document.cookie = "elimu_token=; path=/; max-age=0";
  }

  if (refreshToken) {
    activeStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  } else {
    activeStorage.removeItem(STORAGE_KEYS.refreshToken);
  }

  if (user) {
    activeStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  } else {
    activeStorage.removeItem(STORAGE_KEYS.user);
  }
};

export const useAuthStore = create<AuthState>((set, get) => {
  const stored = getStoredAuth();

  return {
    ...stored,
    login: (user, accessToken, refreshToken, rememberSession) => {
      saveAuth(user, accessToken, refreshToken, rememberSession);
      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        role: user.role,
        userName: user.name,
        department: user.department,
        rememberSession
      });
    },
    logout: () => {
      saveAuth(undefined, undefined, undefined, true);
      set({
        user: undefined,
        accessToken: undefined,
        refreshToken: undefined,
        isAuthenticated: false,
        role: "Principal",
        userName: "",
        department: "",
        rememberSession: true
      });
    },
    refreshSession: (accessToken, refreshToken) => {
      saveAuth(get().user, accessToken, refreshToken, get().rememberSession);
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
