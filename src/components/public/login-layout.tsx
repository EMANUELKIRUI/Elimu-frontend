import { LandingFooter } from "@/components/public/landing-footer";
import Link from "next/link";

export function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-950">
            Elimu
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/register-school" className="text-sm font-medium text-slate-700 transition hover:text-slate-950">
              Register School
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <LandingFooter />
    </div>
  );
}
