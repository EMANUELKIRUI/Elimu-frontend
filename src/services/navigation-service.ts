import { navigationModules } from "@/modules";
import type { Role, SubscriptionPackage } from "@/types";

export function getVisibleModules(role: Role, packageName: SubscriptionPackage) {
  return navigationModules.filter((module) => module.roles.includes(role) && module.packages.includes(packageName));
}
