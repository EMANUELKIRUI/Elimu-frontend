"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { classesApi, streamsApi } from "@/services/api/classes.api";
import { Class, Stream } from "@/types/modules";

export function useClasses(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ["classes", page, pageSize],
    queryFn: () => classesApi.getClasses(page, pageSize)
  });
}

export function useClass(id: string) {
  return useQuery({
    queryKey: ["classes", id],
    queryFn: () => classesApi.getClass(id),
    enabled: !!id
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Class>) => classesApi.createClass(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    }
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Class> }) =>
      classesApi.updateClass(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    }
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => classesApi.deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    }
  });
}

export function useClassStreams(classId: string) {
  return useQuery({
    queryKey: ["classes", classId, "streams"],
    queryFn: () => classesApi.getClassStreams(classId),
    enabled: !!classId
  });
}

export function useClassStudents(classId: string, page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ["classes", classId, "students", page, pageSize],
    queryFn: () => classesApi.getClassStudents(classId, page, pageSize),
    enabled: !!classId
  });
}

export function useClassAttendance(classId: string) {
  return useQuery({
    queryKey: ["classes", classId, "attendance"],
    queryFn: () => classesApi.getClassAttendance(classId),
    enabled: !!classId
  });
}

export function useClassPerformance(classId: string) {
  return useQuery({
    queryKey: ["classes", classId, "performance"],
    queryFn: () => classesApi.getClassPerformance(classId),
    enabled: !!classId
  });
}

// Streams
export function useStreams(classId?: string) {
  return useQuery({
    queryKey: ["streams", classId],
    queryFn: () => streamsApi.getStreams(classId)
  });
}

export function useStream(id: string) {
  return useQuery({
    queryKey: ["streams", id],
    queryFn: () => streamsApi.getStream(id),
    enabled: !!id
  });
}

export function useCreateStream() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Stream>) => streamsApi.createStream(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streams"] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    }
  });
}

export function useUpdateStream() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Stream> }) =>
      streamsApi.updateStream(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streams"] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    }
  });
}

export function useDeleteStream() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => streamsApi.deleteStream(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streams"] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    }
  });
}
