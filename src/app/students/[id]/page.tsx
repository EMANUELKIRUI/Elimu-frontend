import { StudentProfile } from "@/components/students/student-profile";

export default function StudentProfilePage({ params }: { params: any }) {
  return <StudentProfile studentId={params.id} />;
}
