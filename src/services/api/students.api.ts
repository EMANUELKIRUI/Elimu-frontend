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
  }
};
