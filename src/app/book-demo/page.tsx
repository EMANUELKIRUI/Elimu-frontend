"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LandingLayout } from "@/components/public/landing-layout";

const demoSchema = z.object({
  schoolName: z.string().min(3),
  contactPerson: z.string().min(3),
  phone: z.string().min(9),
  email: z.string().email(),
  preferredDate: z.string().min(3),
  preferredTime: z.string().min(3)
});

type DemoForm = z.infer<typeof demoSchema>;

export default function BookDemoPage() {
  const form = useForm<DemoForm>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      schoolName: "",
      contactPerson: "",
      phone: "",
      email: "",
      preferredDate: "",
      preferredTime: ""
    }
  });

  return (
    <LandingLayout>
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Book Demo</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">Book a demo with our team.</h1>
          <p className="mt-3 text-slate-600">Pick a convenient date and time, and we’ll show you how Elimu works for your school.</p>
        </div>

        <form onSubmit={form.handleSubmit(() => undefined)} className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          {[
            { label: "School Name", name: "schoolName", type: "text" },
            { label: "Contact Person", name: "contactPerson", type: "text" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Email", name: "email", type: "email" },
            { label: "Preferred Date", name: "preferredDate", type: "date" },
            { label: "Preferred Time", name: "preferredTime", type: "time" }
          ].map((field) => (
            <label key={field.name} className="grid gap-2 text-sm text-slate-700">
              <span>{field.label}</span>
              <input
                className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900"
                type={field.type}
                {...form.register(field.name as any)}
              />
            </label>
          ))}

          <Button type="submit" className="w-full">Request Demo</Button>
        </form>
      </div>
    </LandingLayout>
  );
}
