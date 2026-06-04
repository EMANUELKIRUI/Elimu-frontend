import { AppShell } from "@/layouts/app-shell";
import { ModulePage } from "@/components/modules/module-page";
import type { ModulePageId } from "@/modules/module-pages";

export function ModuleRoute({ page }: { page: ModulePageId }) {
  return (
    <AppShell>
      <ModulePage page={page} />
    </AppShell>
  );
}
