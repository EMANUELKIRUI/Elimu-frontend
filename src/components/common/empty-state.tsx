"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
      {icon && <div className="mb-4 text-slate-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      {action && (
        <Button
          onClick={action.onClick}
          className="mt-6 bg-red-600 hover:bg-red-700"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
