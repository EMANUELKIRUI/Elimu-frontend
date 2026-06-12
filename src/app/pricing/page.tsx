import { LandingLayout } from "@/components/public/landing-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "KES 2,000/month",
    features: ["Students", "Attendance", "Exams", "Report Cards"],
    recommended: false
  },
  {
    name: "Standard",
    price: "KES 5,000/month",
    features: ["Everything in Starter", "Finance", "Communication", "Library"],
    recommended: true
  },
  {
    name: "Professional",
    price: "KES 10,000/month",
    features: ["Everything in Standard", "HR", "Payroll", "Inventory", "Procurement"],
    recommended: false
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    features: ["Everything Included", "Priority Support", "Custom Branding", "API Access"],
    recommended: false
  }
];

const comparison = [
  ["Students", "✔", "✔", "✔", "✔"],
  ["Finance", "✖", "✔", "✔", "✔"],
  ["HR", "✖", "✖", "✔", "✔"],
  ["Payroll", "✖", "✖", "✔", "✔"],
  ["Inventory", "✖", "✖", "✔", "✔"],
  ["API Access", "✖", "✖", "✖", "✔"]
];

export default function PricingPage() {
  return (
    <LandingLayout>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Pricing</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">Choose the package that fits your school.</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.name} className={`rounded-3xl border p-8 shadow-sm ${plan.recommended ? "border-primary bg-primary/5" : "border-slate-200 bg-white"}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{plan.name}</p>
              <p className="mt-4 text-3xl font-bold text-slate-950">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={{ pathname: "/register-school" }} className="mt-8 block">
                <Button variant={plan.recommended ? "default" : "outline"} className="w-full">
                  Choose {plan.name}
                </Button>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead>
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-900">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="px-4 py-3 font-semibold text-slate-900">{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map(([feature, ...values]) => (
                <tr key={feature} className="border-t border-slate-200">
                  <td className="px-4 py-4 font-medium text-slate-900">{feature}</td>
                  {values.map((value, index) => (
                    <td key={`${feature}-${index}`} className="px-4 py-4">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LandingLayout>
  );
}
