import { AppShell } from "@/layouts/app-shell";

export default function PlatformBillingPage() {
  return (
    <AppShell>
      <div className="space-y-6 p-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">Platform billing</h1>
          <p className="mt-2 text-sm text-slate-500">Review payments, invoices, and revenue performance across the platform.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total revenue", value: "KES 12.4M" },
            { label: "Pending invoices", value: "28" },
            { label: "Renewal rate", value: "92%" }
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-black text-slate-950">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
