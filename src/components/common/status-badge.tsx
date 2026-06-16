"use client";

import { AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  const styles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    success: { bg: "bg-green-100", text: "text-green-800", icon: <CheckCircle className="h-3 w-3" /> },
    warning: { bg: "bg-yellow-100", text: "text-yellow-800", icon: <AlertTriangle className="h-3 w-3" /> },
    error: { bg: "bg-red-100", text: "text-red-800", icon: <AlertCircle className="h-3 w-3" /> },
    info: { bg: "bg-blue-100", text: "text-blue-800", icon: <Info className="h-3 w-3" /> },
    default: { bg: "bg-slate-100", text: "text-slate-800", icon: <Info className="h-3 w-3" /> }
  };

  const style = styles[variant] || styles.default;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${style.bg} ${style.text}`}>
      {style.icon}
      {status}
    </span>
  );
}
