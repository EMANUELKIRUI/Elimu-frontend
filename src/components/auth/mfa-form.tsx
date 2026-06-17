"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/services/api/auth.api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const mfaSchema = z.object({
  code: z.string().min(4, "Enter the authentication code")
});

type MfaFormValues = z.infer<typeof mfaSchema>;

export function MfaForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<MfaFormValues>({
    resolver: zodResolver(mfaSchema),
    defaultValues: { code: "" }
  });

  const onSubmit = async (data: MfaFormValues) => {
    setMessage(null);
    setIsSubmitting(true);

    try {
      await authApi.verifyMfa({ code: data.code });
      setMessage("MFA verified successfully. Redirecting to dashboard...");
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Unable to verify code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Multi-factor authentication</p>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">One more step to secure access</h1>
      <p className="mt-4 text-slate-600">Enter the authentication code from your authenticator app or SMS message to continue.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-4">
        <input
          type="text"
          placeholder="Authentication code"
          className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register("code")}
        />
        {errors.code && <p className="text-sm text-red-600">{errors.code.message}</p>}
        <Button type="submit" className="mx-auto w-full max-w-md bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify code"}
        </Button>
      </form>
      {message && <p className="mt-6 text-sm text-slate-600">{message}</p>}
      <Link href={"/auth/login" as any} className="mt-8 inline-flex text-sm font-medium text-primary hover:underline">
        Back to login
      </Link>
    </div>
  );
}
