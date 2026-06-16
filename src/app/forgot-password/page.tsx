import Link from "next/link";
import { LoginLayout } from "@/components/public/login-layout";

export default function ForgotPasswordPage() {
  return (
    <LoginLayout>
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Forgot password</p>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">Reset your password</h1>
        <p className="mt-4 text-slate-600">Enter your email address and we&apos;ll send you a secure link to reset your password.</p>
        <div className="mt-10 grid gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button className="mx-auto inline-flex rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
            Send reset link
          </button>
        </div>
        <Link href="/login" className="mt-8 inline-flex text-sm font-medium text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </LoginLayout>
  );
}
