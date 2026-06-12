"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LandingLayout } from "@/components/public/landing-layout";

const registerSchema = z.object({
  schoolName: z.string().min(3),
  schoolType: z.string().min(3),
  registrationNumber: z.string().min(3),
  country: z.string().min(2),
  region: z.string().min(2),
  address: z.string().min(5),
  adminName: z.string().min(3),
  adminEmail: z.string().email(),
  adminPhone: z.string().min(9),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  package: z.enum(["Starter", "Standard", "Professional", "Enterprise"]),
  terms: z.boolean().refine((value) => value, { message: "You must accept the terms." }),
  privacy: z.boolean().refine((value) => value, { message: "You must accept the privacy policy." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match.",
  path: ["confirmPassword"]
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterSchoolPage() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      schoolName: "",
      schoolType: "",
      registrationNumber: "",
      country: "Kenya",
      region: "",
      address: "",
      adminName: "",
      adminEmail: "",
      adminPhone: "",
      password: "",
      confirmPassword: "",
      package: "Starter",
      terms: false,
      privacy: false
    }
  });

  return (
    <LandingLayout>
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Register School</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">Create your school account in minutes.</h1>
          <p className="mt-3 text-slate-600">Register your institution, choose a package and invite your admin team to start using Elimu.</p>
        </div>

        <form onSubmit={form.handleSubmit(() => undefined)} className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">School Information</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: "School Name", name: "schoolName", type: "text" },
                { label: "School Type", name: "schoolType", type: "text" },
                { label: "Registration Number", name: "registrationNumber", type: "text" },
                { label: "Country", name: "country", type: "text" },
                { label: "County/Region", name: "region", type: "text" },
                { label: "Address", name: "address", type: "text" }
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
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">Administrator Information</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Full Name", name: "adminName", type: "text" },
                { label: "Email", name: "adminEmail", type: "email" },
                { label: "Phone Number", name: "adminPhone", type: "tel" },
                { label: "Password", name: "password", type: "password" },
                { label: "Confirm Password", name: "confirmPassword", type: "password" }
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
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">Package Selection</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(["Starter", "Standard", "Professional", "Enterprise"] as const).map((plan) => (
                <label key={plan} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-900">
                  <input
                    type="radio"
                    value={plan}
                    className="mr-3"
                    {...form.register("package")}
                  />
                  {plan}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-4 text-sm text-slate-700">
            <label className="inline-flex items-center gap-3">
              <input type="checkbox" {...form.register("terms")} />
              I agree to the <a href="/terms" className="text-primary underline">Terms and Conditions</a>.
            </label>
            <label className="inline-flex items-center gap-3">
              <input type="checkbox" {...form.register("privacy")} />
              I agree to the <a href="/privacy" className="text-primary underline">Privacy Policy</a>.
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">After submission, we will create your school workspace and redirect you to login.</p>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </LandingLayout>
  );
}
