const modules = [
  { id: "platform", label: "Platform", icon: "shield", packages: ["Enterprise"], roles: ["Platform Admin"] },
  { id: "setup", label: "School setup", icon: "settings", packages: ["Basic", "Standard", "Professional", "Enterprise"], roles: ["School Admin", "Principal", "Platform Admin"] },
  { id: "academics", label: "Academics", icon: "book", packages: ["Basic", "Standard", "Professional", "Enterprise"], roles: ["Principal", "Deputy Principal Academics", "Teacher", "HOD", "Board Chairperson", "School Admin"] },
  { id: "marks", label: "Marks entry", icon: "grid", packages: ["Basic", "Standard", "Professional", "Enterprise"], roles: ["Teacher", "HOD", "Deputy Principal Academics", "Principal"] },
  { id: "cbc", label: "CBC assessment", icon: "target", packages: ["Standard", "Professional", "Enterprise"], roles: ["Teacher", "HOD", "Deputy Principal Academics", "Principal"] },
  { id: "reports", label: "Report cards", icon: "file", packages: ["Standard", "Professional", "Enterprise"], roles: ["Teacher", "HOD", "Deputy Principal Academics", "Principal", "Board Chairperson"] },
  { id: "students", label: "Students", icon: "users", packages: ["Basic", "Standard", "Professional", "Enterprise"], roles: ["School Admin", "Principal", "Deputy Principal Academics", "Teacher", "HOD"] },
  { id: "attendance", label: "Attendance", icon: "check", packages: ["Basic", "Standard", "Professional", "Enterprise"], roles: ["Teacher", "HOD", "Deputy Principal Administration", "Deputy Principal Academics", "Principal"] },
  { id: "finance", label: "Finance", icon: "coins", packages: ["Basic", "Standard", "Professional", "Enterprise"], roles: ["Bursar", "Principal", "Board Chairperson", "Deputy Principal Administration", "School Admin"] },
  { id: "communication", label: "SMS / Gmail", icon: "mail", packages: ["Standard", "Professional", "Enterprise"], roles: ["Bursar", "Principal", "Deputy Principal Administration", "Deputy Principal Academics", "School Admin"] },
  { id: "hr", label: "HR & staff", icon: "briefcase", packages: ["Professional", "Enterprise"], roles: ["Principal", "Deputy Principal Administration", "School Admin", "HOD"] },
  { id: "procurement", label: "Procurement", icon: "cart", packages: ["Enterprise"], roles: ["Principal", "Deputy Principal Administration", "Board Chairperson", "School Admin"] },
  { id: "inventory", label: "Inventory", icon: "boxes", packages: ["Professional", "Enterprise"], roles: ["Principal", "Deputy Principal Administration", "HOD", "School Admin"] },
  { id: "library", label: "Library", icon: "library", packages: ["Professional", "Enterprise"], roles: ["Principal", "Deputy Principal Academics", "School Admin"] },
  { id: "boarding", label: "Boarding", icon: "bed", packages: ["Enterprise"], roles: ["Boarding HOD", "Deputy Principal Administration", "Principal", "School Admin"] },
  { id: "transport", label: "Transport", icon: "bus", packages: ["Professional", "Enterprise"], roles: ["Transport HOD", "Deputy Principal Administration", "Principal", "School Admin"] },
  { id: "discipline", label: "Discipline", icon: "alert", packages: ["Professional", "Enterprise"], roles: ["Discipline HOD", "Deputy Principal Administration", "Principal", "Teacher", "Board Chairperson"] },
  { id: "health", label: "Health clinic", icon: "heart", packages: ["Enterprise"], roles: ["Principal", "Deputy Principal Administration", "School Admin"] },
  { id: "events", label: "Events", icon: "calendar", packages: ["Standard", "Professional", "Enterprise"], roles: ["Teacher", "HOD", "Principal", "School Admin"] },
  { id: "audit", label: "Audit logs", icon: "activity", packages: ["Basic", "Standard", "Professional", "Enterprise"], roles: ["Platform Admin", "School Admin", "Principal", "Board Chairperson"] }
];

const packages = ["Basic", "Standard", "Professional", "Enterprise"];

const roles = [
  "Principal",
  "School Admin",
  "Platform Admin",
  "Board Chairperson",
  "Deputy Principal Academics",
  "Deputy Principal Administration",
  "Bursar",
  "Teacher",
  "HOD",
  "Boarding HOD",
  "Transport HOD",
  "Discipline HOD"
];

