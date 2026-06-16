"use client";

import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  backButton?: boolean;
  onBack?: () => void;
}

export function PageHeader({ title, description, icon, actions, backButton, onBack }: PageHeaderProps) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="flex items-start justify-between gap-4 px-6 py-6 sm:px-8">
        <div className="flex items-start gap-4">
          {backButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-10 w-10 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          {icon && <div className="text-slate-400">{icon}</div>}
          <div>
            <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
            {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
