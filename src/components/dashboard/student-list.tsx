"use client";

import { useStudents } from "@/hooks/use-students";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function StudentList() {
  const { data, isLoading } = useStudents();

  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Student list</CardTitle>
            <CardDescription>School-wide student roster and admission status.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading students...</p>
          ) : (
            <div className="grid gap-3">
              {data?.map((student) => (
                <div key={student.id} className="rounded-md border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <strong>{student.name}</strong>
                    <span className="text-xs text-muted-foreground">{student.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{student.year} • {student.stream}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
