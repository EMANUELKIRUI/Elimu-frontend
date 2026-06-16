import Link from "next/link";
import { LoginLayout } from "@/components/public/login-layout";

export default function MfaPage() {
  return (
    <LoginLayout>
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Multi-factor authentication</p>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">One more step to secure access</h1>
        <p className="mt-4 text-slate-600">Enter the authentication code from your authenticator app or SMS message to continue.</p>
        <div className="mt-10 grid gap-4">
          <input
            type="text"
            placeholder="Authentication code"
            className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button className="mx-auto inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90">
            Verify code
          </button>
        </div>
        <Link href="/login" className="mt-8 inline-flex text-sm font-medium text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </LoginLayout>
  );
}
