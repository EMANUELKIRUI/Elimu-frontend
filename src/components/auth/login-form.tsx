"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/stores/auth-store";
import { useCurrentSchoolStore, schools } from "@/stores/current-school-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectField } from "@/components/ui/select";

const roles = [
  "Platform Admin",
  "School Admin",
  "Principal",
  "Deputy Principal Academics",
  "Deputy Principal Administration",
  "Bursar",
  "Teacher",
  "HOD",
  "Board Chairperson",
  "Boarding HOD",
  "Transport HOD",
  "Discipline HOD"
] as const;

type RoleOption = (typeof roles)[number];

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(roles),
  school: z.string()
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const setSchool = useCurrentSchoolStore((state) => state.setSchool);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@africaschool.local",
      password: "secret123",
      role: "Principal",
      school: schools[0].id
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    login(
      {
        id: "user-001",
        name: "AfricaSchool Operator",
        email: data.email,
        role: data.role,
        department: data.role === "Bursar" ? "Finance" : data.role.includes("Academics") ? "Academics" : data.role.includes("Administration") ? "Administration" : data.role.includes("HOD") ? data.role.replace(" HOD", "") : "Leadership"
      },
      "mock-access-token",
      "mock-refresh-token"
    );
    setSchool(data.school);
    router.push("/");
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Login to AfricaSchool</CardTitle>
          <CardDescription>Access your school operating system with role-aware permissions and tenant context.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <label className="grid gap-2 text-sm">
            Email
            <input className="h-11 w-full rounded-md border px-3 text-sm" {...form.register("email")} />
          </label>
          <label className="grid gap-2 text-sm">
            Password
            <input type="password" className="h-11 w-full rounded-md border px-3 text-sm" {...form.register("password")} />
          </label>
          <SelectField
            label="Role"
            value={form.watch("role")}
            options={roles.map((item) => ({ label: item, value: item }))}
            onValueChange={(value) => form.setValue("role", value as RoleOption)}
          />
          <SelectField
            label="School"
            value={form.watch("school")}
            options={schools.map((school) => ({ label: school.name, value: school.id }))}
            onValueChange={(value) => form.setValue("school", value)}
          />

          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            Continue to dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