const roleContext = {
  "Platform Admin": ["Platform operations", "Schools, subscriptions, packages"],
  "School Admin": ["School configuration", "Users, permissions, modules"],
  "Board Chairperson": ["Governance dashboard", "Finance, academics, monitoring"],
  Principal: ["Whole-school command", "Leadership, approvals, reports"],
  "Deputy Principal Academics": ["Academic control", "Curriculum, exams, report approvals"],
  "Deputy Principal Administration": ["Operations control", "Discipline, boarding, transport, stock"],
  Bursar: ["Finance office", "Fees, payments, expenses, reminders"],
  Teacher: ["Teacher workspace", "Classes, attendance, marks, lesson plans"],
  HOD: ["Department workspace", "Department records, review, resource requests"],
  "Boarding HOD": ["Boarding workspace", "Dormitories, attendance, leave-outs"],
  "Transport HOD": ["Transport workspace", "Routes, vehicles, drivers, pickup points"],
  "Discipline HOD": ["Discipline workspace", "Incidents, counseling, parent alerts"]
};

const iconPaths = {
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  settings: "M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8M8 9h1",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  check: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  coins: "M12 8c0 2.21-3.58 4-8 4V8c4.42 0 8-1.79 8-4s-3.58-4-8-4M4 12v4c0 2.21 3.58 4 8 4s8-1.79 8-4v-4M4 8v4c0 2.21 3.58 4 8 4s8-1.79 8-4V8",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM22 6l-10 7L2 6",
  briefcase: "M10 6V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M2 13h20M4 6h20v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Z",
  cart: "M6 6h15l-1.5 9h-13L5 2H2M8 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  boxes: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16ZM3.3 7 12 12l8.7-5M12 22V12",
  library: "M4 19.5V4a2 2 0 0 1 2-2h14v20H6a2 2 0 0 1-2-2.5ZM8 6h8",
  bed: "M2 4v16M2 14h20v6M6 14V8h8a4 4 0 0 1 4 4v2",
  bus: "M6 17H4a2 2 0 0 1-2-2V6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v9a2 2 0 0 1-2 2h-2M6 17a2 2 0 1 0 4 0M14 17a2 2 0 1 0 4 0M2 10h20M7 6h10",
  alert: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.36a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0ZM12 9v4M12 17h.01",
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v16H3V6a2 2 0 0 1 2-2Z",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2"
};

const kpis = {
  Principal: [["Students", "1,284", "96% attendance"], ["Fee collection", "82%", "KES 4.8M pending"], ["Reports", "312", "ready for review"], ["Incidents", "7", "2 escalated"]],
  "Deputy Principal Academics": [["Marks sheets", "42", "11 awaiting HOD"], ["CBC evidence", "318", "64 new uploads"], ["Report cards", "312", "approval queue"], ["Syllabus", "87%", "coverage average"]],
  "Deputy Principal Administration": [["Staff attendance", "91%", "12 late arrivals"], ["Stock requests", "18", "6 need review"], ["Boarding", "428", "students present"], ["Transport", "16", "active routes"]],
  Bursar: [["Collected", "KES 8.7M", "this term"], ["Outstanding", "KES 4.8M", "send reminders"], ["Expenses", "KES 1.2M", "pending approval"], ["Receipts", "614", "issued this month"]],
  Teacher: [["Classes", "4", "assigned"], ["Attendance", "96%", "today"], ["Marks drafts", "3", "autosaved"], ["Lesson plans", "9", "2 due"]],
  "Platform Admin": [["Schools", "47", "42 active"], ["Subscriptions", "9", "renew this week"], ["Usage", "78%", "average package load"], ["Support", "13", "open tickets"]]
};

const approvals = [
  ["Science lab supplies", "Procurement request", "KES 142,000", "gold"],
  ["Form 2 Mathematics marks", "Academic approval", "HOD submitted", "green"],
  ["Boarding leave-out batch", "Administration", "18 students", "blue"],
  ["Transport fuel invoice", "Finance request", "KES 76,500", "red"]
];

const messages = [
  ["Fee reminders", "342 queued", "SMS"],
  ["Attendance alerts", "27 sent", "SMS"],
  ["Report cards", "88 emailed", "Gmail"],
  ["Emergency notice", "0 active", "Ready"]
];

