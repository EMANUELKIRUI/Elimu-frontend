import { AppShell } from "@/layouts/app-shell";

export default function ImportStudentsPage() {
  return (
    <AppShell>
      <div className="space-y-6 p-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">Import Students</h1>
          <p className="mt-2 text-sm text-slate-500">Upload a CSV file to bulk import student records.</p>
          <div className="mt-8 grid gap-6 rounded-3xl bg-slate-50 p-6">
            <div className="grid gap-2 text-sm">
              <label className="font-medium text-slate-700">CSV file</label>
              <input type="file" accept=".csv" className="file:mr-4 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
            </div>
            <p className="text-sm text-slate-500">Make sure your CSV matches the student import template.</p>
            <button className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700">
              Upload CSV
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
