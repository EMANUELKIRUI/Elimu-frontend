"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/services/api/auth.api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const resetPasswordSchema = z.object({
  otp: z.string().min(4, "Enter the OTP code"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords must match"
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: "", password: "", confirmPassword: "" }
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setMessage(null);
    setIsSubmitting(true);

    try {
      await authApi.resetPassword({
        otp: data.otp,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      setMessage("Your password has been reset successfully. You can now log in.");
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Unable to reset password. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Reset password</p>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">Choose a new password</h1>
      <p className="mt-4 text-slate-600">Enter the OTP code sent to your contact and create a secure new password.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-4">
        <input
          type="text"
          placeholder="OTP code"
          className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register("otp")}
        />
        {errors.otp && <p className="text-sm text-red-600">{errors.otp.message}</p>}
        <input
          type="password"
          placeholder="New password"
          className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Confirm password"
          className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
        <Button type="submit" className="mx-auto w-full max-w-md bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update password"}
        </Button>
      </form>
      {message && <p className="mt-6 text-sm text-slate-600">{message}</p>}
      <Link href={"/auth/login" as any} className="mt-8 inline-flex text-sm font-medium text-primary hover:underline">
        Back to login
      </Link>
    </div>
  );
}
