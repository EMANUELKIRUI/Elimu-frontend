import { AppShell } from "@/layouts/app-shell";
import { ModulePage } from "@/components/modules/module-page";
import { PageShell } from "@/components/layouts/page-shell";
import type { ModulePageId } from "@/modules/module-pages";

export function ModuleRoute({ page }: { page: ModulePageId }) {
  return (
    <PageShell>
      <AppShell>
        <ModulePage page={page} />
      </AppShell>
    </PageShell>
  );
}
