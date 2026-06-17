import type { ApprovalItem, DashboardWidget, Role } from "@/types";

export const widgetsByRole: Partial<Record<Role, DashboardWidget[]>> = {
  "Platform Admin": [
    { label: "Schools", value: "47", helper: "42 active subscriptions" },
    { label: "Renewals", value: "9", helper: "due this week" },
    { label: "Usage", value: "78%", helper: "average module load" },
    { label: "Support", value: "13", helper: "open tickets" }
  ],
  "School Admin": [
    { label: "Users", value: "184", helper: "12 pending setup" },
    { label: "Roles", value: "18", helper: "permission groups" },
    { label: "Modules", value: "15", helper: "enabled for school" },
    { label: "Audit events", value: "326", helper: "this term" }
  ],
  "Board Chairperson": [
    { label: "Academic trends", value: "83%", helper: "school average" },
    { label: "Revenue trends", value: "82%", helper: "term collection" },
    { label: "Growth", value: "+7%", helper: "enrollment" },
    { label: "Departments", value: "11", helper: "performance reports" }
  ],
  Principal: [
    { label: "Enrollment", value: "1,284", helper: "96% attendance" },
    { label: "Revenue", value: "KES 8.7M", helper: "82% collected" },
    { label: "Academic performance", value: "78%", helper: "mean score" },
    { label: "Approvals", value: "24", helper: "across departments" }
  ],
  "Deputy Principal Academics": [
    { label: "Marks sheets", value: "42", helper: "11 awaiting HOD" },
    { label: "CBC evidence", value: "318", helper: "64 new uploads" },
    { label: "Report cards", value: "312", helper: "approval queue" },
    { label: "Syllabus", value: "87%", helper: "coverage average" }
  ],
  "Deputy Principal Administration": [
    { label: "Staff attendance", value: "91%", helper: "12 late arrivals" },
    { label: "Stock requests", value: "18", helper: "6 need review" },
    { label: "Boarding", value: "428", helper: "students present" },
    { label: "Transport", value: "16", helper: "active routes" }
  ],
  Bursar: [
    { label: "Collections today", value: "KES 624K", helper: "128 payments" },
    { label: "Outstanding balances", value: "KES 4.8M", helper: "342 reminders" },
    { label: "Invoices", value: "1,284", helper: "term billing" },
    { label: "Pending payments", value: "7", helper: "approval timeline" }
  ],
  Teacher: [
    { label: "Today's classes", value: "4", helper: "assigned" },
    { label: "Pending attendance", value: "2", helper: "class registers" },
    { label: "Pending marks", value: "3", helper: "offline drafts" },
    { label: "Lesson plans", value: "9", helper: "2 due" }
  ],
  HOD: [
    { label: "Department performance", value: "81%", helper: "term average" },
    { label: "Pending approvals", value: "9", helper: "marks and requests" },
    { label: "Staff attendance", value: "94%", helper: "department" },
    { label: "Resource requests", value: "5", helper: "needs review" }
  ],
  "Boarding HOD": [
    { label: "Dormitories", value: "8", helper: "all inspected" },
    { label: "Boarding attendance", value: "428", helper: "present tonight" },
    { label: "Leave outs", value: "18", helper: "await approval" },
    { label: "Incidents", value: "3", helper: "open cases" }
  ],
  "Transport HOD": [
    { label: "Vehicles", value: "12", helper: "10 operational" },
    { label: "Routes", value: "16", helper: "active" },
    { label: "Fuel", value: "KES 76K", helper: "pending invoice" },
    { label: "Maintenance", value: "4", helper: "scheduled" }
  ],
  "Discipline HOD": [
    { label: "Incidents", value: "7", helper: "2 escalated" },
    { label: "Warnings", value: "14", helper: "this month" },
    { label: "Counselling", value: "11", helper: "active notes" },
    { label: "Rewards", value: "26", helper: "issued" }
  ]
};

export const approvalItems: ApprovalItem[] = [
  { title: "Form 2 Mathematics marks", module: "academics", stage: "HOD submitted", priority: "medium" },
  { title: "Science lab supplies", module: "procurement", stage: "Deputy review", amount: "KES 142,000", priority: "high" },
  { title: "Transport fuel invoice", module: "finance", stage: "Principal approval", amount: "KES 76,500", priority: "high" },
  { title: "Boarding leave-out batch", module: "boarding", stage: "Administration review", priority: "low" }
];

export const quickActionsByRole: Partial<Record<Role, string[]>> = {
  Teacher: ["Take Attendance", "Enter Marks", "View Timetable"],
  HOD: ["Review Marks", "Approve Request", "Department Report"],
  Bursar: ["Record Payment", "Send Reminder", "Create Invoice"],
  Principal: ["Open Approvals", "Review Reports", "Send Notice"],
  "Board Chairperson": ["View Finance", "View Academic Trends", "Request Clarification"],
  "Deputy Principal Academics": ["Approve Results", "Return Corrections", "Generate Reports"],
  "Deputy Principal Administration": ["Review Operations", "Approve Request", "Escalate Matter"],
  "School Admin": ["Create User", "Assign Role", "Enable Module"],
  "Platform Admin": ["Register School", "Renew Subscription", "Open Support"],
  "Boarding HOD": ["Allocate Bed", "Mark Boarding", "Review Leave-Out"],
  "Transport HOD": ["Assign Route", "Log Fuel", "Schedule Maintenance"],
  "Discipline HOD": ["Record Incident", "Send Alert", "Open Counselling"]
};

export const financeRows = [
  ["Fees paid", 82, "KES 8.7M"],
  ["Balances", 44, "KES 4.8M"],
  ["Expenses", 31, "KES 1.2M"],
  ["Payroll", 68, "KES 3.4M"],
  ["Bursaries", 23, "KES 820K"]
] as const;

export const reportCategories = ["Academic", "Finance", "Attendance", "HR", "Inventory", "Government"];
