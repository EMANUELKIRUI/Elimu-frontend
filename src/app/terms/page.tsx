import { LandingLayout } from "@/components/public/landing-layout";

export default function TermsPage() {
  return (
    <LandingLayout>
      <div className="mx-auto max-w-5xl px-6 py-20 space-y-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Terms & Conditions</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">Terms and conditions</h1>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Acceptance</h2>
          <p className="mt-4 text-slate-600">Users agree to platform terms for access to Elimu ERP and its services.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Subscription</h2>
          <p className="mt-4 text-slate-600">Schools pay subscription fees based on the selected package and billing terms.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Account Responsibility</h2>
          <p className="mt-4 text-slate-600">Schools are responsible for passwords, users, and data accuracy.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Prohibited Use</h2>
          <p className="mt-4 text-slate-600">Illegal activities, unauthorized access, and data abuse are not permitted.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Termination</h2>
          <p className="mt-4 text-slate-600">Elimu may suspend accounts for violations of these terms.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Limitation of Liability</h2>
          <p className="mt-4 text-slate-600">Elimu’s liability is limited as described by our platform terms.</p>
        </section>
      </div>
    </LandingLayout>
  );
}
