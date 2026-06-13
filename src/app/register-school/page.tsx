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

const planFeatures = [
  "Institution setup in minutes",
  "Multiple user roles & permissions",
  "Secure school and admin portal",
  "Integrated reporting for growth"
];

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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-xl shadow-slate-200/60 lg:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">School Registration</p>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Launch a secure campus experience with Elimu.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Register your school, onboard your leadership team, and get access to a complete ERP suite built for modern education operations.</p>

            <div className="mt-12 grid gap-4">
              {planFeatures.map((feature) => (
                <div key={feature} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-slate-950">{feature}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature === planFeatures[0] ? "Start your registration with core fields and bring your campus online quickly." : feature === planFeatures[1] ? "Assign administrators, teachers, and finance staff the correct access levels." : feature === planFeatures[2] ? "Keep student, staff, and finance data safe in one central system." : "Measure performance with dashboards and classroom activity insights."}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-primary/5 p-8 text-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Worth noting</p>
              <p className="mt-4 text-base leading-7">Elimu is built to scale with every school. Start with the package that fits your current needs and upgrade when your campus grows.</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-xl shadow-slate-200/60 lg:p-12">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Get started</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-950">Register your school account</h2>
              <p className="mt-3 text-sm text-slate-600">Complete the form below and our team will activate your campus environment quickly.</p>
            </div>

            <form onSubmit={form.handleSubmit(() => undefined)} className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "School Name", name: "schoolName", type: "text" },
                  { label: "School Type", name: "schoolType", type: "text" },
                  { label: "Registration Number", name: "registrationNumber", type: "text" },
                  { label: "Country", name: "country", type: "text" },
                  { label: "County / Region", name: "region", type: "text" },
                  { label: "Address", name: "address", type: "text" }
                ].map((field) => (
                  <label key={field.name} className="grid gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">{field.label}</span>
                    <input
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      type={field.type}
                      {...form.register(field.name as any)}
                    />
                  </label>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-950">Administrator account</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Administrator Name", name: "adminName", type: "text" },
                    { label: "Administrator Email", name: "adminEmail", type: "email" },
                    { label: "Phone Number", name: "adminPhone", type: "tel" },
                    { label: "Password", name: "password", type: "password" },
                    { label: "Confirm Password", name: "confirmPassword", type: "password" }
                  ].map((field) => (
                    <label key={field.name} className="grid gap-2 text-sm text-slate-700">
                      <span className="font-medium text-slate-900">{field.label}</span>
                      <input
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        type={field.type}
                        {...form.register(field.name as any)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-950">Choose a package</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {(["Starter", "Standard", "Professional", "Enterprise"] as const).map((plan) => (
                    <label
                      key={plan}
                      className="flex cursor-pointer items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-900 transition hover:border-primary"
                    >
                      <input
                        type="radio"
                        value={plan}
                        className="h-4 w-4 accent-primary"
                        {...form.register("package")}
                      />
                      <span>{plan}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 text-sm text-slate-700">
                <label className="inline-flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" {...form.register("terms")} />
                  I agree to the <a href="/terms" className="font-medium text-primary underline">Terms and Conditions</a>.
                </label>
                <label className="inline-flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" {...form.register("privacy")} />
                  I agree to the <a href="/privacy" className="font-medium text-primary underline">Privacy Policy</a>.
                </label>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">You’ll receive a confirmation email once your school workspace is ready.</p>
                <Button type="submit" className="w-full sm:w-auto">
                  Create school account
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </LandingLayout>
  );
}
