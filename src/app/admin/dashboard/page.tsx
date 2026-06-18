const stats = [
  { label: "Schools", value: "245" },
  { label: "Students", value: "125,000" },
  { label: "Revenue", value: "$12,500" },
  { label: "Plans", value: "4" }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Super Admin</p>
          <h1 className="mt-4 text-3xl font-black text-slate-950">Platform Dashboard</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Overview of the platform administration workspace. Monitor school adoption, revenue, packages and user activity from one place.
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
            <p className="mt-4 text-4xl font-black text-slate-950">{item.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
