"use client";

import { useEffect } from "react";
import {
  Bell,
  CircleHelp,
  Command,
  Inbox,
  MessageSquare,
  Search,
  Sparkles,
  UserCircle
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select";
import { getVisibleModules } from "@/services/navigation-service";
import { useAuthStore } from "@/stores/auth-store";
import { usePermissionStore, initializePermissions } from "@/stores/permission-store";
import { schools, useCurrentSchoolStore } from "@/stores/current-school-store";
import { useNotificationStore } from "@/stores/notification-store";
import { useThemeStore } from "@/stores/theme-store";
import type { Role, SubscriptionPackage } from "@/types";
import { cn } from "@/utils/cn";

const roles: Role[] = [
  "Principal",
  "School Admin",
  "Platform Admin",
  "Board Chairperson",
  "Deputy Principal Academics",
  "Deputy Principal Administration",
  "Bursar",
  "Teacher",
  "HOD",
  "Boarding HOD",
  "Transport HOD",
  "Discipline HOD"
];

const packages: SubscriptionPackage[] = ["Basic", "Standard", "Professional", "Enterprise"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, setRole, userName, department, logout } = useAuthStore();
  const { schoolId, packageName, setSchool, setPackageName, modules: enabledModules, branding } = useCurrentSchoolStore();
  const { theme, setTheme } = useThemeStore();
  const unread = useNotificationStore((state) => state.notifications.filter((item) => item.unread).length);
  const visibleModules = getVisibleModules(role, packageName, enabledModules);
  const currentSchool = schools.find((school) => school.id === schoolId) ?? schools[0];

  useEffect(() => {
    usePermissionStore.getState().setPermissions(initializePermissions(role, packageName));
  }, [role, packageName]);

  return (
    <div
      className="grid min-h-screen bg-background text-foreground lg:grid-cols-[292px_1fr]"
      style={{
        backgroundImage: `linear-gradient(180deg, ${branding.primaryColor}15, transparent 45%)`
      }}
    >
      <aside
        className="sticky top-0 z-20 flex h-screen flex-col gap-5 overflow-y-auto p-5 text-white max-lg:static max-lg:h-auto"
        style={{ backgroundColor: branding.primaryColor }}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-white/10 font-black text-white">AE</div>
          <div>
            <strong className="block">AfricaSchool</strong>
            <span className="text-sm text-white/65">Elimu ERP</span>
          </div>
        </div>

        <SelectField
          label="School switcher"
          value={schoolId}
          options={schools.map((school) => ({ label: school.name, value: school.id }))}
          onValueChange={setSchool}
        />
        <SelectField
          label="Role"
          value={role}
          options={roles.map((item) => ({ label: item, value: item }))}
          onValueChange={(value) => setRole(value as Role)}
        />
        <SelectField
          label="Package"
          value={packageName}
          options={packages.map((item) => ({ label: item, value: item }))}
          onValueChange={(value) => setPackageName(value as SubscriptionPackage)}
        />

        <nav className="grid gap-1 pt-1 max-lg:grid-cols-2 max-sm:grid-cols-1" aria-label="Modules">
          {visibleModules.map((module, index) => {
            const Icon = module.icon;
            const isActive = pathname === module.href || pathname.startsWith(`${module.href}/`);
            return (
              <a
                key={module.key}
                href={module.href}
                className={cn(
                  "grid grid-cols-[24px_1fr_auto] items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/85 transition hover:bg-secondary hover:text-secondary-foreground",
                  (isActive || (!pathname || pathname === "/") && index === 0) && "bg-secondary text-secondary-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{module.label}</span>
                <small className="text-xs opacity-70">{role === "Board Chairperson" ? "view" : role.includes("HOD") || role === "Teacher" ? "scoped" : "full"}</small>
              </a>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background/92 px-6 py-4 backdrop-blur max-md:flex-col max-md:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
              {currentSchool.name} / {currentSchool.activeTerm}
            </p>
            <h1 className="text-2xl font-black tracking-normal md:text-3xl">{roleDashboardTitle(role)}</h1>
            <p className="text-sm text-muted-foreground">
              {packageName} package / {department} department / {visibleModules.length} enabled modules
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <IconButton title="Global search">
              <Search className="h-5 w-5" />
            </IconButton>
            <Button variant="outline" className="hidden gap-2 md:inline-flex">
              <Command className="h-4 w-4" />
              Ctrl K
            </Button>
            <IconButton title="Notifications">
              <Bell className="h-5 w-5" />
              {unread > 0 ? <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" /> : null}
            </IconButton>
              <IconButton title="Approvals">
              <Inbox className="h-5 w-5" />
            </IconButton>
            <IconButton title="Messages">
              <MessageSquare className="h-5 w-5" />
            </IconButton>
            <IconButton title="Help center">
              <CircleHelp className="h-5 w-5" />
            </IconButton>
            <SelectField
              label="Theme"
              value={theme}
              options={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
                { label: "System", value: "system" }
              ]}
              onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
            />
            <Button className="gap-2" style={{ borderColor: branding.secondaryColor, color: branding.secondaryColor }}>
              <Sparkles className="h-4 w-4" />
              Ask AI
            </Button>
            <Button variant="secondary" className="gap-2" onClick={() => logout()}>
              Logout
            </Button>
            <IconButton title={userName}>
              <UserCircle className="h-5 w-5" />
            </IconButton>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

function IconButton({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className="relative grid h-10 w-10 place-items-center rounded-md border bg-card text-foreground transition hover:bg-muted"
    >
      {children}
    </button>
  );
}

function roleDashboardTitle(role: Role) {
  const titles: Record<Role, string> = {
    "Platform Admin": "Platform administration",
    "School Admin": "School setup command",
    "Board Chairperson": "Board governance dashboard",
    Principal: "Whole-school command",
    "Deputy Principal Academics": "Academic operations",
    "Deputy Principal Administration": "Administration operations",
    Bursar: "Finance office",
    Teacher: "Teacher workspace",
    HOD: "Department workspace",
    "Boarding HOD": "Boarding workspace",
    "Transport HOD": "Transport workspace",
    "Discipline HOD": "Discipline workspace"
  };
  return titles[role];
}
