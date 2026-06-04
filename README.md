# Elimu ERP Frontend

Enterprise Next.js frontend for a multi-school education operating system.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS, shadcn-style primitives, Radix-ready components
- Zustand stores for auth, current school, permissions, theme, and notifications
- Axios and TanStack Query API layer
- React Hook Form and Zod for forms
- AG Grid for marks, attendance, finance, inventory, library, and reporting grids

## Architecture

The frontend is built around backend-delivered context:

```text
School
Role
Department
Permissions
Modules
Subscription Package
```

That context drives the app shell, sidebar, dashboards, widgets, pages, actions, approvals, and reports. Users only see module surfaces that match their role and package, while the backend remains the final authority for API access.

## Implemented Surfaces

- Role/package-aware `AppShell`
- Dynamic sidebar from `src/modules/index.ts`
- Shared permission checks in `src/stores/permission-store.ts`
- Role-based dashboard widgets and quick actions
- Reusable module page renderer in `src/components/modules/module-page.tsx`
- Route coverage for students, academics, curriculum, CBC, marks, report cards, attendance, finance, communication, HR, inventory, procurement, library, boarding, transport, health, discipline, events, reports, analytics, approvals, settings, users, roles, permissions, schools, platform, and audit logs

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.
