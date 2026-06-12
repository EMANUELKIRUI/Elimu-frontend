import { LandingLayout } from "@/components/public/landing-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Schools using Elimu", value: "500+" },
  { label: "Students managed", value: "200,000+" },
  { label: "Teachers supported", value: "15,000+" },
  { label: "Payments processed", value: "KES 500M+" }
];

const features = [
  {
    title: "Student Management",
    description: "Admissions, transfers, promotions and graduation tracking.",
    items: ["Admissions", "Transfers", "Promotion", "Graduation"]
  },
  {
    title: "Academics",
    description: "Classes, subjects, timetables and exams for every learner.",
    items: ["Classes", "Subjects", "Timetables", "Exams"]
  },
  {
    title: "Finance",
    description: "Fees, invoices, receipts and M-Pesa reconciliation in one place.",
    items: ["Fees", "Invoices", "Receipts", "M-Pesa"]
  },
  {
    title: "Communication",
    description: "SMS, email and notifications for parents, teachers and staff.",
    items: ["SMS", "Email", "Notifications"]
  },
  {
    title: "Human Resource",
    description: "Payroll, leave and recruitment for school staff.",
    items: ["Payroll", "Leave", "Recruitment"]
  }
];

const reasons = [
  "Cloud Based",
  "Secure",
  "Affordable",
  "Multi-School Support",
  "M-Pesa Integration",
  "CBC Ready"
];

const testimonials = [
  {
    quote: "Elimu reduced our administration workload by 70%.",
    name: "Principal",
    company: "Green Valley School"
  },
  {
    quote: "We run attendance, fees, exams and communication from one platform.",
    name: "Bursar",
    company: "Sunrise Academy"
  }
];

export default function Home() {
  return (
    <LandingLayout>
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Africa's Complete School Management System
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Manage Students, Finance, Academics, Attendance, Communication, HR and Reports from one platform.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Built for African schools to grow faster, reduce administration overhead, and deliver better academic outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={{ pathname: "/register-school" }}>
                <Button>Start Free Trial</Button>
              </Link>
              <Link href={{ pathname: "/book-demo" }}>
                <Button variant="outline">Book Demo</Button>
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-0 sm:grid-cols-3 lg:w-[520px]">
            {[
              "Dashboard Preview",
              "Students",
              "Finance",
              "Reports",
              "Analytics"
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-center shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white/5 p-8">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Features</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">A unified ERP built for schools.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  {feature.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Why Choose Elimu</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-950">Powerful, secure and made for African schools.</h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                Elimu delivers a complete operating system for school administrators, teachers and finance teams. Scale easily with secure data, M-Pesa integration and multi-school tenancy.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-900">
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Testimonials</p>
            <h2 className="mt-4 text-3xl font-bold">Trusted by school leaders across Africa.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <blockquote key={item.quote} className="rounded-3xl border border-slate-800 bg-slate-900 p-10">
                <p className="text-xl leading-8 text-slate-100">“{item.quote}”</p>
                <footer className="mt-8 text-sm text-slate-400">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p>{item.company}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Ready to transform your school?</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">Get started with Elimu today.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={{ pathname: "/register-school" }}>
              <Button>Register School</Button>
            </Link>
            <Link href={{ pathname: "/book-demo" }}>
              <Button variant="outline">Book Demo</Button>
            </Link>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
