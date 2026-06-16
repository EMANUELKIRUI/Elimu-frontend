import { AppShell } from "@/layouts/app-shell";
import { StudentsList } from "@/components/students/students-list";

export default function StudentsPage() {
  return (
    <AppShell>
      <StudentsList />
    </AppShell>
  );
}

