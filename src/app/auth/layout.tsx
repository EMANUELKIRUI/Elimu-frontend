import { LoginLayout } from "@/components/public/login-layout";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <LoginLayout>{children}</LoginLayout>;
}
