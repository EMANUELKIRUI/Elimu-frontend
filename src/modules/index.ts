import {
  Activity,
  BarChart3,
  Bed,
  BookOpen,
  BriefcaseBusiness,
  Bus,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  HeartPulse,
  Landmark,
  Library,
  Megaphone,
  Package,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Users
} from "lucide-react";
import type { NavigationModule } from "@/types";

const allActions = ["view", "create", "edit", "delete", "approve", "reject", "export", "lock", "unlock", "send-message"] as const;

export const navigationModules: NavigationModule[] = [
  {
    key: "platform",
    label: "Platform",
    href: "/platform",
    icon: ShieldCheck,
    packages: ["Enterprise"],
    roles: ["Platform Admin"],
    actions: [...allActions]
  },
  {
    key: "schools",
    label: "Schools",
    href: "/schools",
    icon: Landmark,
    packages: ["Enterprise"],
    roles: ["Platform Admin", "School Admin"],
    actions: [...allActions]
  },
  {
    key: "students",
    label: "Students",
    href: "/students",
    icon: Users,
    packages: ["Basic", "Standard", "Professional", "Enterprise"],
    roles: ["School Admin", "Principal", "Deputy Principal Academics", "Teacher", "HOD"],
    actions: ["view", "create", "edit", "export", "send-message"]
  },
  {
    key: "academics",
    label: "Academics",
    href: "/academics",
    icon: GraduationCap,
    packages: ["Basic", "Standard", "Professional", "Enterprise"],
    roles: ["Principal", "Deputy Principal Academics", "Teacher", "HOD", "Board Chairperson", "School Admin"],
    actions: ["view", "create", "edit", "approve", "reject", "export", "lock", "unlock"]
  },
  {
    key: "finance",
    label: "Finance",
    href: "/finance",
    icon: Landmark,
    packages: ["Basic", "Standard", "Professional", "Enterprise"],
    roles: ["Bursar", "Principal", "Board Chairperson", "Deputy Principal Administration", "School Admin"],
    actions: ["view", "create", "edit", "approve", "reject", "export", "send-message"]
  },
  {
    key: "communication",
    label: "Communication",
    href: "/communication",
    icon: Megaphone,
    packages: ["Standard", "Professional", "Enterprise"],
    roles: ["Bursar", "Principal", "Deputy Principal Administration", "Deputy Principal Academics", "School Admin"],
    actions: ["view", "create", "edit", "approve", "reject", "send-message"]
  },
  {
    key: "hr",
    label: "HR & Staff",
    href: "/hr",
    icon: BriefcaseBusiness,
    packages: ["Professional", "Enterprise"],
    roles: ["Principal", "Deputy Principal Administration", "School Admin", "HOD"],
    actions: ["view", "create", "edit", "approve", "reject", "export"]
  },
  {
    key: "inventory",
    label: "Inventory",
    href: "/inventory",
    icon: Package,
    packages: ["Professional", "Enterprise"],
    roles: ["Principal", "Deputy Principal Administration", "HOD", "School Admin"],
    actions: ["view", "create", "edit", "approve", "export"]
  },
  {
    key: "procurement",
    label: "Procurement",
    href: "/procurement",
    icon: ShoppingCart,
    packages: ["Enterprise"],
    roles: ["Principal", "Deputy Principal Administration", "Board Chairperson", "School Admin"],
    actions: ["view", "create", "edit", "approve", "reject", "export"]
  },
  {
    key: "library",
    label: "Library",
    href: "/library",
    icon: Library,
    packages: ["Professional", "Enterprise"],
    roles: ["Principal", "Deputy Principal Academics", "School Admin"],
    actions: ["view", "create", "edit", "delete", "export"]
  },
  {
    key: "boarding",
    label: "Boarding",
    href: "/boarding",
    icon: Bed,
    packages: ["Enterprise"],
    roles: ["Boarding HOD", "Deputy Principal Administration", "Principal", "School Admin"],
    actions: ["view", "create", "edit", "approve", "reject", "send-message"]
  },
  {
    key: "transport",
    label: "Transport",
    href: "/transport",
    icon: Bus,
    packages: ["Professional", "Enterprise"],
    roles: ["Transport HOD", "Deputy Principal Administration", "Principal", "School Admin"],
    actions: ["view", "create", "edit", "approve", "export", "send-message"]
  },
  {
    key: "health",
    label: "Health",
    href: "/health",
    icon: HeartPulse,
    packages: ["Enterprise"],
    roles: ["Principal", "Deputy Principal Administration", "School Admin"],
    actions: ["view", "create", "edit", "send-message"]
  },
  {
    key: "discipline",
    label: "Discipline",
    href: "/discipline",
    icon: ClipboardCheck,
    packages: ["Professional", "Enterprise"],
    roles: ["Discipline HOD", "Deputy Principal Administration", "Principal", "Teacher", "Board Chairperson"],
    actions: ["view", "create", "edit", "approve", "reject", "send-message"]
  },
  {
    key: "events",
    label: "Events",
    href: "/events",
    icon: CalendarDays,
    packages: ["Standard", "Professional", "Enterprise"],
    roles: ["Teacher", "HOD", "Principal", "School Admin"],
    actions: ["view", "create", "edit", "export", "send-message"]
  },
  {
    key: "reports",
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
    packages: ["Standard", "Professional", "Enterprise"],
    roles: ["Teacher", "HOD", "Bursar", "Principal", "Board Chairperson", "School Admin", "Deputy Principal Academics"],
    actions: ["view", "export"]
  },
  {
    key: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: Activity,
    packages: ["Enterprise"],
    roles: ["Platform Admin", "Principal", "Board Chairperson", "School Admin"],
    actions: ["view", "export"]
  },
  {
    key: "settings",
    label: "Settings",
    href: "/settings/school",
    icon: Settings,
    packages: ["Basic", "Standard", "Professional", "Enterprise"],
    roles: ["School Admin", "Principal", "Platform Admin"],
    actions: [...allActions]
  },
  {
    key: "audit",
    label: "Audit Logs",
    href: "/audit-logs",
    icon: BookOpen,
    packages: ["Basic", "Standard", "Professional", "Enterprise"],
    roles: ["Platform Admin", "School Admin", "Principal", "Board Chairperson"],
    actions: ["view", "export"]
  }
];
