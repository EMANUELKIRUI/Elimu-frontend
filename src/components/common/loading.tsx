"use client";

import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}

interface LoadingProps {
  isLoading: boolean;
  children: ReactNode;
  fullPage?: boolean;
}

export function Loading({ isLoading, children, fullPage }: LoadingProps) {
  if (isLoading) {
    return fullPage ? <PageLoader /> : <LoadingSpinner />;
  }
  return <>{children}</>;
}
