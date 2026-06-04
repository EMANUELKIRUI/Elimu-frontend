import { create } from "zustand";
import { navigationModules } from "@/modules";
import type { ModuleKey, PermissionAction, Role, SubscriptionPackage } from "@/types";

type PermissionState = {
  canAccess: (module: ModuleKey, role: Role, packageName: SubscriptionPackage) => boolean;
  actionsFor: (module: ModuleKey, role: Role, packageName: SubscriptionPackage) => PermissionAction[];
};

export const usePermissionStore = create<PermissionState>(() => ({
  canAccess: (module, role, packageName) => {
    const entry = navigationModules.find((item) => item.key === module);
    return Boolean(entry?.roles.includes(role) && entry.packages.includes(packageName));
  },
  actionsFor: (module, role, packageName) => {
    const entry = navigationModules.find((item) => item.key === module);
    if (!entry || !entry.roles.includes(role) || !entry.packages.includes(packageName)) return [];
    if (role === "Board Chairperson") return ["view", "export"];
    if (role === "Teacher") return entry.actions.filter((action) => ["view", "create", "edit", "export"].includes(action));
    return entry.actions;
  }
}));
