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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import type { Role } from "@/types";

const loginMethodEnum = z.enum(["email", "username", "schoolCode"]);

type LoginMethod = z.infer<typeof loginMethodEnum>;

const loginSchema = z
  .object({
    loginMethod: loginMethodEnum,
    email: z.string().email("Enter a valid email").optional(),
    username: z.string().min(3, "Enter your username").optional(),
    schoolCode: z.string().min(3, "Enter your school code").optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    school: z.string().min(1, "Select your school")
  })
  .superRefine((data, ctx) => {
    if (data.loginMethod === "email" && !data.email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: "Email is required for email login." });
    }
    if (data.loginMethod === "username" && !data.username) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["username"], message: "Username is required for username login." });
    }
    if (data.loginMethod === "schoolCode" && !data.schoolCode) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["schoolCode"], message: "School code is required for school code login." });
    }
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
      loginMethod: "email",
      email: "",
      username: "",
      schoolCode: "",
      password: "",
      school: schools[0]?.id ?? ""
    }
  });

  const loginMethod = form.watch("loginMethod");

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);
    setIsSubmitting(true);

    const identifier = data.loginMethod === "email" ? data.email ?? "" : data.loginMethod === "username" ? data.username ?? "" : data.schoolCode ?? "";

    try {
      const result = await authApi.login({
        identifier,
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
    <main className="min-h-screen bg-slate-950 text-slate-900" aria-label="Elimu login page">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 overflow-hidden rounded-[2rem] bg-white/95 shadow-[0_80px_120px_-40px_rgba(15,23,42,0.25)] backdrop-blur-sm md:grid-cols-[1.2fr_0.9fr] lg:gap-12">
            <section className="flex flex-col justify-between gap-8 p-8 sm:p-10 lg:p-12">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-slate-950/20">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-slate-950">E</span>
                  Elimu Education OS
                </div>

                <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Welcome back to your school dashboard.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  Sign in securely with your school account to manage attendance, academics, finance, and communication.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Fast access", body: "Sign in with email, username, or school code in a few clicks." },
                  { title: "School-specific roles", body: "Principals, teachers, and staff get the exact tools they need." },
                  { title: "Secure sessions", body: "Keep your account safe with modern password controls." },
                  { title: "Responsive experience", body: "The login page works smoothly on phones, tablets, and desktops." }
                ].map((feature) => (
                  <div key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <h2 className="text-lg font-semibold text-slate-950">{feature.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{feature.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-8 sm:p-10 lg:p-12">
              <div className="mb-8 rounded-3xl bg-slate-950/95 p-6 text-white shadow-lg shadow-slate-950/20 sm:p-8">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">School login</p>
                <h2 className="mt-4 text-3xl font-black">Sign in to your workspace</h2>
                <p className="mt-3 text-sm text-slate-300">Use your credentials and school account to access your institution dashboard.</p>
              </div>

              <Card className="overflow-hidden">
                <CardHeader className="bg-slate-950 text-white">
                  <div>
                    <CardTitle className="text-2xl">Login to Elimu</CardTitle>
                    <CardDescription className="text-slate-300">Secure access with flexible identifier options and MFA support.</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-6 p-8">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
                    <fieldset className="grid gap-3 text-sm text-slate-700">
                      <legend className="font-semibold text-slate-900">Login method</legend>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {([
                          { value: "email", label: "Email" },
                          { value: "username", label: "Username" },
                          { value: "schoolCode", label: "School code" }
                        ] as const).map((option) => (
                          <label
                            key={option.value}
                            htmlFor={`login-method-${option.value}`}
                            className={
                              "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition focus-within:ring-2 focus-within:ring-primary/30 " +
                              (loginMethod === option.value
                                ? "border-primary bg-primary/10 text-slate-900 shadow-sm"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300")
                            }
                          >
                            <input
                              id={`login-method-${option.value}`}
                              type="radio"
                              value={option.value}
                              {...form.register("loginMethod")}
                              className="h-4 w-4 accent-primary"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {loginMethod === "email" ? (
                      <label htmlFor="login-email" className="grid gap-2 text-sm text-slate-700">
                        <span>Email</span>
                        <input
                          id="login-email"
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="name@school.org"
                          autoComplete="email"
                          {...form.register("email")}
                          aria-invalid={form.formState.errors.email ? "true" : "false"}
                          aria-describedby={form.formState.errors.email ? "login-email-error" : undefined}
                        />
                        {form.formState.errors.email && (
                          <span id="login-email-error" className="text-sm text-red-600">
                            {form.formState.errors.email.message}
                          </span>
                        )}
                      </label>
                    ) : loginMethod === "username" ? (
                      <label htmlFor="login-username" className="grid gap-2 text-sm text-slate-700">
                        <span>Username</span>
                        <input
                          id="login-username"
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="schooladmin"
                          autoComplete="username"
                          {...form.register("username")}
                          aria-invalid={form.formState.errors.username ? "true" : "false"}
                          aria-describedby={form.formState.errors.username ? "login-username-error" : undefined}
                        />
                        {form.formState.errors.username && (
                          <span id="login-username-error" className="text-sm text-red-600">
                            {form.formState.errors.username.message}
                          </span>
                        )}
                      </label>
                    ) : (
                      <label htmlFor="login-school-code" className="grid gap-2 text-sm text-slate-700">
                        <span>School code</span>
                        <input
                          id="login-school-code"
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="STMARYS123"
                          autoComplete="organization"
                          {...form.register("schoolCode")}
                          aria-invalid={form.formState.errors.schoolCode ? "true" : "false"}
                          aria-describedby={form.formState.errors.schoolCode ? "login-school-code-error" : undefined}
                        />
                        {form.formState.errors.schoolCode && (
                          <span id="login-school-code-error" className="text-sm text-red-600">
                            {form.formState.errors.schoolCode.message}
                          </span>
                        )}
                      </label>
                    )}

                    <label htmlFor="login-password" className="grid gap-2 text-sm text-slate-700">
                      <span>Password</span>
                      <div className="relative">
                        <input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          {...form.register("password")}
                          aria-invalid={form.formState.errors.password ? "true" : "false"}
                          aria-describedby={form.formState.errors.password ? "login-password-error" : undefined}
                        />
                        <button
                          type="button"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((current) => !current)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-900"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {form.formState.errors.password && (
                        <span id="login-password-error" className="text-sm text-red-600">
                          {form.formState.errors.password.message}
                        </span>
                      )}
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2 text-sm text-slate-700">
                        <span>School</span>
                        <SelectField
                          label="School"
                          variant="light"
                          value={form.watch("school")}
                          options={schools.map((school) => ({ label: school.name, value: school.id }))}
                          onValueChange={(value) => form.setValue("school", value)}
                        />
                      </div>
                      <label className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(event) => setRememberMe(event.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        Remember me
                      </label>
                    </div>

                    {errorMessage && (
                      <div role="alert" aria-live="assertive" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid gap-4">
                      <Button
                        type="submit"
                        className="w-full rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                      >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                      </Button>
                      <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                          Don&apos;t have access?{' '}
                          <Link href="/register-school" className="font-semibold text-primary hover:underline">
                            Register your school
                          </Link>
                        </p>
                        <Link href={"/auth/forgot-password" as any} className="font-medium text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
