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
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-2 lg:items-center">
          <section className="order-2 lg:order-1">
            <div className="rounded-2xl bg-white/80 p-8 shadow-lg">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome to Elimu</h2>
              <p className="mt-4 text-lg text-slate-700">The Education OS built for African schools, networks, and governments — multi-tenant, secure, and extensible.</p>

              <ul className="mt-6 grid gap-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">• Multi-tenant SaaS with white-labeling</li>
                <li className="flex items-start gap-3">• Role-aware permissions and modular features</li>
                <li className="flex items-start gap-3">• Offline-capable workflows and advanced analytics</li>
              </ul>

              <div className="mt-6 flex gap-3">
                <Link href="/features" className="rounded-md px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50">
                  Explore features
                </Link>
                <Link href="/contact" className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                  Contact Sales
                </Link>
              </div>
            </div>
          </section>

          <section className="order-1 flex items-center justify-center lg:order-2">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
              {children}
            </div>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
