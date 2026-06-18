import { AppShell } from "@/layouts/app-shell";

export default function PlatformSupportPage() {
  return (
    <AppShell>
      <div className="space-y-6 p-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">Support center</h1>
          <p className="mt-2 text-sm text-slate-500">Manage platform tickets, school requests, and issue tracking.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Open tickets", value: "16", helper: "Needs response" },
            { title: "School requests", value: "9", helper: "Waiting approval" },
            { title: "Avg response", value: "4h 22m", helper: "platform SLA" },
            { title: "Resolved", value: "128", helper: "this month" }
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">{item.title}</p>
              <p className="mt-3 text-2xl font-black text-slate-950">{item.value}</p>
              <p className="mt-2 text-xs text-slate-500">{item.helper}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
