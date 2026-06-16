import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentsApi, type StudentRecord } from "@/services/api/students.api";
import { Student } from "@/types/modules";

export function useStudents() {
  return useQuery<StudentRecord[], Error>({
    queryKey: ["students"],
    queryFn: studentsApi.list,
    staleTime: 1000 * 60 * 2
  });
}

export function useStudentsData(page = 1, pageSize = 10, filters?: Record<string, any>) {
  return useQuery({
    queryKey: ["students", page, pageSize, filters],
    queryFn: () => studentsApi.getStudents(page, pageSize, filters)
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => studentsApi.getStudent(id),
    enabled: !!id
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Student>) => studentsApi.createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    }
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Student> }) =>
      studentsApi.updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    }
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => studentsApi.deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    }
  });
}

export function useStudentAcademicRecords(studentId: string) {
  return useQuery({
    queryKey: ["students", studentId, "academic-records"],
    queryFn: () => studentsApi.getAcademicRecords(studentId),
    enabled: !!studentId
  });
}

export function useStudentAttendance(studentId: string) {
  return useQuery({
    queryKey: ["students", studentId, "attendance"],
    queryFn: () => studentsApi.getAttendance(studentId),
    enabled: !!studentId
  });
}

export function useStudentFinance(studentId: string) {
  return useQuery({
    queryKey: ["students", studentId, "finance"],
    queryFn: () => studentsApi.getFinance(studentId),
    enabled: !!studentId
  });
}

