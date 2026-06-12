import { useQuery } from "@tanstack/react-query";
import { studentsApi, type StudentRecord } from "@/services/api/students.api";

export function useStudents() {
  return useQuery<StudentRecord[], Error>({
    queryKey: ["students"],
    queryFn: studentsApi.list,
    staleTime: 1000 * 60 * 2
  });
}
