import { create } from "zustand";
import type { School, SubscriptionPackage } from "@/types";

export const schools: School[] = [
  {
    id: "nairobi-prep",
    name: "Nairobi Preparatory School",
    package: "Enterprise",
    activeTerm: "Term 2, 2026",
    brandColor: "#0e7c68"
  },
  {
    id: "kisumu-lakeside",
    name: "Kisumu Lakeside Academy",
    package: "Professional",
    activeTerm: "Term 2, 2026",
    brandColor: "#376fa8"
  },
  {
    id: "mombasa-ridge",
    name: "Mombasa Ridge School",
    package: "Standard",
    activeTerm: "Term 2, 2026",
    brandColor: "#c58a1e"
  }
];

type CurrentSchoolState = {
  schoolId: string;
  packageName: SubscriptionPackage;
  setSchool: (schoolId: string) => void;
  setPackageName: (packageName: SubscriptionPackage) => void;
};

export const useCurrentSchoolStore = create<CurrentSchoolState>((set) => ({
  schoolId: schools[0].id,
  packageName: schools[0].package,
  setSchool: (schoolId) => {
    const school = schools.find((item) => item.id === schoolId) ?? schools[0];
    set({ schoolId, packageName: school.package });
  },
  setPackageName: (packageName) => set({ packageName })
}));
