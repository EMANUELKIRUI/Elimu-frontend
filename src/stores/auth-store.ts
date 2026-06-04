import { create } from "zustand";
import type { Role } from "@/types";

type AuthState = {
  role: Role;
  userName: string;
  department: string;
  setRole: (role: Role) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: "Principal",
  userName: "Shael Bor",
  department: "Leadership",
  setRole: (role) =>
    set({
      role,
      department:
        role === "Bursar"
          ? "Finance"
          : role.includes("Academics")
            ? "Academics"
            : role.includes("Administration")
              ? "Administration"
              : role.includes("HOD")
                ? role.replace(" HOD", "")
                : "Leadership"
    })
}));
