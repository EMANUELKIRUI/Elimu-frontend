import { AppShell } from "@/layouts/app-shell";
import { EnterpriseDashboard } from "@/components/dashboard/enterprise-dashboard";

export default function DashboardPage() {
  return (
    <AppShell>
      <EnterpriseDashboard />
    </AppShell>
  );
}
