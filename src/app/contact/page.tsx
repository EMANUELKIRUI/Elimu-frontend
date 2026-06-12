"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LandingLayout } from "@/components/public/landing-layout";

const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(9),
  school: z.string().min(2),
  message: z.string().min(10)
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", school: "", message: "" }
  });

  return (
    <LandingLayout>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Contact Us</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-950">Reach out for support, demo or school onboarding.</h1>
            <p className="mt-4 text-slate-600">Send us a message and our team will respond within one business day.</p>

            <div className="mt-10 space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Contact details</p>
              <p>Email: support@elimu.africa</p>
              <p>Phone: +254 700 000 000</p>
              <p>WhatsApp: +254 700 000 000</p>
              <p>Office: Nairobi, Kenya</p>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(() => undefined)} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-4">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone", name: "phone", type: "tel" },
                { label: "School", name: "school", type: "text" }
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

              <label className="grid gap-2 text-sm text-slate-700">
                <span>Message</span>
                <textarea
                  className="min-h-[140px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                  {...form.register("message")}
                />
              </label>

              <Button type="submit" className="w-full">Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </LandingLayout>
  );
}
