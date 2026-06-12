import { LandingLayout } from "@/components/public/landing-layout";

export default function PrivacyPage() {
  return (
    <LandingLayout>
      <div className="mx-auto max-w-5xl px-6 py-20 space-y-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Privacy Policy</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">Privacy policy</h1>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Data Collected</h2>
          <p className="mt-4 text-slate-600">School information, staff details, student records and financial data are collected to deliver the platform.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Data Usage</h2>
          <p className="mt-4 text-slate-600">Data is used to provide services, generate reports and send notifications.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Data Protection</h2>
          <p className="mt-4 text-slate-600">We protect data with encryption, secure storage and access controls.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Data Sharing</h2>
          <p className="mt-4 text-slate-600">We do not sell customer data.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">User Rights</h2>
          <p className="mt-4 text-slate-600">Schools can access, correct and request data export.</p>
        </section>
      </div>
    </LandingLayout>
  );
}
