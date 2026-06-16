"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/stores/auth-store";
import { useCurrentSchoolStore, schools } from "@/stores/current-school-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectField } from "@/components/ui/select";

const roles = [
  "Platform Admin",
  "School Admin",
  "Principal",
  "Deputy Principal Academics",
  "Deputy Principal Administration",
  "Bursar",
  "Teacher",
  "HOD",
  "Board Chairperson",
  "Boarding HOD",
  "Transport HOD",
  "Discipline HOD"
] as const;

type RoleOption = (typeof roles)[number];

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(roles),
  school: z.string()
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const setSchool = useCurrentSchoolStore((state) => state.setSchool);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@africaschool.local",
      password: "secret123",
      role: "Principal",
      school: schools[0].id
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    login(
      {
        id: "user-001",
        name: "AfricaSchool Operator",
        email: data.email,
        role: data.role,
        department: data.role === "Bursar" ? "Finance" : data.role.includes("Academics") ? "Academics" : data.role.includes("Administration") ? "Administration" : data.role.includes("HOD") ? data.role.replace(" HOD", "") : "Leadership"
      },
      "mock-access-token",
      "mock-refresh-token"
    );
    setSchool(data.school);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section className="rounded-[2rem] border border-slate-200/70 bg-white p-10 shadow-xl shadow-slate-200/60">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">School login</p>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Secure access for your campus team.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">Sign in to Elimu and manage admissions, classrooms, finances, and communication from one powerful school ERP.</p>
          </div>

          <div className="mt-10 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-950">Role-aware permissions</p>
              <p className="mt-3 text-slate-600">Every team member sees the right tools for their job.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-950">School context</p>
              <p className="mt-3 text-slate-600">Choose the correct campus and continue with confidence.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-950">Transparent controls</p>
              <p className="mt-3 text-slate-600">Get access to the modules and reports your role needs most.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-950">Trusted by schools</p>
              <p className="mt-3 text-slate-600">Designed for administrators, teachers, and leadership teams.</p>
            </div>
          </div>
        </section>

        <Card className="overflow-hidden">
          <CardHeader className="bg-red-600 text-white">
            <div>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription className="text-slate-200">Sign in to continue managing your school with precision.</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="grid gap-6 p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
              <label className="grid gap-2 text-sm text-slate-700">
                <span>Email</span>
                <input
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...form.register("email")}
                />
              </label>

              <label className="grid gap-2 text-sm text-slate-700">
                <span>Password</span>
                <input
                  type="password"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...form.register("password")}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Role"
                  value={form.watch("role")}
                  options={roles.map((item) => ({ label: item, value: item }))}
                  onValueChange={(value) => form.setValue("role", value as RoleOption)}
                />
                <SelectField
                  label="School"
                  value={form.watch("school")}
                  options={schools.map((school) => ({ label: school.name, value: school.id }))}
                  onValueChange={(value) => form.setValue("school", value)}
                />
              </div>

              <div className="grid gap-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Need access?{' '}
                    <Link href="/register-school" className="font-semibold text-primary hover:underline">
                      Register your school.
                    </Link>
                  </p>
                  <Button type="submit" className="min-w-[160px] bg-red-600 hover:bg-red-700 text-white">
                    Login
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <Link href="/forgot-password" className="text-sm font-medium text-primary transition hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
