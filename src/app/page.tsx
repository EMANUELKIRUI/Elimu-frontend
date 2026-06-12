import { AppShell } from "@/layouts/app-shell";
import { EnterpriseDashboard } from "@/components/dashboard/enterprise-dashboard";
import { PageShell } from "@/components/layouts/page-shell";

export default function Home() {
  return (
    <PageShell>
      <AppShell>
        <EnterpriseDashboard />
      </AppShell>
    </PageShell>
  );
}
