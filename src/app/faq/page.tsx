import { LandingLayout } from "@/components/public/landing-layout";

const faqs = [
  {
    question: "Can parents log in?",
    answer: "No. Parents receive information through SMS and email."
  },
  {
    question: "Is M-Pesa supported?",
    answer: "Yes."
  },
  {
    question: "Can multiple schools use the platform?",
    answer: "Yes. Elimu is a multi-tenant SaaS platform."
  },
  {
    question: "Can I upgrade my package?",
    answer: "Yes at any time."
  }
];

export default function FAQPage() {
  return (
    <LandingLayout>
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">FAQ</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">Frequently asked questions</h1>
          <p className="mt-4 text-slate-600">Answers to common questions about Elimu ERP and how the platform works.</p>
        </div>

        <div className="grid gap-6">
          {faqs.map((item) => (
            <article key={item.question} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">{item.question}</h2>
              <p className="mt-3 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
}
