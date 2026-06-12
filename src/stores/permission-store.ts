import { create } from "zustand";
import { useAuthStore } from "@/stores/auth-store";
import { navigationModules } from "@/modules";
import type { ModuleKey, PermissionAction, Role, SubscriptionPackage } from "@/types";

type PermissionState = {
  permissions: string[];
  canAccess: (module: ModuleKey, role: Role, packageName: SubscriptionPackage) => boolean;
  actionsFor: (module: ModuleKey, role: Role, packageName: SubscriptionPackage) => PermissionAction[];
  can: (permission: string) => boolean;
  cannot: (permission: string) => boolean;
  hasRole: (role: Role) => boolean;
  setPermissions: (permissions: string[]) => void;
};

function buildPermissions(role: Role, packageName: SubscriptionPackage) {
  return navigationModules
    .filter((module) => module.roles.includes(role) && module.packages.includes(packageName))
    .flatMap((module) => module.actions.map((action) => `${module.key}.${action}`));
}

export const usePermissionStore = create<PermissionState>((set, get) => ({
  permissions: [],
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
  },
  can: (permission) => get().permissions.includes(permission),
  cannot: (permission) => !get().permissions.includes(permission),
  hasRole: (role) => useAuthStore.getState().role === role,
  setPermissions: (permissions) => set({ permissions })
}));

export function initializePermissions(role: Role, packageName: SubscriptionPackage) {
  return buildPermissions(role, packageName);
}

