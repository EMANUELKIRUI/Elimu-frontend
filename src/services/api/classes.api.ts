import { Class, Stream, PaginatedResponse } from "@/types/modules";
import { apiClient } from "@/services/api-client";

export const classesApi = {
  getClasses: async (page = 1, pageSize = 10): Promise<PaginatedResponse<Class>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString()
    });
    return apiClient.get(`/classes?${params}`);
  },

  getClass: async (id: string): Promise<Class> => {
    return apiClient.get(`/classes/${id}`);
  },

  createClass: async (data: Partial<Class>): Promise<Class> => {
    return apiClient.post("/classes", data);
  },

  updateClass: async (id: string, data: Partial<Class>): Promise<Class> => {
    return apiClient.patch(`/classes/${id}`, data);
  },

  deleteClass: async (id: string): Promise<void> => {
    return apiClient.delete(`/classes/${id}`);
  },

  getClassStreams: async (classId: string): Promise<Stream[]> => {
    return apiClient.get(`/classes/${classId}/streams`);
  },

  getClassStudents: async (classId: string, page = 1, pageSize = 10) => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString()
    });
    return apiClient.get(`/classes/${classId}/students?${params}`);
  },

  getClassAttendance: async (classId: string) => {
    return apiClient.get(`/classes/${classId}/attendance`);
  },

  getClassPerformance: async (classId: string) => {
    return apiClient.get(`/classes/${classId}/performance`);
  }
};

export const streamsApi = {
  getStreams: async (classId?: string): Promise<Stream[]> => {
    const params = classId ? `?classId=${classId}` : "";
    return apiClient.get(`/streams${params}`);
  },

  getStream: async (id: string): Promise<Stream> => {
    return apiClient.get(`/streams/${id}`);
  },

  createStream: async (data: Partial<Stream>): Promise<Stream> => {
    return apiClient.post("/streams", data);
  },

  updateStream: async (id: string, data: Partial<Stream>): Promise<Stream> => {
    return apiClient.patch(`/streams/${id}`, data);
  },

  deleteStream: async (id: string): Promise<void> => {
    return apiClient.delete(`/streams/${id}`);
  }
};
