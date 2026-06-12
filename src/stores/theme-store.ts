import { create } from "zustand";

type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

function readStoredTheme(): ThemeMode {
  try {
    if (typeof window === "undefined") return "light";
    const t = localStorage.getItem("elimu:theme") as ThemeMode | null;
    return t ?? "light";
  } catch {
    return "light";
  }
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: readStoredTheme(),
  setTheme: (theme) => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("elimu:theme", theme);
    } catch {
      /* ignore */
    }
    set({ theme });
  }
}));
