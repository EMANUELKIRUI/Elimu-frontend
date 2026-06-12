import type { LucideIcon } from "lucide-react";

export type SubscriptionPackage = "Basic" | "Standard" | "Professional" | "Enterprise";

export type Role =
  | "Platform Admin"
  | "School Admin"
  | "Board Chairperson"
  | "Principal"
  | "Deputy Principal Academics"
  | "Deputy Principal Administration"
  | "Bursar"
  | "Teacher"
  | "HOD"
  | "Boarding HOD"
  | "Transport HOD"
  | "Discipline HOD";

export type PermissionAction =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "approve"
  | "reject"
  | "export"
  | "lock"
  | "unlock"
  | "send-message";

export type ModuleKey =
  | "platform"
  | "schools"
  | "students"
  | "academics"
  | "finance"
  | "communication"
  | "hr"
  | "inventory"
  | "procurement"
  | "library"
  | "boarding"
  | "transport"
  | "health"
  | "discipline"
  | "events"
  | "reports"
  | "analytics"
  | "settings"
  | "audit";

export type School = {
  id: string;
  name: string;
  package: SubscriptionPackage;
  activeTerm: string;
  modules: ModuleKey[];
  branding: {
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
  };
  settings: Record<string, string>;
};

export type ThemeMode = "light" | "dark" | "system";

export type NavigationModule = {
  key: ModuleKey;
  label: string;
  href: string;
  icon: LucideIcon;
  packages: SubscriptionPackage[];
  roles: Role[];
  actions: PermissionAction[];
};

export type DashboardWidget = {
  label: string;
  value: string;
  helper: string;
};

export type ApprovalItem = {
  title: string;
  module: ModuleKey;
  stage: string;
  amount?: string;
  priority: "low" | "medium" | "high";
};
