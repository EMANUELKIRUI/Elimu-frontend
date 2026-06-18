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

      <main className="flex min-h-[calc(100vh-72px)] items-center">
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <section className="order-2 lg:order-1 flex items-center justify-center">
            <div className="w-full rounded-[2rem] bg-slate-950/95 p-10 text-white shadow-2xl sm:p-12 lg:p-14">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">School login</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">Sign in to access your school workspace and manage students, staff, attendance, and reports.</p>
            </div>
          </section>

          <section className="order-1 flex items-center justify-center lg:order-2">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-2xl sm:p-12 lg:p-14">
              {children}
            </div>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