const departments = [
  ["Academics", "Deputy Academics", "87% syllabus"],
  ["Finance", "Bursar", "82% collection"],
  ["Boarding", "Boarding HOD", "428 boarders"],
  ["Transport", "Transport HOD", "16 routes"]
];

const audits = [
  ["Marks locked", "Deputy Academics, 09:18"],
  ["Payment reversed", "Bursar, 10:44"],
  ["Permission changed", "School Admin, 11:20"],
  ["Subscription renewed", "Platform Admin, 12:05"]
];

const finance = [
  ["Fees paid", 82, "KES 8.7M"],
  ["Balances", 44, "KES 4.8M"],
  ["Expenses", 31, "KES 1.2M"],
  ["Payroll", 68, "KES 3.4M"],
  ["Bursaries", 23, "KES 820K"]
];

const marksRows = [
  ["Achieng N.", 76, 82, 79, "A-", "Draft"],
  ["Kamau P.", 64, 70, 67, "B", "Draft"],
  ["Otieno S.", 58, 61, 60, "C+", "Review"],
  ["Wanjiku M.", 88, 91, 90, "A", "Submitted"]
];

const cbcRows = [
  ["Achieng N.", "Numbers", "ME", "Uploaded", "Review"],
  ["Kamau P.", "Patterns", "AE", "Missing", "Draft"],
  ["Otieno S.", "Measurement", "ME", "Uploaded", "Submitted"],
  ["Wanjiku M.", "Data", "EE", "Uploaded", "Submitted"]
];

const roleSelect = document.querySelector("#roleSelect");
const packageSelect = document.querySelector("#packageSelect");
const moduleNav = document.querySelector("#moduleNav");
const pageTitle = document.querySelector("#pageTitle");
const contextLabel = document.querySelector("#contextLabel");
const enabledModules = document.querySelector("#enabledModules");
const approvalCount = document.querySelector("#approvalCount");
const messageCount = document.querySelector("#messageCount");
const subscriptionState = document.querySelector("#subscriptionState");
const kpiGrid = document.querySelector("#kpiGrid");
const approvalList = document.querySelector("#approvalList");
const messageList = document.querySelector("#messageList");
const departmentList = document.querySelector("#departmentList");
const auditList = document.querySelector("#auditList");
const financeChart = document.querySelector("#financeChart");
const dataTable = document.querySelector("#dataTable");
const tableTitle = document.querySelector("#tableTitle");
const tableSubtitle = document.querySelector("#tableSubtitle");

let activeModule = "academics";

roles.forEach((role) => {
  roleSelect.add(new Option(role, role, role === "Principal", role === "Principal"));
});

packages.forEach((plan) => {
  packageSelect.add(new Option(plan, plan, plan === "Enterprise", plan === "Enterprise"));
});

function visibleModules() {
  const role = roleSelect.value;
  const plan = packageSelect.value;
  return modules.filter((module) => module.roles.includes(role) && module.packages.includes(plan));
}

function svgIcon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${iconPaths[name]}"/></svg>`;
}

function renderNav() {
  const list = visibleModules();
  if (!list.some((module) => module.id === activeModule)) {
    activeModule = list[0]?.id ?? "";
  }

  moduleNav.innerHTML = list.map((module) => `
    <button class="module-link ${module.id === activeModule ? "active" : ""}" type="button" data-module="${module.id}">
      ${svgIcon(module.icon)}
      <span>${module.label}</span>
      <small>${permissionLabel(module.id)}</small>
    </button>
  `).join("");

  moduleNav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeModule = button.dataset.module;
      render();
    });
  });
}

function permissionLabel(moduleId) {
  const role = roleSelect.value;
  if (role.includes("HOD") || role === "Teacher") return "scoped";
  if (role === "Board Chairperson") return "view";
  if (moduleId === "finance" && role !== "Bursar" && role !== "Principal") return "approve";
  return "full";
}

function renderHeader() {
  const [title, subtitle] = roleContext[roleSelect.value] ?? roleContext.Principal;
  pageTitle.textContent = title;
  contextLabel.textContent = `${packageSelect.value} package / ${subtitle}`;
  subscriptionState.textContent = packageSelect.value === "Basic" ? "Active Basic" : "Active";
  enabledModules.textContent = visibleModules().length.toString();
  approvalCount.textContent = approvals.length.toString();
  messageCount.textContent = "457";
}

