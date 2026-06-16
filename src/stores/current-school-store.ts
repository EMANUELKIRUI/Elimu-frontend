import { create } from "zustand";
import { navigationModules } from "@/modules";
import type { ModuleKey, School, SubscriptionPackage } from "@/types";
import { fetchBranding } from "@/services/branding-api";

export const schools: School[] = [
  {
    id: "nairobi-prep",
    name: "Nairobi Preparatory School",
    package: "Enterprise",
    activeTerm: "Term 2, 2026",
    modules: [
      "platform",
      "schools",
      "students",
      "academics",
      "finance",
      "communication",
      "hr",
      "inventory",
      "procurement",
      "library",
      "boarding",
      "transport",
      "health",
      "discipline",
      "events",
      "reports",
      "analytics",
      "settings",
      "audit"
    ],
    branding: {
      logo: "",
      primaryColor: "12 65% 33%",
      secondaryColor: "25 30% 60%"
    },
    settings: {
      academicYear: "2026",
      region: "Kenya",
      campus: "Nairobi"
    }
  },
  {
    id: "kisumu-lakeside",
    name: "Kisumu Lakeside Academy",
    package: "Professional",
    activeTerm: "Term 2, 2026",
    modules: ["students", "academics", "finance", "communication", "library", "transport", "reports", "settings"],
    branding: {
      logo: "",
      primaryColor: "12 65% 33%",
      secondaryColor: "25 30% 60%"
    },
    settings: {
      academicYear: "2026",
      region: "Kenya",
      campus: "Kisumu"
    }
  },
  {
    id: "mombasa-ridge",
    name: "Mombasa Ridge School",
    package: "Standard",
    activeTerm: "Term 2, 2026",
    modules: ["students", "academics", "finance", "events", "reports", "settings"],
    branding: {
      logo: "",
      primaryColor: "12 65% 33%",
      secondaryColor: "25 30% 60%"
    },
    settings: {
      academicYear: "2026",
      region: "Kenya",
      campus: "Mombasa"
    }
  }
];

type CurrentSchoolState = {
  schoolId: string;
  packageName: SubscriptionPackage;
  modules: ModuleKey[];
  branding: School["branding"];
  settings: School["settings"];
  setSchool: (schoolId: string) => void;
  setPackageName: (packageName: SubscriptionPackage) => void;
  setModules: (modules: ModuleKey[]) => void;
  setBranding: (branding: School["branding"]) => void;
  setSettings: (settings: School["settings"]) => void;
};

export const useCurrentSchoolStore = create<CurrentSchoolState>((set) => ({
  schoolId: schools[0].id,
  packageName: schools[0].package,
  modules: schools[0].modules,
  branding: schools[0].branding,
  settings: schools[0].settings,
  setSchool: (schoolId) => {
    const school = schools.find((item) => item.id === schoolId) ?? schools[0];
    set({
      schoolId,
      packageName: school.package,
      modules: school.modules,
      branding: school.branding,
      settings: school.settings
    });

    // Attempt to load persisted branding for the selected school
    (async () => {
      try {
        const remote = await fetchBranding(schoolId);
        if (remote) {
          set({
            branding: {
              logo: remote.logo ?? school.branding.logo,
              primaryColor: remote.primaryColor ?? school.branding.primaryColor,
              secondaryColor: remote.secondaryColor ?? school.branding.secondaryColor
            }
          });
        }
      } catch (e) {
        // ignore
      }
    })();
  },
  setPackageName: (packageName) =>
    set((state) => {
      const school = schools.find((item) => item.id === state.schoolId) ?? schools[0];
      return {
        packageName,
        modules: school.modules.filter((moduleKey) =>
          navigationModules.some((entry) => entry.key === moduleKey && entry.packages.includes(packageName))
        )
      };
    }),
  setModules: (modules) => set({ modules }),
  setBranding: (branding) => set({ branding }),
  setSettings: (settings) => set({ settings })
}));
