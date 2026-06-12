"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useCurrentSchoolStore } from "@/stores/current-school-store";
import { useThemeStore } from "@/stores/theme-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            refetchOnWindowFocus: false
          }
        }
      }),
    []
  );

  const { branding } = useCurrentSchoolStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    if (theme === "system") {
      const mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      if (mode === "dark") html.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", branding.primaryColor);
    root.style.setProperty("--secondary", branding.secondaryColor);
    root.style.setProperty("--ring", branding.primaryColor);
  }, [branding]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
