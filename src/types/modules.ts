// Dashboard Types
export interface DashboardOverview {
  students: number;
  teachers: number;
  classes: number;
  attendance: number;
  revenue: number;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  createdAt: string;
  description?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "exam" | "meeting" | "event" | "parent_meeting";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  createdAt: string;
}

// Student Types
export interface Student {
  id: string;
  admissionNo: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  nationality: string;
  religion?: string;
  birthCertificateNo?: string;
  phone?: string;
  email?: string;
  photoUrl?: string;
  address?: string;
  county?: string;
  subCounty?: string;
  fatherName?: string;
  motherName?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianOccupation?: string;
  bloodGroup?: string;
  allergies?: string;
  medicalConditions?: string;
  disability?: string;
  balance?: number;
  classId: string;
  className: string;
  streamId: string;
  streamName: string;
  status: "active" | "inactive" | "graduated" | "transferred";
  admissionDate: string;
}

export interface StudentAcademicRecord {
  id: string;
  studentId: string;
  examId: string;
  examName: string;
  mark: number;
  grade: string;
  subject: string;
  date: string;
}

export interface StudentAttendance {
  date: string;
  status: "present" | "absent" | "late";
}

export interface StudentFinance {
  id: string;
  invoiceNo: string;
  amount: number;
  paid: number;
  balance: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

// Class Types
export interface Class {
  id: string;
  name: string;
  level: string;
  capacity: number;
  studentCount: number;
  streamCount: number;
  classTeacherId?: string;
  classTeacherName?: string;
  description?: string;
  status: "active" | "inactive";
}

export interface Stream {
  id: string;
  name: string;
  classId: string;
  className: string;
  capacity: number;
  studentCount: number;
  teacherId?: string;
  teacherName?: string;
  status: "active" | "inactive";
}

export interface ClassTeacher {
  id: string;
  classId: string;
  teacherId: string;
  subjectId?: string;
  role: "class_teacher" | "subject_teacher";
}

// Common Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}
