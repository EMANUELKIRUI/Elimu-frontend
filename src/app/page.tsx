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
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute left-1/2 top-0 h-80 w-[120%] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-purple-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.32em] text-primary">
              Africa's Complete School Management System
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              One platform for student management, finance, academics and school-wide communication.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-200">
              Elimu gives schools the tools to run operations faster, keep parents informed, and improve learner success with an elegant, mobile-friendly dashboard.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={{ pathname: "/register-school" }}>
                <Button>Start Free Trial</Button>
              </Link>
              <Link href={{ pathname: "/book-demo" }}>
                <Button variant="outline">Book Demo</Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Realtime attendance", value: "Live" },
                { label: "Fees and billing", value: "Automated" },
                { label: "Academic planning", value: "CBC Ready" },
                { label: "Parent communication", value: "WhatsApp + SMS" }
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/5 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-300">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 lg:mt-0 lg:w-[520px]">
            <div className="rounded-[2.5rem] bg-white/95 p-6 shadow-2xl ring-1 ring-slate-200/50">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Dashboard Preview",
                  "Students",
                  "Finance",
                  "Reports",
                  "Analytics",
                  "Messaging"
                ].map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:bg-white">
                    <p className="text-sm font-semibold text-slate-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 ring-1 ring-white/10">
                <p className="text-3xl font-bold text-cyan-300">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
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
              <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.2)]">
                <div className="inline-flex rounded-2xl bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  {feature.title}
                </div>
                <p className="mt-5 text-sm text-slate-600">{feature.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
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
                <div key={reason} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-900 shadow-sm">
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
              <blockquote key={item.quote} className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.8)]">
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

      <section className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Ready to transform your school?</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Get started with Elimu today.</h2>
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
