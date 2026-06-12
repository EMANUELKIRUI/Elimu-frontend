import { create } from "zustand";
import { navigationModules } from "@/modules";
import type { ModuleKey } from "@/types";

export type ModuleState = {
  activeModule: ModuleKey | null;
  enabledModules: ModuleKey[];
  setActiveModule: (module: ModuleKey) => void;
  setEnabledModules: (modules: ModuleKey[]) => void;
  getAvailableModules: () => typeof navigationModules;
};

export const useModuleStore = create<ModuleState>((set) => ({
  activeModule: null,
  enabledModules: navigationModules.map((module) => module.key),
  setActiveModule: (module) => set({ activeModule: module }),
  setEnabledModules: (modules) => set({ enabledModules: modules }),
  getAvailableModules: () => navigationModules
}));
