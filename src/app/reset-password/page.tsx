import Link from "next/link";
import { LoginLayout } from "@/components/public/login-layout";

export default function ResetPasswordPage() {
  return (
    <LoginLayout>
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Reset password</p>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">Choose a new password</h1>
        <p className="mt-4 text-slate-600">Create a strong new password and secure your account.</p>
        <div className="mt-10 grid gap-4">
          <input
            type="password"
            placeholder="New password"
            className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button className="mx-auto inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90">
            Update password
          </button>
        </div>
        <Link href="/login" className="mt-8 inline-flex text-sm font-medium text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </LoginLayout>
  );
}
