import { Student, PaginatedResponse, StudentAcademicRecord, StudentAttendance, StudentFinance } from "@/types/modules";
import { apiClient } from "@/services/api-client";

export type StudentRecord = {
  id: string;
  name: string;
  year: string;
  stream: string;
  status: "Active" | "Graduated" | "Transferred";
};

export const studentsApi = {
  list: async (): Promise<StudentRecord[]> => {
    const response = await apiClient.get("/students");
    return response.data;
  },
  getProfile: async (studentId: string) => {
    const response = await apiClient.get(`/students/${studentId}`);
    return response.data;
  },
  getStudents: async (page = 1, pageSize = 10, filters?: Record<string, any>): Promise<PaginatedResponse<Student>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...filters
    });
    const response = await apiClient.get(`/students?${params}`);
    return response.data;
  },

  getStudent: async (id: string): Promise<Student> => {
    const response = await apiClient.get(`/students/${id}`);
    return response.data;
  },

  createStudent: async (data: Partial<Student>): Promise<Student> => {
    const response = await apiClient.post("/students", data);
    return response.data;
  },

  updateStudent: async (id: string, data: Partial<Student>): Promise<Student> => {
    const response = await apiClient.patch(`/students/${id}`, data);
    return response.data;
  },

  deleteStudent: async (id: string): Promise<void> => {
    const response = await apiClient.delete(`/students/${id}`);
    return response.data;
  },

  getAcademicRecords: async (studentId: string): Promise<StudentAcademicRecord[]> => {
    return apiClient.get(`/students/${studentId}/academic-records`);
  },

  getAttendance: async (studentId: string): Promise<StudentAttendance[]> => {
    return apiClient.get(`/students/${studentId}/attendance`);
  },

  getFinance: async (studentId: string): Promise<StudentFinance[]> => {
    return apiClient.get(`/students/${studentId}/finance`);
  },

  importStudents: async (file: File): Promise<{ imported: number; errors: any[] }> => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post("/students/import", formData);
  },

  exportStudents: async (classId?: string): Promise<Blob> => {
    const params = classId ? `?classId=${classId}` : "";
    return apiClient.get(`/students/export${params}`, { responseType: "blob" });
  }
};
