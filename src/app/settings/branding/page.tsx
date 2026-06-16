"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentSchoolStore } from "@/stores/current-school-store";
import { fetchBranding, saveBranding } from "@/services/branding-api";
import { Button } from "@/components/ui/button";

const schema = z.object({
  logo: z.string().optional(),
  primaryColor: z.string().min(3),
  secondaryColor: z.string().min(3)
});

type FormValues = z.infer<typeof schema>;

export default function BrandingSettingsPage() {
  const schoolId = useCurrentSchoolStore((s) => s.schoolId);
  const setBranding = useCurrentSchoolStore((s) => s.setBranding);
  const queryClient = useQueryClient();

  const { data: remoteBranding } = useQuery({
    queryKey: ["branding", schoolId],
    queryFn: () => fetchBranding(schoolId),
    enabled: Boolean(schoolId)
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) => saveBranding(schoolId, values),
    onSuccess(data) {
      setBranding({
        logo: data.logo,
        primaryColor: data.primaryColor ?? getComputedPrimaryToken(),
        secondaryColor: data.secondaryColor ?? getComputedSecondaryToken()
      });
      queryClient.invalidateQueries({ queryKey: ["branding", schoolId] });
    }
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      logo: "",
      primaryColor: getComputedPrimaryToken(),
      secondaryColor: getComputedSecondaryToken()
    }
  });

  useEffect(() => {
    if (remoteBranding) {
      form.reset({
        logo: remoteBranding.logo ?? "",
        primaryColor: remoteBranding.primaryColor ?? getComputedPrimaryToken(),
        secondaryColor: remoteBranding.secondaryColor ?? getComputedSecondaryToken()
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteBranding]);

  function getComputedPrimaryToken() {
    return getCssVar("--primary") || "12 65% 33%";
  }

  function getComputedSecondaryToken() {
    return getCssVar("--secondary") || "25 30% 60%";
  }

  function getCssVar(name: string) {
    if (typeof window === "undefined") return undefined;
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">Tenant Branding</h1>
      <p className="mt-2 text-sm text-slate-600">Customize branding for the current tenant (school).</p>

      <form
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        className="mt-6 grid gap-4"
      >
        <label className="grid gap-2 text-sm">
          <span>Logo URL</span>
          <input {...form.register("logo")} className="h-10 w-full rounded-md border px-3" />
        </label>

        <label className="grid gap-2 text-sm">
          <span>Primary color (HSL token or hex)</span>
          <input {...form.register("primaryColor")} className="h-10 w-full rounded-md border px-3" />
        </label>

        <label className="grid gap-2 text-sm">
          <span>Secondary color (HSL token or hex)</span>
          <input {...form.register("secondaryColor")} className="h-10 w-full rounded-md border px-3" />
        </label>

        <div className="flex items-center gap-3">
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">Save branding</Button>
          {mutation.isPending ? <span className="text-sm text-slate-500">Saving…</span> : null}
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-sm font-semibold">Preview</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-16 w-16 flex-shrink-0 rounded-md bg-[color:var(--primary)]" />
          <div>
            <div className="text-sm font-bold">Preview Title</div>
            <div className="text-xs text-slate-500">Preview subtitle · {schoolId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
