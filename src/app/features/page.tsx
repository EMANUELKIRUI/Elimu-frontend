import { LandingLayout } from "@/components/public/landing-layout";

const features = [
  {
    title: "Student Management",
    description: "Admissions, records, documents, promotion and graduation.",
    benefits: ["Complete learner profiles", "Guardian communications", "Student lifecycle workflows"]
  },
  {
    title: "Academics",
    description: "Classes, timetables, exams, marks and report cards.",
    benefits: ["Exam planning", "HOD approvals", "Curriculum flexibility"]
  },
  {
    title: "CBC",
    description: "Competency-based assessment, strands, learning areas and evidence capture.",
    benefits: ["EE/ME/AE/BE tracking", "Evidence uploads", "Curriculum alignment"]
  },
  {
    title: "Attendance",
    description: "Student, boarding and staff attendance with quick marking.",
    benefits: ["Register management", "Alerts and analytics", "Compliance reporting"]
  },
  {
    title: "Finance",
    description: "Invoices, payments, receipts and M-Pesa collections.",
    benefits: ["Fee collection", "Expense tracking", "Finance approvals"]
  },
  {
    title: "Communication",
    description: "SMS, email and notification workflows for the whole school.",
    benefits: ["Parent alerts", "Staff messages", "Template workflows"]
  },
  {
    title: "HR",
    description: "Staff records, leave, payroll and recruitment.",
    benefits: ["Employee lifecycle", "Leave approvals", "Payroll management"]
  },
  {
    title: "Inventory",
    description: "Assets, stock and accountability tracking.",
    benefits: ["Stock control", "Asset assignments", "Maintenance logs"]
  },
  {
    title: "Library",
    description: "Catalog, lending and books management.",
    benefits: ["Item tracking", "Issue history", "Reports"]
  },
  {
    title: "Transport",
    description: "Route management and vehicle tracking for school transport.",
    benefits: ["Vehicle logs", "Routes and stops", "Driver records"]
  },
  {
    title: "Reports",
    description: "Compliance, academic and financial reporting at your fingertips.",
    benefits: ["Export to PDF/Excel", "Analytics dashboards", "School compliance"]
  },
  {
    title: "Analytics",
    description: "Visual insights for attendance, finance, exams and operations.",
    benefits: ["Performance dashboards", "Trend tracking", "Data-driven planning"]
  }
];

export default function FeaturesPage() {
  return (
    <LandingLayout>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Features</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">Everything your school needs to operate.</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">A full suite of modules across student management, finance, academics, HR, communication and reporting.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">{feature.title}</h2>
              <p className="mt-3 text-slate-600">{feature.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
}
