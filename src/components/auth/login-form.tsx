"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi, type AuthLoginPayload } from "@/services/api/auth.api";
import { useAuthStore } from "@/stores/auth-store";
import { useCurrentSchoolStore, schools } from "@/stores/current-school-store";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import type { Role } from "@/types";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  school: z.string().min(1, "Select your school")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const setSchool = useCurrentSchoolStore((state) => state.setSchool);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@africaschool.local",
      password: "secret123",
      school: schools[0]?.id ?? ""
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await authApi.login({
        email: data.email,
        password: data.password,
        schoolId: data.school
      });

      login(
        {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role as Role,
          department: result.user.department
        },
        result.accessToken,
        result.refreshToken,
        rememberMe
      );
      setSchool(data.school);
      router.push("/dashboard");
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to log in right now. Please check your credentials and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-10 text-white shadow-xl shadow-slate-950/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_35%)]" />
          <div className="relative z-10 flex flex-col justify-between h-full gap-8">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-3xl font-black text-cyan-300">E</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Elimu Education OS</p>
                  <h2 className="mt-2 text-3xl font-black sm:text-4xl">Nairobi Hills Academy</h2>
                </div>
              </div>
              <p className="max-w-xl text-base leading-7 text-slate-200">
                Access admissions, academics, attendance, finance, and transport from a single secure school operating system.
              </p>
            </div>

            <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-sm shadow-lg shadow-slate-950/20">
              <p className="font-semibold text-cyan-300">Announcements</p>
              <ul className="space-y-3 text-slate-300">
                <li>• New term classes open for enrollment.</li>
                <li>• Fee payment deadlines set for 30th June.</li>
                <li>• Accepting student transfer requests through the portal.</li>
              </ul>
            </div>

            <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-sm shadow-lg shadow-slate-950/20">
              <p className="font-semibold text-cyan-300">School Resources</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span>Dashboard access</span>
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Live</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span>Student records</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">Secure</span>
              </div>
            </div>
          </div>
        </section>

        <Card className="overflow-hidden">
          <CardHeader className="bg-red-600 text-white">
            <div>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription className="text-slate-200">Sign in to continue managing your school with confidence.</CardDescription>
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
                {form.formState.errors.email && <span className="text-sm text-red-600">{form.formState.errors.email.message}</span>}
              </label>

              <label className="grid gap-2 text-sm text-slate-700">
                <span>Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {form.formState.errors.password && <span className="text-sm text-red-600">{form.formState.errors.password.message}</span>}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="School"
                  value={form.watch("school")}
                  options={schools.map((school) => ({ label: school.name, value: school.id }))}
                  onValueChange={(value) => form.setValue("school", value)}
                />
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  Remember me
                </label>
              </div>

              {errorMessage && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>}

              <div className="grid gap-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Don&apos;t have access?{' '}
                    <Link href="/register-school" className="font-semibold text-primary hover:underline">
                      Register your school.
                    </Link>
                  </p>
                  <Button type="submit" className="min-w-[160px] bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Login"}
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <Link href={"/auth/forgot-password" as any} className="text-sm font-medium text-primary transition hover:underline">
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
