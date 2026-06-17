"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/services/api/auth.api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email").optional(),
  phone: z.string().optional()
}).refine((data) => Boolean(data.email || data.phone), {
  message: "Please provide an email or phone number."
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "", phone: "" }
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setMessage(null);
    setIsSubmitting(true);

    try {
      await authApi.forgotPassword(data);
      setMessage("If the account exists, a password reset code has been sent to the provided contact.");
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Unable to process request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Forgot password</p>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">Reset your password</h1>
      <p className="mt-4 text-slate-600">Enter your email address or phone number and we&apos;ll send you a secure code to reset your password.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-4">
        <input
          type="email"
          placeholder="Email address"
          className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        <input
          type="tel"
          placeholder="Phone number"
          className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register("phone")}
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        <Button type="submit" className="mx-auto w-full max-w-md bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset code"}
        </Button>
      </form>
      {message && <p className="mt-6 text-sm text-slate-600">{message}</p>}
      <Link href={"/auth/login" as any} className="mt-8 inline-flex text-sm font-medium text-primary hover:underline">
        Back to login
      </Link>
    </div>
  );
}
