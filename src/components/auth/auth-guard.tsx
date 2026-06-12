"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && pathname === "/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
