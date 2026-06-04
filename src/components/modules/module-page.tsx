"use client";

import { ArrowRight, CheckCircle2, LockKeyhole, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarksGrid } from "@/components/dashboard/marks-grid";
import { modulePageConfigs, type ModulePageId } from "@/modules/module-pages";
import { useAuthStore } from "@/stores/auth-store";
import { useCurrentSchoolStore } from "@/stores/current-school-store";
import { usePermissionStore } from "@/stores/permission-store";

type ModulePageProps = {
  page: ModulePageId;
};

const actionLabels: Record<string, string> = {
  view: "View",
  create: "Create",
  edit: "Edit",
  delete: "Delete",
  approve: "Approve",
  reject: "Reject",
  export: "Export",
  lock: "Lock",
  unlock: "Unlock",
  "send-message": "Send Message"
};

export function ModulePage({ page }: ModulePageProps) {
  const config = modulePageConfigs[page];
  const role = useAuthStore((state) => state.role);
  const packageName = useCurrentSchoolStore((state) => state.packageName);
  const { actionsFor, canAccess } = usePermissionStore();
  const allowedActions = actionsFor(config.moduleKey, role, packageName);
  const hasAccess = canAccess(config.moduleKey, role, packageName);

  return (
    <div className="grid gap-5">
      <section className="grid gap-4 border-b pb-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge tone={hasAccess ? "green" : "red"}>{hasAccess ? "Available" : "Restricted"}</Badge>
            <Badge tone="blue">{role}</Badge>
            <Badge>{packageName} package</Badge>
          </div>
          <h2 className="text-3xl font-black tracking-normal">{config.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{config.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button disabled={!hasAccess}>
            <ArrowRight className="h-4 w-4" />
            {config.primaryAction}
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4 max-lg:grid-cols-1" aria-label={`${config.title} metrics`}>
        {config.metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-5">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <strong className="mt-2 block text-2xl font-black">{metric.value}</strong>
              <small className="mt-1 block text-sm font-bold text-primary">{metric.helper}</small>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-12 gap-5">
        <Card className="col-span-7 max-xl:col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Workspace</CardTitle>
              <CardDescription>Core screens and tabs expected for this module.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {config.sections.map((section) => (
              <article key={section} className="rounded-md border p-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <strong className="mt-3 block">{section}</strong>
                <p className="mt-1 text-sm text-muted-foreground">Role-scoped access with subscription and department-aware controls.</p>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-5 max-xl:col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Workflow</CardTitle>
              <CardDescription>Operational flow for approvals, reviews, and completion.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {config.workflows.map((step, index) => (
              <div key={step} className="grid grid-cols-[32px_1fr] items-center gap-3 rounded-md border p-3">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-muted text-sm font-black">{index + 1}</span>
                <span className="font-semibold">{step}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Permission surface</CardTitle>
              <CardDescription>Actions available to the current role and package are resolved from the shared permission store.</CardDescription>
            </div>
            {!hasAccess ? <LockKeyhole className="h-5 w-5 text-destructive" /> : null}
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {config.actions.map((action) => {
              const enabled = allowedActions.includes(action);
              return (
                <Badge key={action} tone={enabled ? "green" : "neutral"} className={!enabled ? "opacity-50" : undefined}>
                  {actionLabels[action]}
                </Badge>
              );
            })}
          </CardContent>
        </Card>

        {page === "marks" ? (
          <Card className="col-span-12">
            <CardHeader>
              <div>
                <CardTitle>Marks grid</CardTitle>
                <CardDescription>Keyboard-friendly AG Grid entry surface with validation-ready rows.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <MarksGrid />
            </CardContent>
          </Card>
        ) : null}
      </section>
    </div>
  );
}
