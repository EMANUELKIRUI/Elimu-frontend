"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

type Option = {
  label: string;
  value: string;
};

export function SelectField({
  label,
  value,
  options,
  onValueChange
}: {
  label: string;
  value: string;
  options: Option[];
  onValueChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-white/65">{label}</span>
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger className="flex h-11 items-center justify-between rounded-md border border-white/15 bg-white/10 px-3 text-left text-sm text-white outline-none focus:ring-2 focus:ring-secondary">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <ChevronDown className="h-4 w-4" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="z-50 overflow-hidden rounded-md border bg-card shadow-operational">
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-3 text-sm outline-none focus:bg-muted"
                  )}
                >
                  <SelectPrimitive.ItemIndicator className="absolute left-2">
                    <Check className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </label>
  );
}
