import { LandingLayout } from "@/components/public/landing-layout";

const values = [
  { title: "Mission", description: "Digitize school operations across Africa through affordable and scalable education technology." },
  { title: "Vision", description: "Empower every school with a simple, secure and intelligent management platform." },
  { title: "Our Story", description: "Built to meet the needs of African schools with local payment and reporting workflows." },
  { title: "Team", description: "A passionate group of educators, engineers and operations leaders." }
];

export default function AboutPage() {
  return (
    <LandingLayout>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">About Us</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">Built to support African schools at every stage.</h1>
          <p className="mt-4 text-slate-600">Our mission is to digitize school operations through affordable, secure and scalable education technology.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {values.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-4 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
}
