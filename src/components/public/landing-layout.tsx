"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingFooter } from "@/components/public/landing-footer";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-950">
            Elimu
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={{ pathname: item.href }} className="text-sm font-medium text-slate-700 transition hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={{ pathname: "/admin/login" }}>
              <Button variant="outline">Admin Login</Button>
            </Link>
            <Link href={{ pathname: "/login" }}>
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href={{ pathname: "/register-school" }}>
              <Button>Register School</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <LandingFooter />
    </div>
  );
}