function renderKpis() {
  const roleKpis = kpis[roleSelect.value] ?? kpis.Principal;
  kpiGrid.innerHTML = roleKpis.map(([label, value, note]) => `
    <article class="kpi">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
    </article>
  `).join("");
}

function renderApprovals() {
  approvalList.innerHTML = approvals.map(([title, detail, meta, tone]) => `
    <article class="approval-item">
      <div>
        <strong>${title}</strong>
        <span>${detail}</span>
      </div>
      <span class="pill ${tone}">${meta}</span>
    </article>
  `).join("");
}

function renderLists() {
  messageList.innerHTML = messages.map(([title, detail, tag]) => `
    <article class="message-item"><div><strong>${title}</strong><span>${detail}</span></div><span class="pill blue">${tag}</span></article>
  `).join("");

  departmentList.innerHTML = departments.map(([title, owner, note]) => `
    <article class="department-item"><div><strong>${title}</strong><span>${owner}</span></div><span>${note}</span></article>
  `).join("");

  auditList.innerHTML = audits.map(([title, detail]) => `
    <article class="audit-item"><div><strong>${title}</strong><span>${detail}</span></div></article>
  `).join("");
}

function renderFinance() {
  financeChart.innerHTML = finance.map(([label, value, amount]) => `
    <div class="bar-row">
      <span>${label}</span>
      <div class="bar-track"><div class="bar-fill" style="width: ${value}%"></div></div>
      <strong>${amount}</strong>
    </div>
  `).join("");
}

function renderTable() {
  const cbcMode = activeModule === "cbc";
  tableTitle.textContent = cbcMode ? "CBC competency assessment" : activeModule === "finance" ? "Fee balances" : "Marks entry";
  tableSubtitle.textContent = cbcMode ? "Learning areas, strands, evidence, and progress levels." : activeModule === "finance" ? "Invoices, payments, reminders, and balances." : "Draft sheets, validation, submission, and locking.";

  if (cbcMode) {
    dataTable.innerHTML = `
      <thead><tr><th>Student</th><th>Strand</th><th>Level</th><th>Evidence</th><th>Status</th></tr></thead>
      <tbody>${cbcRows.map(([student, strand, level, evidence, status]) => `
        <tr><td>${student}</td><td>${strand}</td><td><select><option>${level}</option><option>EE</option><option>ME</option><option>AE</option><option>BE</option></select></td><td>${evidence}</td><td>${status}</td></tr>
      `).join("")}</tbody>
    `;
    return;
  }

  if (activeModule === "finance") {
    dataTable.innerHTML = `
      <thead><tr><th>Student</th><th>Invoice</th><th>Paid</th><th>Balance</th><th>Reminder</th></tr></thead>
      <tbody>
        <tr><td>Achieng N.</td><td>KES 72,000</td><td>KES 60,000</td><td>KES 12,000</td><td>SMS queued</td></tr>
        <tr><td>Kamau P.</td><td>KES 72,000</td><td>KES 72,000</td><td>KES 0</td><td>Cleared</td></tr>
        <tr><td>Otieno S.</td><td>KES 72,000</td><td>KES 38,000</td><td>KES 34,000</td><td>Email sent</td></tr>
        <tr><td>Wanjiku M.</td><td>KES 72,000</td><td>KES 56,000</td><td>KES 16,000</td><td>SMS sent</td></tr>
      </tbody>
    `;
    return;
  }

  dataTable.innerHTML = `
    <thead><tr><th>Student</th><th>CAT</th><th>Exam</th><th>Total</th><th>Grade</th><th>Status</th></tr></thead>
    <tbody>${marksRows.map(([student, cat, exam, total, grade, status]) => `
      <tr><td>${student}</td><td><input type="number" value="${cat}" min="0" max="100"></td><td><input type="number" value="${exam}" min="0" max="100"></td><td>${total}</td><td>${grade}</td><td>${status}</td></tr>
    `).join("")}</tbody>
  `;
}

function render() {
  renderNav();
  renderHeader();
  renderKpis();
  renderApprovals();
  renderLists();
  renderFinance();
  renderTable();
}

roleSelect.addEventListener("change", render);
packageSelect.addEventListener("change", render);

render();
