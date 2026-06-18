import { LandingFooter } from "@/components/public/landing-footer";
import Link from "next/link";

export function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-950">
            Elimu
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/book-demo" className="text-sm font-medium text-slate-700 transition hover:text-slate-950">
              Book Demo
            </Link>
            <Link href="/register-school" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700">
              Register School
            </Link>
          </div>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <div className="rounded-3xl bg-white shadow-lg">
            {children}
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
