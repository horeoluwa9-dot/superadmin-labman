import { useMemo, useState } from "react";
import { PageHeader, Panel, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Search, Columns3, Plus, CheckCircle2 } from "lucide-react";
import { STAFF } from "@/data/staff";
import { BRANCHES } from "@/lib/nav";
import { DEPARTMENTS } from "@/lib/forms";

const TITLES = ["Mr","Mrs","Ms","Dr","Prof","Master","Miss"];
const ROLE_OPTIONS = ["Administrator","Manager","Developer","Pathologist","Data Capturer","Representative","Laboratory Technician","Head Office","Doctor","Phlebotomist","Driver","Pre-Lab","Sales Manager","Lab Manager"];

const NEW_USER_FIELDS_LARAVEL = [
  { name: "title",     label: "Title",   type: "select" as const, options: TITLES, group: "Identity" },
  { name: "name",      label: "Name",    required: true, group: "Identity" },
  { name: "surname",   label: "Surname", group: "Identity" },
  { name: "email",     label: "Email",   type: "email" as const, required: true, group: "Identity", defaultValue: "william@nettsite.co.za" },
  { name: "laboratory",label: "Laboratory", type: "select" as const, options: BRANCHES, group: "Assignment" },
  { name: "department",label: "Department", type: "select" as const, options: DEPARTMENTS, group: "Assignment" },
  { name: "linkedDoctor", label: "Linked Doctor", group: "Doctor Link", span: 2 as const, hint: "Link this user to a doctor to allow doctor login access. Users linked to doctors should have the \"Doctor\" role." },
  { name: "roles",     label: "Roles", type: "multiselect" as const, options: ROLE_OPTIONS, group: "Roles", span: 2 as const },
  { name: "password",  label: "Password", type: "password" as const, required: true, group: "Account" },
  { name: "passwordConfirm", label: "Password confirmation", type: "password" as const, group: "Account" },
];

export default function Users() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const rows = STAFF;
  const filtered = useMemo(() =>
    rows.filter(s => !search || `${s.name} ${s.email} ${s.roles.join(" ")} ${s.branch}`.toLowerCase().includes(search.toLowerCase())),
    [rows, search]);

  const openCreate = () => form.open({
    title: "Create User", size: "xl",
    submitLabel: "Create",
    fields: NEW_USER_FIELDS_LARAVEL,
    successMessage: "User created · welcome email sent",
  });

  return (
    <>
      <PageHeader kicker="Section 8A · Authentication" title="Users" breadcrumb={["Authentication","Users","List"]}
        actions={
          <button onClick={openCreate} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5"/>New user
          </button>
        }
      />
      <Panel>
        <div className="flex items-center justify-end mb-3 gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search" className="pl-8 pr-3 py-1.5 border border-border rounded bg-white w-64" />
          </div>
          <button className="border border-border rounded p-1.5"><Columns3 className="h-4 w-4 text-muted-foreground"/></button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr>
              <th>Full name ▾</th><th>Email ▾</th><th>Laboratory ▾</th><th>Email Verified</th><th>Roles</th><th>Department</th><th>Created</th><th></th>
            </tr></thead>
            <tbody>
              {filtered.slice((page-1)*perPage, page*perPage).map(s => (
                <tr key={s.email} className="cursor-pointer" onClick={() => drawer.open({
                  title: s.name, subtitle: s.email,
                  meta: { Laboratory: s.branch, Roles: s.roles.join(", "), Verified: s.verified ? "Yes":"No", Status: s.status, "Last Login": s.lastLogin },
                  body: <p className="text-xs text-muted-foreground">Linked Laravel-style permission set. User is mapped to one or more roles; roles bundle permissions.</p>,
                  actions: [
                    { label: "Edit", tone: "primary", onClick: () => form.open({ title: `Edit ${s.name}`, size: "xl", fields: NEW_USER_FIELDS_LARAVEL.map(f => ({ ...f, defaultValue: f.name === "name" ? s.name.split(" ")[0] : f.name === "surname" ? s.name.split(" ").slice(1).join(" ") : f.name === "email" ? s.email : f.name === "laboratory" ? s.branch : f.name === "roles" ? s.roles : (f as any).defaultValue ?? "" })) }) },
                    { label: "Reset Password" },
                    { label: "Resend Verification" },
                    { label: s.status === "Suspended" ? "Reinstate" : "Suspend", tone: "danger" },
                  ],
                })}>
                  <td className="font-medium">{s.name}</td>
                  <td className="font-mono text-xs text-blue-700">{s.email}</td>
                  <td>{s.branch}</td>
                  <td>{s.verified ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <span className="text-muted-foreground text-xs">—</span>}</td>
                  <td className="text-xs">{s.roles.join(", ")}</td>
                  <td className="font-mono text-xs uppercase">{s.branch}</td>
                  <td className="font-mono text-xs">{s.lastLogin}</td>
                  <td onClick={e=>e.stopPropagation()}><button onClick={() => form.open({ title: `Edit ${s.name}`, size: "xl", fields: NEW_USER_FIELDS_LARAVEL })} className="text-blue-600 text-xs font-semibold">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs">
            <span className="text-muted-foreground">Showing {(page-1)*perPage+1} to {Math.min(page*perPage, filtered.length)} of {filtered.length} results</span>
            <div className="flex items-center gap-2">
              <span>Per page</span>
              <select value={perPage} onChange={e=>setPerPage(parseInt(e.target.value))} className="border border-border rounded px-2 py-0.5">{[10,25,50].map(n=><option key={n}>{n}</option>)}</select>
              <Pagination total={filtered.length} />
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
