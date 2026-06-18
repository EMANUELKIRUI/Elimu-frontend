"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useAuthStore } from "@/stores/auth-store";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Schools", href: "/admin/schools" },
  { label: "Organizations", href: "/admin/organizations" },
  { label: "Subscriptions", href: "/admin/subscriptions" },
  { label: "Packages", href: "/admin/packages" },
  { label: "Payments", href: "/admin/payments" },
  { label: "Support Tickets", href: "/admin/support-tickets" },
  { label: "Users", href: "/admin/users" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Audit Logs", href: "/admin/audit-logs" },
  { label: "Settings", href: "/admin/settings" }
] as const;

function hasAdminToken() {
  if (typeof window === "undefined") return false;
  return document.cookie.split(";").some((cookie) => cookie.trim().startsWith("elimu_token="));
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated) || hasAdminToken();
  const showNavigation = isAuthenticated && !isLoginPage;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <aside className="hidden w-80 shrink-0 border-r border-slate-200 bg-white px-6 py-8 lg:block">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Elimu OS</p>
            <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950">Platform Administration</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Manage schools, subscriptions, users, analytics, and system settings from one place.
            </p>
          </div>

          {showNavigation ? (
            <nav className="space-y-2 text-sm font-medium text-slate-700">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className="block rounded-2xl px-4 py-3 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : (
            <div className="rounded-3xl bg-slate-50 p-6 text-sm text-slate-600 shadow-sm">
              <p className="font-semibold text-slate-950">Admin navigation hidden</p>
              <p className="mt-2">
                Please sign in through the admin login page to view platform navigation.
              </p>
            </div>
          )}
        </aside>

        <main className="flex-1 bg-slate-50 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
