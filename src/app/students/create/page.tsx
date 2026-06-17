import { AppShell } from "@/layouts/app-shell";
import { StudentCreation } from "@/components/students/student-creation";

export default function CreateStudentPage() {
  return (
    <AppShell>
      <StudentCreation />
    </AppShell>
  );
}
