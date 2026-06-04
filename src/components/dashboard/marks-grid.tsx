"use client";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import type { ColDef } from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { useMemo } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule, ClipboardModule, RangeSelectionModule]);

type MarkRow = {
  student: string;
  english: number;
  math: number;
  science: number;
  total: number;
  grade: string;
  status: string;
};

const rows: MarkRow[] = [
  { student: "Achieng N.", english: 76, math: 82, science: 79, total: 79, grade: "A-", status: "Draft" },
  { student: "Kamau P.", english: 64, math: 70, science: 67, total: 67, grade: "B", status: "Submitted" },
  { student: "Otieno S.", english: 58, math: 61, science: 60, total: 60, grade: "HOD Approved", status: "Review" },
  { student: "Wanjiku M.", english: 88, math: 91, science: 90, total: 90, grade: "A", status: "Locked" },
  { student: "Mutiso L.", english: 71, math: 77, science: 74, total: 75, grade: "B+", status: "Deputy Approved" }
];

export function MarksGrid() {
  const columnDefs = useMemo<ColDef<MarkRow>[]>(
    () => [
      { field: "student", headerName: "Student", pinned: "left", minWidth: 160 },
      { field: "english", headerName: "Eng", editable: true, type: "numericColumn" },
      { field: "math", headerName: "Math", editable: true, type: "numericColumn" },
      { field: "science", headerName: "Science", editable: true, type: "numericColumn" },
      { field: "total", headerName: "Average", type: "numericColumn" },
      { field: "grade", headerName: "Grade" },
      { field: "status", headerName: "Approval Status", minWidth: 150 }
    ],
    []
  );

  return (
    <div className="ag-theme-quartz h-[330px] w-full">
      <AgGridReact
        rowData={rows}
        columnDefs={columnDefs}
        defaultColDef={{
          flex: 1,
          minWidth: 110,
          resizable: true,
          sortable: true
        }}
        enableRangeSelection
        copyHeadersToClipboard
        rowSelection="multiple"
        suppressMovableColumns
      />
    </div>
  );
}
