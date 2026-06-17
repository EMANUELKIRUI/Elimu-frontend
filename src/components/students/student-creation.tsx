"use client";

import { useRouter } from "next/navigation";
import { useCreateStudent } from "@/hooks/use-students";
import { StudentForm, type StudentFormData } from "@/components/students/student-form";
import { PageHeader } from "@/components/common/page-header";
import { useState } from "react";

export function StudentCreation() {
  const router = useRouter();
  const createStudent = useCreateStudent();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: StudentFormData) => {
    setErrorMessage(null);
    try {
      await createStudent.mutateAsync(data);
      router.push("/students");
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Unable to create student. Please try again.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Create student" description="Add a new student record and enrollment details." backButton onBack={() => router.push("/students")} />
      {errorMessage && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>}
      <StudentForm onSubmit={onSubmit} loading={createStudent.isPending} />
    </div>
  );
}
