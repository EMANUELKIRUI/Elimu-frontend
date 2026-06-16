"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Student } from "@/types/modules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const studentSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string(),
  nationality: z.string(),
  religion: z.string().optional(),
  birthCertificateNo: z.string().optional(),
  admissionNo: z.string(),
  admissionDate: z.string(),
  classId: z.string(),
  streamId: z.string(),
  status: z.enum(["active", "inactive", "graduated", "transferred"]),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  county: z.string().optional(),
  subCounty: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianOccupation: z.string().optional(),
  bloodGroup: z.string().optional(),
  allergies: z.string().optional(),
  medicalConditions: z.string().optional(),
  disability: z.string().optional()
});

export type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  initialData?: Partial<Student>;
  onSubmit: (data: StudentFormData) => void;
  loading?: boolean;
}

export function StudentForm({ initialData, onSubmit, loading }: StudentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Student's basic details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
            <input
              {...register("firstName")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Middle Name</label>
            <input
              {...register("middleName")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
            <input
              {...register("lastName")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Gender *</label>
            <select
              {...register("gender")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth *</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nationality *</label>
            <input
              {...register("nationality")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {errors.nationality && <p className="mt-1 text-sm text-red-600">{errors.nationality.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Religion</label>
            <input
              {...register("religion")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Birth Certificate No</label>
            <input
              {...register("birthCertificateNo")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Admission Information */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Information</CardTitle>
          <CardDescription>Admission and class placement details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Admission Number *</label>
            <input
              {...register("admissionNo")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {errors.admissionNo && <p className="mt-1 text-sm text-red-600">{errors.admissionNo.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Admission Date *</label>
            <input
              type="date"
              {...register("admissionDate")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {errors.admissionDate && <p className="mt-1 text-sm text-red-600">{errors.admissionDate.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Class *</label>
            <select
              {...register("classId")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select Class</option>
              <option value="class-1">Form 1</option>
              <option value="class-2">Form 2</option>
              <option value="class-3">Form 3</option>
              <option value="class-4">Form 4</option>
            </select>
            {errors.classId && <p className="mt-1 text-sm text-red-600">{errors.classId.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Stream *</label>
            <select
              {...register("streamId")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select Stream</option>
              <option value="stream-a">A</option>
              <option value="stream-b">B</option>
              <option value="stream-c">C</option>
            </select>
            {errors.streamId && <p className="mt-1 text-sm text-red-600">{errors.streamId.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status *</label>
            <select
              {...register("status")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
              <option value="transferred">Transferred</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Student's contact and residential details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
            <input
              {...register("phone")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
            <input
              {...register("address")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">County</label>
            <input
              {...register("county")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sub County</label>
            <input
              {...register("subCounty")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Guardian Information */}
      <Card>
        <CardHeader>
          <CardTitle>Guardian Information</CardTitle>
          <CardDescription>Parent and guardian contact details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Father's Name</label>
            <input
              {...register("fatherName")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mother's Name</label>
            <input
              {...register("motherName")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Guardian Name</label>
            <input
              {...register("guardianName")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Guardian Phone</label>
            <input
              {...register("guardianPhone")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Guardian Occupation</label>
            <input
              {...register("guardianOccupation")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
          <CardDescription>Health and medical details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Blood Group</label>
            <select
              {...register("bloodGroup")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select Blood Group</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Allergies</label>
            <input
              {...register("allergies")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="List any known allergies"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Medical Conditions</label>
            <textarea
              {...register("medicalConditions")}
              className="min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="List any medical conditions or treatments"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Disability</label>
            <input
              {...register("disability")}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Describe any disability or special needs"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
          {loading ? "Saving..." : "Save Student"}
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
