import { AppShell } from "@/layouts/app-shell";

export default function StudentsAnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-6 p-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">Student Analytics</h1>
          <p className="mt-2 text-sm text-slate-500">View student counts, attendance trends, and enrollment summaries.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Total students</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">1,284</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Average attendance</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">92%</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Promoted this term</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">218</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
