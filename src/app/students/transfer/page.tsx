import { AppShell } from "@/layouts/app-shell";

export default function TransferStudentsPage() {
  return (
    <AppShell>
      <div className="space-y-6 p-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-950">Student Transfer</h1>
          <p className="mt-2 text-sm text-slate-500">Move students between classes, streams, or campuses.</p>
          <div className="mt-8 grid gap-4 rounded-3xl bg-slate-50 p-6">
            <div className="grid gap-2 text-sm">
              <label className="font-medium text-slate-700">Student</label>
              <input className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Search student by name or admission no." />
            </div>
            <div className="grid gap-2 text-sm">
              <label className="font-medium text-slate-700">Target class</label>
              <select className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>Select class</option>
                <option>Form 1</option>
                <option>Form 2</option>
                <option>Form 3</option>
                <option>Form 4</option>
              </select>
            </div>
            <div className="grid gap-2 text-sm">
              <label className="font-medium text-slate-700">Target stream</label>
              <select className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>Select stream</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
            <button className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700">
              Transfer Student
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
