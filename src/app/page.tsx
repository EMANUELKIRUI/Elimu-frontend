import { EnterpriseDashboard } from "@/components/dashboard/enterprise-dashboard";
import { AppShell } from "@/layouts/app-shell";

export default function Home() {
  return (
    <AppShell>
      <EnterpriseDashboard />
    </AppShell>
  );
}
