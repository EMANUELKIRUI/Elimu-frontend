"use client";

import { useMemo } from "react";
import { useStudent, useStudentAcademicRecords, useStudentAttendance, useStudentFinance } from "@/hooks/use-students";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/common/loading";
import { PageHeader } from "@/components/common/page-header";
import { Student } from "@/types/modules";

interface StudentProfileProps {
  studentId: string;
}

function formatName(student: Student) {
  return [student.firstName, student.middleName, student.lastName].filter(Boolean).join(" ");
}

export function StudentProfile({ studentId }: StudentProfileProps) {
  const { data: student, isPending, isError } = useStudent(studentId);
  const { data: academicRecords } = useStudentAcademicRecords(studentId);
  const { data: attendance } = useStudentAttendance(studentId);
  const { data: finance } = useStudentFinance(studentId);

  const attendanceSummary = useMemo(() => {
    if (!attendance) return { present: 0, absent: 0, late: 0, percentage: 0 };
    const present = attendance.filter((item) => item.status === "present").length;
    const absent = attendance.filter((item) => item.status === "absent").length;
    const late = attendance.filter((item) => item.status === "late").length;
    const total = attendance.length || 1;
    return { present, absent, late, percentage: Math.round((present / total) * 100) };
  }, [attendance]);

  if (isPending) {
    return <Loading isLoading={true}><></></Loading>;
  }

  if (isError || !student) {
    return (
      <div className="p-8 text-center text-slate-700">
        <p className="text-xl font-semibold">Unable to load student profile.</p>
        <p className="mt-2">Please try again or return to the student list.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={formatName(student)}
        description={`Admission No: ${student.admissionNo} • ${student.className} ${student.streamName} • ${student.status}`}
      />

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Student overview</CardTitle>
            <CardDescription>Snapshot of the learner&apos;s current profile.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100 text-3xl font-black text-slate-700">
                {student.firstName[0] ?? "S"}
              </div>
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <Badge tone={student.status === "active" ? "green" : student.status === "graduated" ? "blue" : "gold"}>
                  {student.status}
                </Badge>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Gender</p>
                <p className="font-semibold text-slate-900">{student.gender}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Date of birth</p>
                <p className="font-semibold text-slate-900">{student.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Nationality</p>
                <p className="font-semibold text-slate-900">{student.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Admission date</p>
                <p className="font-semibold text-slate-900">{student.admissionDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Present</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{attendanceSummary.present}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Absent</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{attendanceSummary.absent}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Late</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{attendanceSummary.late}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Attendance rate</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{attendanceSummary.percentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guardian</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div>
                <p className="text-sm text-slate-500">Father</p>
                <p className="font-medium text-slate-900">{student.fatherName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Mother</p>
                <p className="font-medium text-slate-900">{student.motherName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Guardian</p>
                <p className="font-medium text-slate-900">{student.guardianName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Contact</p>
                <p className="font-medium text-slate-900">{student.guardianPhone || student.phone || "Not available"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student 360</CardTitle>
          <CardDescription>Access academic, attendance, finance, health, and document details in tabs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="guardians">Guardians</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
              <TabsTrigger value="boarding">Boarding</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="grid gap-4">
              <div className="grid gap-4 rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Full name</p>
                <p className="font-semibold text-slate-900">{formatName(student)}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-slate-500">Class</p>
                    <p className="font-semibold text-slate-900">{student.className}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Stream</p>
                    <p className="font-semibold text-slate-900">{student.streamName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Balance</p>
                    <p className="font-semibold text-slate-900">N/A</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guardians" className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Father", value: student.fatherName || "Not provided" },
                  { label: "Mother", value: student.motherName || "Not provided" },
                  { label: "Guardian", value: student.guardianName || "Not provided" }
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-50 p-6">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Contact information</p>
                <p className="mt-2 text-slate-900">{student.guardianPhone || student.phone || "Not available"}</p>
              </div>
            </TabsContent>

            <TabsContent value="academics" className="grid gap-4">
              {academicRecords && academicRecords.length > 0 ? (
                <div className="grid gap-3">
                  {academicRecords.map((record) => (
                    <div key={record.id} className="rounded-3xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-500">Subject</p>
                          <p className="font-semibold text-slate-900">{record.subject}</p>
                        </div>
                        <Badge tone={record.grade === "A" ? "green" : record.grade === "B" ? "blue" : "gold"}>{record.grade}</Badge>
                      </div>
                      <div className="mt-2 grid gap-2 sm:grid-cols-3">
                        <p>{record.examName}</p>
                        <p>{record.mark} marks</p>
                        <p>{record.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No academic records available yet.</p>
              )}
            </TabsContent>

            <TabsContent value="attendance" className="grid gap-4">
              {attendance && attendance.length > 0 ? (
                <div className="grid gap-3">
                  {attendance.map((item) => (
                    <div key={item.date} className="rounded-3xl bg-slate-50 p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">{item.date}</p>
                        <p className="font-semibold text-slate-900">{item.status}</p>
                      </div>
                      <Badge tone={item.status === "present" ? "green" : item.status === "absent" ? "red" : "gold"}>{item.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No attendance data available.</p>
              )}
            </TabsContent>

            <TabsContent value="finance" className="grid gap-4">
              {finance && finance.length > 0 ? (
                <div className="grid gap-3">
                  {finance.map((item) => (
                    <div key={item.id} className="rounded-3xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-500">Invoice</p>
                          <p className="font-semibold text-slate-900">{item.invoiceNo}</p>
                        </div>
                        <Badge tone={item.status === "paid" ? "green" : item.status === "pending" ? "gold" : "red"}>{item.status}</Badge>
                      </div>
                      <div className="mt-2 grid gap-2 sm:grid-cols-3">
                        <p>Amount: KES {item.amount}</p>
                        <p>Paid: KES {item.paid}</p>
                        <p>Balance: KES {item.balance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No finance records available.</p>
              )}
            </TabsContent>

            <TabsContent value="medical" className="grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-6 grid gap-4">
                <div>
                  <p className="text-sm text-slate-500">Allergies</p>
                  <p className="mt-2 text-slate-900">{student.allergies || "None recorded"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Medical conditions</p>
                  <p className="mt-2 text-slate-900">{student.medicalConditions || "None recorded"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Disability</p>
                  <p className="mt-2 text-slate-900">{student.disability || "None recorded"}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Birth Certificate", status: "Available" },
                  { label: "Passport Photo", status: "Available" },
                  { label: "Admission Letter", status: "Pending" }
                ].map((document) => (
                  <div key={document.label} className="rounded-3xl bg-slate-50 p-6">
                    <p className="text-sm text-slate-500">{document.label}</p>
                    <p className="mt-2 font-semibold text-slate-900">{document.status}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transport" className="grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Assigned route</p>
                <p className="mt-2 text-slate-900">Not assigned</p>
                <p className="text-sm text-slate-500 mt-4">Pickup point</p>
                <p className="mt-2 text-slate-900">Not assigned</p>
                <p className="text-sm text-slate-500 mt-4">Bus</p>
                <p className="mt-2 text-slate-900">Not assigned</p>
              </div>
            </TabsContent>

            <TabsContent value="boarding" className="grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Dormitory</p>
                <p className="mt-2 text-slate-900">Not assigned</p>
                <p className="text-sm text-slate-500 mt-4">Room</p>
                <p className="mt-2 text-slate-900">Not assigned</p>
                <p className="text-sm text-slate-500 mt-4">Bed</p>
                <p className="mt-2 text-slate-900">Not assigned</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
