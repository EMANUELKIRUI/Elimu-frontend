import { AppShell } from "@/layouts/app-shell";

export default function PlatformSubscriptionsPage() {
  return (
    <AppShell>
      <div className="space-y-6 p-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">Subscription management</h1>
          <p className="mt-2 text-sm text-slate-500">Create packages, manage renewals, and assign subscription plans to each school tenant.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Starter", description: "Core school management features for a single campus." },
              { title: "Standard", description: "Includes communication, reports, and expanded analytics." },
              { title: "Professional", description: "Full finance, HR, inventory, and transport feature set." },
              { title: "Enterprise", description: "Complete platform with boarding, procurement and advanced analytics." }
            ].map((plan) => (
              <div key={plan.title} className="rounded-3xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-950">{plan.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
