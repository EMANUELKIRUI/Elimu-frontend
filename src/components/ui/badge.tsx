import * as React from "react";
import { cn } from "@/utils/cn";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "green" | "gold" | "red" | "blue" | "yellow" | "neutral";
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
        tone === "green" && "bg-emerald-100 text-emerald-800",
        tone === "gold" && "bg-amber-100 text-amber-800",
        tone === "red" && "bg-red-100 text-red-800",
        tone === "blue" && "bg-sky-100 text-sky-800",
        tone === "yellow" && "bg-amber-100 text-amber-800",
        tone === "neutral" && "bg-muted text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
