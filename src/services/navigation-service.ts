import { navigationModules } from "@/modules";
import type { ModuleKey, Role, SubscriptionPackage } from "@/types";

export function getVisibleModules(role: Role, packageName: SubscriptionPackage, enabledModules: ModuleKey[]) {
  return navigationModules.filter(
    (module) => module.roles.includes(role) && module.packages.includes(packageName) && enabledModules.includes(module.key)
  );
}
