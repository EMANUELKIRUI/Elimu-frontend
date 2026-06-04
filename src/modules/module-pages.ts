import type { ModuleKey, PermissionAction } from "@/types";

export type ModulePageConfig = {
  title: string;
  description: string;
  moduleKey: ModuleKey;
  primaryAction: string;
  sections: string[];
  workflows: string[];
  metrics: Array<{
    label: string;
    value: string;
    helper: string;
  }>;
  actions: PermissionAction[];
};

export const modulePageConfigs = {
  platform: {
    title: "Platform operations",
    description: "Multi-school SaaS controls for onboarding, subscriptions, support, and module governance.",
    moduleKey: "platform",
    primaryAction: "Register school",
    sections: ["School tenants", "Subscription packages", "Module catalog", "Support desk"],
    workflows: ["Trial setup", "Subscription renewal", "Module enablement", "Tenant audit"],
    metrics: [
      { label: "Schools", value: "47", helper: "42 active" },
      { label: "Renewals", value: "9", helper: "due this week" },
      { label: "Open tickets", value: "13", helper: "platform support" }
    ],
    actions: ["view", "create", "edit", "approve", "export"]
  },
  schools: {
    title: "Schools",
    description: "School records, branding, academic calendar, packages, and enabled modules.",
    moduleKey: "schools",
    primaryAction: "Create school",
    sections: ["School profile", "Branding", "Academic years", "Enabled modules"],
    workflows: ["Create tenant", "Assign package", "Configure modules", "Invite school admin"],
    metrics: [
      { label: "Active schools", value: "42", helper: "across Kenya" },
      { label: "Pending setup", value: "5", helper: "awaiting admin" },
      { label: "Enterprise", value: "18", helper: "subscriptions" }
    ],
    actions: ["view", "create", "edit", "approve", "export"]
  },
  students: {
    title: "Student 360",
    description: "Admissions, student records, guardians, documents, and full learner history.",
    moduleKey: "students",
    primaryAction: "Admit student",
    sections: ["Overview", "Academics", "Attendance", "Finance", "Discipline", "Health", "Boarding", "Transport", "Documents"],
    workflows: ["Admission", "Class placement", "Guardian linking", "Document verification"],
    metrics: [
      { label: "Enrollment", value: "1,284", helper: "active learners" },
      { label: "New admissions", value: "38", helper: "this term" },
      { label: "Missing docs", value: "17", helper: "need follow-up" }
    ],
    actions: ["view", "create", "edit", "export", "send-message"]
  },
  academics: {
    title: "Academics",
    description: "Classes, streams, subjects, exams, marks, timetables, and academic approvals.",
    moduleKey: "academics",
    primaryAction: "Create assessment",
    sections: ["Classes", "Streams", "Subjects", "Exams", "Marks", "Report cards"],
    workflows: ["Exam setup", "Marks submission", "HOD approval", "Principal lock"],
    metrics: [
      { label: "Mean score", value: "78%", helper: "term average" },
      { label: "Pending marks", value: "42", helper: "sheets" },
      { label: "Reports", value: "312", helper: "ready for review" }
    ],
    actions: ["view", "create", "edit", "approve", "reject", "export", "lock", "unlock"]
  },
  curriculum: {
    title: "Curriculum engine",
    description: "Configure CBC, 8-4-4, generic marks, and competency-based structures per school.",
    moduleKey: "academics",
    primaryAction: "Add curriculum level",
    sections: ["Levels", "Grades", "Classes", "Subjects", "Learning areas", "Grading"],
    workflows: ["Curriculum selection", "Grade setup", "Subject mapping", "Grading policy"],
    metrics: [
      { label: "Curricula", value: "4", helper: "supported modes" },
      { label: "Learning areas", value: "31", helper: "CBC configured" },
      { label: "Grade scales", value: "6", helper: "active policies" }
    ],
    actions: ["view", "create", "edit", "approve", "export"]
  },
  cbc: {
    title: "CBC assessment",
    description: "Learning areas, strands, sub-strands, competencies, rubric levels, and evidence uploads.",
    moduleKey: "academics",
    primaryAction: "Upload evidence",
    sections: ["Learning areas", "Strands", "Sub-strands", "Competencies", "Evidence"],
    workflows: ["Collect evidence", "Assess EE ME AE BE", "Moderate results", "Generate CBC report"],
    metrics: [
      { label: "Evidence", value: "318", helper: "uploads this term" },
      { label: "Competencies", value: "126", helper: "tracked" },
      { label: "Moderation", value: "64", helper: "pending" }
    ],
    actions: ["view", "create", "edit", "approve", "export"]
  },
  marks: {
    title: "Marks entry",
    description: "AG Grid marks entry with Excel copy/paste, autosave drafts, validation, keyboard navigation, and locking.",
    moduleKey: "academics",
    primaryAction: "Submit marks",
    sections: ["Marks grid", "Validation", "Offline drafts", "Approval status"],
    workflows: ["Draft", "Submitted", "HOD approved", "Deputy approved", "Principal approved", "Locked"],
    metrics: [
      { label: "Draft sheets", value: "11", helper: "autosaved" },
      { label: "Submitted", value: "31", helper: "awaiting review" },
      { label: "Locked", value: "18", helper: "finalized" }
    ],
    actions: ["view", "create", "edit", "approve", "reject", "export", "lock", "unlock"]
  },
  attendance: {
    title: "Attendance",
    description: "Student, boarding, and staff attendance with quick present, absent, and late marking.",
    moduleKey: "students",
    primaryAction: "Take attendance",
    sections: ["Student attendance", "Boarding attendance", "Staff attendance", "Alerts"],
    workflows: ["Open register", "Quick mark", "Notify parent", "Close register"],
    metrics: [
      { label: "Present", value: "96%", helper: "today" },
      { label: "Late", value: "27", helper: "learners" },
      { label: "Unmarked", value: "2", helper: "classes" }
    ],
    actions: ["view", "create", "edit", "export", "send-message"]
  },
  finance: {
    title: "Finance",
    description: "Fee structures, invoices, payments, receipts, expenses, approvals, and finance reports.",
    moduleKey: "finance",
    primaryAction: "Record payment",
    sections: ["Fee structures", "Invoices", "Payments", "Receipts", "Expenses", "Reports"],
    workflows: ["Draft", "Deputy approval", "Principal approval", "Posted"],
    metrics: [
      { label: "Collected today", value: "KES 624K", helper: "128 payments" },
      { label: "Expected", value: "KES 10.6M", helper: "term revenue" },
      { label: "Outstanding", value: "KES 4.8M", helper: "balances" }
    ],
    actions: ["view", "create", "edit", "approve", "reject", "export", "send-message"]
  },
  communication: {
    title: "Communication center",
    description: "SMS and email communication with templates for fees, attendance, exams, and emergencies.",
    moduleKey: "communication",
    primaryAction: "Queue message",
    sections: ["SMS", "Email", "Templates", "Audience filters"],
    workflows: ["Choose template", "Select audience", "Approve message", "Send"],
    metrics: [
      { label: "Queued", value: "342", helper: "fee reminders" },
      { label: "Templates", value: "18", helper: "approved" },
      { label: "Delivery", value: "98%", helper: "last 24 hours" }
    ],
    actions: ["view", "create", "edit", "approve", "reject", "send-message"]
  },
  hr: {
    title: "HR",
    description: "Employees, contracts, leave, payroll, appraisals, and staff records.",
    moduleKey: "hr",
    primaryAction: "Add employee",
    sections: ["Employees", "Contracts", "Leave", "Payroll", "Appraisals"],
    workflows: ["Hire", "Contract review", "Leave approval", "Payroll export"],
    metrics: [
      { label: "Employees", value: "184", helper: "active" },
      { label: "Leave", value: "12", helper: "pending" },
      { label: "Appraisals", value: "31", helper: "due" }
    ],
    actions: ["view", "create", "edit", "approve", "reject", "export"]
  },
  inventory: {
    title: "Inventory",
    description: "Assets, stock, maintenance, assignments, and accountability tracking.",
    moduleKey: "inventory",
    primaryAction: "Add asset",
    sections: ["Assets", "Stock", "Maintenance", "Assignments"],
    workflows: ["Receive stock", "Assign asset", "Request maintenance", "Write-off approval"],
    metrics: [
      { label: "Assets", value: "1,842", helper: "tracked" },
      { label: "Low stock", value: "19", helper: "items" },
      { label: "Maintenance", value: "7", helper: "open jobs" }
    ],
    actions: ["view", "create", "edit", "approve", "export"]
  },
  procurement: {
    title: "Procurement",
    description: "Kanban workflow for requests, review, approval, purchase, and receiving.",
    moduleKey: "procurement",
    primaryAction: "Create request",
    sections: ["Requested", "Reviewed", "Approved", "Purchased", "Received"],
    workflows: ["Requested", "Reviewed", "Approved", "Purchased", "Received"],
    metrics: [
      { label: "Requests", value: "24", helper: "open" },
      { label: "Approved", value: "9", helper: "await purchase" },
      { label: "Received", value: "14", helper: "this month" }
    ],
    actions: ["view", "create", "edit", "approve", "reject", "export"]
  },
  library: {
    title: "Library",
    description: "Books, borrowers, returns, overdue items, and library reporting.",
    moduleKey: "library",
    primaryAction: "Add book",
    sections: ["Books", "Borrowers", "Returns", "Overdue"],
    workflows: ["Catalog book", "Issue book", "Return book", "Overdue notice"],
    metrics: [
      { label: "Books", value: "8,420", helper: "cataloged" },
      { label: "Borrowed", value: "612", helper: "active loans" },
      { label: "Overdue", value: "37", helper: "needs notice" }
    ],
    actions: ["view", "create", "edit", "delete", "export"]
  },
  boarding: {
    title: "Boarding",
    description: "Dormitories, rooms, beds, attendance, incidents, and leave-outs.",
    moduleKey: "boarding",
    primaryAction: "Allocate bed",
    sections: ["Dormitories", "Rooms", "Beds", "Attendance", "Incidents", "Leave outs"],
    workflows: ["Allocate bed", "Night attendance", "Incident report", "Leave-out approval"],
    metrics: [
      { label: "Boarders", value: "428", helper: "present" },
      { label: "Beds free", value: "36", helper: "available" },
      { label: "Leave-outs", value: "18", helper: "pending" }
    ],
    actions: ["view", "create", "edit", "approve", "reject", "send-message"]
  },
  transport: {
    title: "Transport",
    description: "Vehicles, drivers, routes, fuel, maintenance, and route assignments.",
    moduleKey: "transport",
    primaryAction: "Assign route",
    sections: ["Vehicles", "Drivers", "Routes", "Fuel", "Maintenance"],
    workflows: ["Route planning", "Fuel logging", "Maintenance scheduling", "Parent alerts"],
    metrics: [
      { label: "Vehicles", value: "12", helper: "10 operational" },
      { label: "Routes", value: "16", helper: "active" },
      { label: "Fuel", value: "KES 76K", helper: "pending invoice" }
    ],
    actions: ["view", "create", "edit", "approve", "export", "send-message"]
  },
  health: {
    title: "Health",
    description: "Medical records, allergies, clinic visits, medication, and health alerts.",
    moduleKey: "health",
    primaryAction: "Record visit",
    sections: ["Medical records", "Allergies", "Clinic visits", "Medication"],
    workflows: ["Record visit", "Medication log", "Parent alert", "Follow-up"],
    metrics: [
      { label: "Clinic visits", value: "29", helper: "this week" },
      { label: "Allergies", value: "84", helper: "flagged" },
      { label: "Medication", value: "11", helper: "active logs" }
    ],
    actions: ["view", "create", "edit", "send-message"]
  },
  discipline: {
    title: "Discipline",
    description: "Incidents, warnings, suspensions, rewards, counselling, and escalation workflows.",
    moduleKey: "discipline",
    primaryAction: "Record incident",
    sections: ["Incidents", "Warnings", "Suspensions", "Rewards", "Counselling"],
    workflows: ["Record incident", "HOD review", "Parent notification", "Counselling follow-up"],
    metrics: [
      { label: "Incidents", value: "7", helper: "2 escalated" },
      { label: "Warnings", value: "14", helper: "this month" },
      { label: "Rewards", value: "26", helper: "issued" }
    ],
    actions: ["view", "create", "edit", "approve", "reject", "send-message"]
  },
  events: {
    title: "Events",
    description: "Calendar, sports, trips, meetings, clubs, and school-wide event communications.",
    moduleKey: "events",
    primaryAction: "Create event",
    sections: ["Calendar", "Sports", "Trips", "Meetings", "Clubs"],
    workflows: ["Plan event", "Approve budget", "Notify audience", "Track attendance"],
    metrics: [
      { label: "Events", value: "21", helper: "this term" },
      { label: "Trips", value: "4", helper: "await approval" },
      { label: "Clubs", value: "18", helper: "active" }
    ],
    actions: ["view", "create", "edit", "export", "send-message"]
  },
  reports: {
    title: "Reports center",
    description: "Academic, finance, attendance, HR, inventory, and government reports with PDF, Excel, and CSV exports.",
    moduleKey: "reports",
    primaryAction: "Generate report",
    sections: ["Academic", "Finance", "Attendance", "HR", "Inventory", "Government"],
    workflows: ["Choose category", "Apply filters", "Preview", "Export"],
    metrics: [
      { label: "Reports", value: "64", helper: "available" },
      { label: "Exports", value: "128", helper: "this week" },
      { label: "Scheduled", value: "9", helper: "automations" }
    ],
    actions: ["view", "export"]
  },
  analytics: {
    title: "Analytics",
    description: "Revenue trends, academic trends, enrollment trends, attendance trends, and forecasting.",
    moduleKey: "analytics",
    primaryAction: "Open trend",
    sections: ["Revenue trends", "Academic trends", "Enrollment trends", "Attendance trends"],
    workflows: ["Select metric", "Compare terms", "Segment cohorts", "Export insight"],
    metrics: [
      { label: "Revenue trend", value: "+12%", helper: "term over term" },
      { label: "Enrollment", value: "+7%", helper: "growth" },
      { label: "Attendance", value: "96%", helper: "rolling average" }
    ],
    actions: ["view", "export"]
  },
  settings: {
    title: "School setup",
    description: "School profile, academic years, terms, departments, roles, permissions, and enabled modules.",
    moduleKey: "settings",
    primaryAction: "Save setup",
    sections: ["School profile", "Academic years", "Terms", "Departments", "Roles", "Permissions", "Enabled modules"],
    workflows: ["Configure profile", "Open academic year", "Assign roles", "Enable modules"],
    metrics: [
      { label: "Roles", value: "18", helper: "permission groups" },
      { label: "Departments", value: "11", helper: "configured" },
      { label: "Modules", value: "15", helper: "enabled" }
    ],
    actions: ["view", "create", "edit", "delete", "approve", "reject", "export", "lock", "unlock", "send-message"]
  },
  users: {
    title: "Users",
    description: "Create users, assign roles, attach departments, and apply permission overrides.",
    moduleKey: "settings",
    primaryAction: "Create user",
    sections: ["Create user", "Assign role", "Assign department", "Assign permissions"],
    workflows: ["Invite user", "Assign role", "Set department", "Activate account"],
    metrics: [
      { label: "Users", value: "184", helper: "active" },
      { label: "Pending", value: "12", helper: "setup" },
      { label: "Locked", value: "3", helper: "accounts" }
    ],
    actions: ["view", "create", "edit", "delete", "lock", "unlock"]
  },
  roles: {
    title: "Roles",
    description: "Role templates for teachers, HODs, bursars, principals, board users, and admins.",
    moduleKey: "settings",
    primaryAction: "Create role",
    sections: ["Role profile", "Department scope", "Module access", "Permission matrix"],
    workflows: ["Define role", "Select modules", "Set actions", "Publish role"],
    metrics: [
      { label: "Roles", value: "18", helper: "active" },
      { label: "Scoped", value: "11", helper: "department roles" },
      { label: "Custom", value: "5", helper: "school-defined" }
    ],
    actions: ["view", "create", "edit", "delete", "approve"]
  },
  permissions: {
    title: "Permissions",
    description: "Permission matrix for view, create, edit, delete, approve, reject, export, lock, unlock, and send message.",
    moduleKey: "settings",
    primaryAction: "Update matrix",
    sections: ["View", "Create", "Edit", "Delete", "Approve", "Reject", "Export", "Lock", "Unlock", "Send Message"],
    workflows: ["Select role", "Choose module", "Toggle actions", "Audit change"],
    metrics: [
      { label: "Actions", value: "10", helper: "permission verbs" },
      { label: "Modules", value: "19", helper: "controlled" },
      { label: "Overrides", value: "22", helper: "user-specific" }
    ],
    actions: ["view", "create", "edit", "delete", "approve", "reject", "export", "lock", "unlock", "send-message"]
  },
  approvals: {
    title: "Approval center",
    description: "Universal approval inbox for academics, finance, procurement, leave, and discipline.",
    moduleKey: "reports",
    primaryAction: "Review queue",
    sections: ["Academic approvals", "Finance approvals", "Procurement approvals", "Leave approvals", "Discipline approvals"],
    workflows: ["Open request", "Review timeline", "Approve or reject", "Notify owner"],
    metrics: [
      { label: "Pending", value: "24", helper: "all modules" },
      { label: "High priority", value: "7", helper: "needs action" },
      { label: "Returned", value: "5", helper: "with comments" }
    ],
    actions: ["view", "approve", "reject", "export"]
  },
  "audit-logs": {
    title: "Audit logs",
    description: "Track who did what, when, from which module, and from which IP address.",
    moduleKey: "audit",
    primaryAction: "Export audit",
    sections: ["User", "Module", "Action", "Date", "IP address"],
    workflows: ["Filter events", "Inspect record", "Export evidence", "Archive"],
    metrics: [
      { label: "Events", value: "326", helper: "this term" },
      { label: "Users", value: "74", helper: "active actors" },
      { label: "Exports", value: "6", helper: "compliance" }
    ],
    actions: ["view", "export"]
  },
  "report-cards": {
    title: "Report cards",
    description: "Preview, generate PDF, email parents, print, and collect staged comments.",
    moduleKey: "academics",
    primaryAction: "Generate PDF",
    sections: ["Preview", "Teacher comment", "HOD comment", "Deputy comment", "Principal comment"],
    workflows: ["Teacher comment", "HOD comment", "Deputy comment", "Principal comment", "Publish"],
    metrics: [
      { label: "Ready", value: "312", helper: "students" },
      { label: "Pending comments", value: "47", helper: "teachers" },
      { label: "Published", value: "0", helper: "locked until approval" }
    ],
    actions: ["view", "create", "edit", "approve", "export", "send-message"]
  }
} satisfies Record<string, ModulePageConfig>;

export type ModulePageId = keyof typeof modulePageConfigs;
