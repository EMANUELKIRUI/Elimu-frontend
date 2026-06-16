"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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

export function StudentsList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { data, isPending } = useStudentsData(page, 10, search ? { search } : undefined);
  const deleteStudent = useDeleteStudent();

  const columns: ColumnDef<Student>[] = [
    columnHelper.accessor("admissionNo", {
      header: "Admission No",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>
    }),
    columnHelper.accessor("firstName", {
      header: "Name",
      cell: (info) => (
        <span>
          {info.row.original.firstName} {info.row.original.lastName}
        </span>
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
            <DropdownMenuItem onClick={() => router.push(`/students/${info.row.original.id}/edit`)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
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
