import Link from "next/link";

const sections = [
  { title: "Product", links: [
      { href: "/", label: "Home" },
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/how-it-works", label: "How It Works" }
    ]
  },
  { title: "Company", links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" }
    ]
  },
  { title: "Support", links: [
      { href: "/login", label: "Login" },
      { href: "/register-school", label: "Register School" },
      { href: "/faq", label: "FAQ" }
    ]
  }
];

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <h2 className="text-xl font-bold text-white">Elimu ERP</h2>
          <p className="mt-4 max-w-md text-sm text-slate-400">
            Digital school operations for African institutions with finance, academics, attendance, communication and more.
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-slate-100">{section.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={{ pathname: link.href }} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800 bg-slate-900 px-6 py-6 text-sm text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Elimu Africa. All rights reserved.</p>
          <p>support@elimu.africa · +254 700 000 000 · WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
