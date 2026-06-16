"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowRight, CheckCircle2, FileSpreadsheet, Mail, MessageSquare, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/auth-store";
import { useCurrentSchoolStore } from "@/stores/current-school-store";
import { usePermissionStore } from "@/stores/permission-store";
import { DashboardStats } from "./dashboard-stats";
import { DashboardActivitiesAndEvents } from "./dashboard-activities";
import { approvalItems, financeRows, quickActionsByRole, reportCategories, widgetsByRole } from "./data";
import { MarksGrid } from "./marks-grid";

const communicationSchema = z.object({
  template: z.string().min(1),
  channel: z.enum(["SMS", "Email"]),
  audience: z.string().min(2)
});

type CommunicationForm = z.infer<typeof communicationSchema>;

export function EnterpriseDashboard() {
  const role = useAuthStore((state) => state.role);
  const packageName = useCurrentSchoolStore((state) => state.packageName);
  const canAccess = usePermissionStore((state) => state.canAccess);
  const widgets = widgetsByRole[role];
  const quickActions = quickActionsByRole[role];

  const { data: health } = useQuery({
    queryKey: ["backend-health"],
    queryFn: async () => ({ status: "mocked", latency: "28ms" })
  });

  const form = useForm<CommunicationForm>({
    resolver: zodResolver(communicationSchema),
    defaultValues: {
      template: "Fee Reminder",
      channel: "SMS",
      audience: "Parents with balances"
    }
  });

  return (
    <div className="grid gap-5">
      <section className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1" aria-label="Dashboard widgets">
        {widgets.map((widget) => (
          <Card key={widget.label}>
            <CardContent className="pt-5">
              <span className="text-sm text-muted-foreground">{widget.label}</span>
              <strong className="mt-2 block text-2xl font-black">{widget.value}</strong>
              <small className="mt-1 block text-sm font-bold text-primary">{widget.helper}</small>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-12 gap-5">
        <Card className="col-span-8 max-xl:col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Dashboard engine</CardTitle>
              <CardDescription>Widgets, actions, pages, and approval routes are built from role, department, permissions, modules, and subscription package.</CardDescription>
            </div>
            <Badge tone="green">{health?.latency} API cache</Badge>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
                {["Backend returns user context", "Frontend builds operating surface", "Backend blocks direct API access"].map((item, index) => (
                  <div key={item} className="rounded-md border bg-muted/40 p-4">
                    <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-sm font-black text-primary-foreground">{index + 1}</span>
                    <strong className="mt-3 block">{item}</strong>
                    <p className="mt-1 text-sm text-muted-foreground">
                      School, role, department, permissions, modules, and package stay synchronized across UI and API calls.
                    </p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="quick-actions" className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <Button key={action} variant="outline">
                    <ArrowRight className="h-4 w-4" />
                    {action}
                  </Button>
                ))}
              </TabsContent>
              <TabsContent value="permissions" className="grid grid-cols-5 gap-2 max-lg:grid-cols-2">
                {["View", "Create", "Edit", "Delete", "Approve", "Reject", "Export", "Lock", "Unlock", "Send Message"].map((action) => (
                  <Badge key={action} tone={action === "Delete" ? "red" : action === "Approve" ? "green" : "blue"}>
                    {action}
                  </Badge>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-4 max-xl:col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Universal approval center</CardTitle>
              <CardDescription>Academic, finance, procurement, leave, and discipline approvals.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {approvalItems.map((item) => (
              <article key={item.title} className="grid grid-cols-[1fr_auto] gap-3 rounded-md border p-3">
                <div>
                  <strong className="block">{item.title}</strong>
                  <span className="text-sm text-muted-foreground">
                    {item.module} / {item.stage}
                  </span>
                </div>
                <Badge tone={item.priority === "high" ? "red" : item.priority === "medium" ? "gold" : "blue"}>{item.amount ?? item.priority}</Badge>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-7 max-xl:col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Marks entry interface</CardTitle>
              <CardDescription>AG Grid surface for Excel copy/paste, autosave-ready drafts, validation, bulk edit, keyboard navigation, and locking.</CardDescription>
            </div>
            <Button variant="outline">
              <FileSpreadsheet className="h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <MarksGrid />
          </CardContent>
        </Card>

        <Card className="col-span-5 max-xl:col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Finance workflow</CardTitle>
              <CardDescription>Draft to deputy approval to principal approval.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {financeRows.map(([label, value, amount]) => (
              <div key={label} className="grid grid-cols-[120px_1fr_80px] items-center gap-3 text-sm">
                <span>{label}</span>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
                </div>
                <strong>{amount}</strong>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-md border p-3 text-sm">
              <span>Draft</span>
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
              <span>Deputy Approval</span>
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
              <span>Principal Approval</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4 max-xl:col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Communication center</CardTitle>
              <CardDescription>Parents receive SMS and Gmail/email only.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3" onSubmit={form.handleSubmit(() => undefined)}>
              <input className="h-10 rounded-md border bg-card px-3 text-sm" {...form.register("template")} aria-label="Template" />
              <select className="h-10 rounded-md border bg-card px-3 text-sm" {...form.register("channel")} aria-label="Channel">
                <option>SMS</option>
                <option>Email</option>
              </select>
              <input className="h-10 rounded-md border bg-card px-3 text-sm" {...form.register("audience")} aria-label="Audience" />
              <Button type="submit">
                <MessageSquare className="h-4 w-4" />
                Queue message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="col-span-4 max-xl:col-span-12">
          <CardHeader>
            <div>
              <CardTitle>CBC assessment</CardTitle>
              <CardDescription>Learning areas, strands, sub-strands, competencies, and evidence upload.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {["EE", "ME", "AE", "BE"].map((level) => (
              <div key={level} className="flex items-center justify-between rounded-md border p-3">
                <span className="font-bold">{level}</span>
                <span className="text-sm text-muted-foreground">{competencyLabel(level)}</span>
              </div>
            ))}
            <Button variant="outline">
              <Upload className="h-4 w-4" />
              Attach evidence
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-4 max-xl:col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Reports center</CardTitle>
              <CardDescription>PDF, Excel, and CSV exports for school operations and compliance.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            {reportCategories.map((category) => (
              <div key={category} className="flex items-center justify-between rounded-md border p-3">
                <span>{category}</span>
                <Badge tone="green">PDF Excel CSV</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-12">
          <CardHeader>
            <div>
              <CardTitle>Full ERP module map</CardTitle>
              <CardDescription>Subscription and permission checks decide which modules appear and which actions are allowed.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-6 gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {[
              ["School Setup", "School Profile / Academic Years / Roles / Permissions"],
              ["Student 360", "Overview / Academics / Attendance / Finance / Health"],
              ["Curriculum", "CBC / 8-4-4 / Generic Marks / Generic Competency"],
              ["Attendance", "Student / Boarding / Staff quick marking"],
              ["Procurement", "Requested / Reviewed / Approved / Purchased / Received"],
              ["Future AI", "Generate exam / comments / attendance analysis"]
            ].map(([title, body]) => (
              <article key={title} className="rounded-md border p-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <strong className="mt-3 block">{title}</strong>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>

      <p className="sr-only">
        Current package access sample: {canAccess("finance", role, packageName) ? "finance visible" : "finance hidden"}.
      </p>
    </div>
  );
}

function competencyLabel(level: string) {
  return {
    EE: "Exceeding Expectations",
    ME: "Meeting Expectations",
    AE: "Approaching Expectations",
    BE: "Below Expectations"
  }[level];
}
