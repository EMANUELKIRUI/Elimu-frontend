"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useStudentsData, useDeleteStudent } from "@/hooks/use-students";
import { PageHeader } from "@/components/common/page-header";
import { SearchInput } from "@/components/common/search-input";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/empty-state";
import { Loading } from "@/components/common/loading";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { Student } from "@/types/modules";
import { MoreHorizontal, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const columnHelper = createColumnHelper<Student>();
const classOptions = ["Form 1", "Form 2", "Form 3", "Form 4"];
const streamOptions = ["A", "B", "C", "D"];
const statusOptions = ["active", "inactive", "graduated", "transferred"];
const yearOptions = ["2024", "2025", "2026", "2027"];
const genderOptions = ["Male", "Female", "Other"];

export function StudentsList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [streamFilter, setStreamFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filters = useMemo(() => {
    return {
      ...(search ? { search } : {}),
      ...(classFilter ? { className: classFilter } : {}),
      ...(streamFilter ? { streamName: streamFilter } : {}),
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(yearFilter ? { year: yearFilter } : {}),
      ...(genderFilter ? { gender: genderFilter } : {})
    };
  }, [search, classFilter, streamFilter, statusFilter, yearFilter, genderFilter]);

  const { data, isPending } = useStudentsData(page, 10, filters);
  const deleteStudent = useDeleteStudent();

  const columns: ColumnDef<Student, any>[] = [
    columnHelper.accessor((row) => row.photoUrl ?? "", {
      id: "student",
      header: "Student",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
            {info.row.original.firstName?.[0] ?? "S"}
          </div>
          <div>
            <p className="font-medium text-slate-900">{info.row.original.firstName} {info.row.original.lastName}</p>
            <p className="text-xs text-slate-500">{info.row.original.admissionNo}</p>
          </div>
        </div>
      )
    }),
    columnHelper.accessor("className", {
      header: "Class"
    }),
    columnHelper.accessor("streamName", {
      header: "Stream"
    }),
    columnHelper.accessor("gender", {
      header: "Gender"
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <StatusBadge
          status={info.getValue()}
          variant={
            info.getValue() === "active"
              ? "success"
              : info.getValue() === "graduated"
              ? "info"
              : "warning"
          }
        />
      )
    }),
    columnHelper.accessor("balance", {
      header: "Balance",
      cell: (info) => (
        <span>{typeof info.getValue() === "number" ? `KES ${info.getValue().toLocaleString()}` : "N/A"}</span>
      )
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/students/${info.row.original.id}`)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/students/${info.row.original.id}/edit` as any)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/students/transfer?studentId=${info.row.original.id}`)}>
              <Pencil className="h-4 w-4 mr-2" />
              Transfer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeleteConfirm(info.row.original.id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    })
  ];

  return (
    <>
      <PageHeader
        title="Students"
        description="Manage student admissions, enrollment, and records"
        actions={
          <Button
            onClick={() => router.push("/students/create")}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_auto]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="grid gap-2 text-sm">
              <span className="text-slate-700">Class</span>
              <select
                value={classFilter}
                onChange={(event) => setClassFilter(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All classes</option>
                {classOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-slate-700">Stream</span>
              <select
                value={streamFilter}
                onChange={(event) => setStreamFilter(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All streams</option>
                {streamOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-slate-700">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All statuses</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-slate-700">Gender</span>
              <select
                value={genderFilter}
                onChange={(event) => setGenderFilter(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All genders</option>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-slate-700">Year</span>
              <select
                value={yearFilter}
                onChange={(event) => setYearFilter(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All years</option>
                {yearOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-1">
            <Button variant="outline" onClick={() => router.push("/students/import")}>Import Students</Button>
            <Button variant="outline" onClick={() => router.push("/students/promote")}>Bulk Promotion</Button>
            <Button variant="outline" onClick={() => router.push("/students/transfer")}>Student Transfer</Button>
            <Button variant="outline" onClick={() => router.push("/students/analytics")}>Analytics</Button>
          </div>
        </div>

        <SearchInput
          placeholder="Search by name, admission number..."
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
        />

        <Loading isLoading={isPending}>
          {data && data.data.length > 0 ? (
            <DataTable
              columns={columns}
              data={data.data}
              pagination={{ pageIndex: page - 1, pageSize: 10 }}
              pageCount={data.totalPages}
              onPaginationChange={(p) => setPage(p.pageIndex + 1)}
            />
          ) : (
            <EmptyState
              title="No students found"
              description="Start by adding your first student to the system"
              action={{
                label: "Add Student",
                onClick: () => router.push("/students/create")
              }}
            />
          )}
        </Loading>
      </div>

      <ConfirmDialog
        open={!!deleteConfirm}
        title="Delete Student"
        description="Are you sure you want to delete this student? This action cannot be undone."
        onConfirm={() => {
          if (deleteConfirm) {
            deleteStudent.mutate(deleteConfirm);
            setDeleteConfirm(null);
          }
        }}
        onCancel={() => setDeleteConfirm(null)}
        loading={deleteStudent.isPending}
      />
    </>
  );
}
