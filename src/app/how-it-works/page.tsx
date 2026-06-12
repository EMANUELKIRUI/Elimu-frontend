import { LandingLayout } from "@/components/public/landing-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  { title: "Register School", description: "Create your school's account in minutes." },
  { title: "Choose Package", description: "Select the package suitable for your institution." },
  { title: "Configure School", description: "Set academic year, classes, subjects, and staff." },
  { title: "Import Data", description: "Bring in students, teachers, parents and assets." },
  { title: "Start Managing School", description: "Use attendance, finance, exams, communication and reports." }
];

export default function HowItWorksPage() {
  return (
    <LandingLayout>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">How It Works</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">A simple workflow to get your school live.</h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">{index + 1}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">{step.title}</h2>
                    <p className="mt-2 text-slate-600">{step.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-10 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Workflow</p>
            <div className="mt-8 space-y-6 text-lg leading-8">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950">{index + 1}</div>
                  <p>{step.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button>
                <Link href={{ pathname: "/register-school" }}>Register School</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
