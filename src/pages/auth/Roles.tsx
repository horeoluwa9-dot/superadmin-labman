import { useMemo, useState } from "react";
import { PageHeader, Panel, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Search, Columns3, Plus, Edit } from "lucide-react";

type RoleRow = { id: string; name: string; guard: "web"|"api"; perms: string[] };
const ALL_PERMS = [
  "audited-actions-view-any","audited-actions-view","canned-comments-view-any","canned-comments-view",
  "companies-view-any","companies-view","companies-create","companies-update","companies-delete",
  "departments-view-any","doctors-view-any","guarantors-view-any","laboratories-view-any",
  "medical-aids-view-any","medical-aids-create","notifiable-diseases-view-any","tariffs-view-any","tariffs-update",
  "users-view-any","users-create","users-update","roles-view-any","roles-create","roles-update",
  "results-release","results-verify","invoices-create","invoices-send","invoices-void",
  "leave-approve","payroll-process","expenses-approve","staff-suspend",
  "settings-update","backups-run","logs-view-any",
];

const ROWS_INIT: RoleRow[] = [
  { id: "R1", name: "Administrator",         guard: "web", perms: ALL_PERMS.slice(0, 40) },
  { id: "R2", name: "Manager",               guard: "web", perms: ALL_PERMS.slice(2, 22) },
  { id: "R3", name: "Developer",             guard: "web", perms: [] },
  { id: "R4", name: "Pathologist",           guard: "web", perms: [] },
  { id: "R5", name: "Data Capturer",         guard: "web", perms: [] },
  { id: "R6", name: "Representative",        guard: "web", perms: [] },
  { id: "R7", name: "Laboratory Technician", guard: "web", perms: [] },
  { id: "R8", name: "Head Office",           guard: "web", perms: ["companies-view","companies-create"] },
  { id: "R9", name: "Doctor",                guard: "web", perms: [] },
];

export default function Roles() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const [rows, setRows] = useState<RoleRow[]>(ROWS_INIT);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() =>
    rows.filter(r => !search || `${r.name} ${r.perms.join(" ")}`.toLowerCase().includes(search.toLowerCase())),
    [rows, search]);

  const ROLE_FIELDS = [
    { name: "name",  label: "Name", required: true, group: "Identity", span: 2 as const },
    { name: "guard", label: "Guard name", required: true, defaultValue: "web", type: "select" as const, options: ["web","api"], group: "Identity", span: 2 as const },
    { name: "perms", label: "Permissions", type: "multiselect" as const, options: ALL_PERMS, group: "Permissions", span: 2 as const, hint: "Bundle the actions this role can perform across the platform" },
  ];

  const openCreate = () => form.open({
    title: "Create Role", size: "xl", submitLabel: "Create",
    fields: ROLE_FIELDS,
    onSubmit: (v) => {
      setRows(rs => [...rs, { id: `R${rs.length+1}`, name: v.name, guard: v.guard, perms: v.perms || [] }]);
    },
  });

  const openEdit = (r: RoleRow) => form.open({
    title: `Edit ${r.name}`, size: "xl", submitLabel: "Save",
    fields: ROLE_FIELDS.map(f => ({ ...f, defaultValue: (r as any)[f.name] ?? (f as any).defaultValue ?? "" })),
  });

  return (
    <>
      <PageHeader kicker="Section 8B · Authentication" title="Roles" breadcrumb={["Authentication","Roles","List"]}
        actions={
          <button onClick={openCreate} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5"/>New role
          </button>
        }
      />
      <Panel>
        <div className="flex items-center justify-end mb-3 gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="pl-8 pr-3 py-1.5 border border-border rounded bg-white w-64" />
          </div>
          <button className="border border-border rounded p-1.5"><Columns3 className="h-4 w-4 text-muted-foreground"/></button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr>
              <th className="w-8"><input type="checkbox" /></th>
              <th>Name ▾</th><th>Guard name ▾</th><th># Permissions ▾</th><th>Permissions</th><th></th>
            </tr></thead>
            <tbody>
              {filtered.slice(0, perPage).map(r => {
                const visible = r.perms.slice(0, 5);
                const more = r.perms.length - visible.length;
                return (
                  <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                    title: r.name, subtitle: `${r.perms.length} permissions · guard: ${r.guard}`,
                    meta: { Guard: r.guard, Permissions: r.perms.length, "ISO Refs": "ISO 15189 §4.1, §5.1" },
                    body: (
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-navy">All permissions</div>
                        <div className="flex flex-wrap gap-1">
                          {r.perms.length === 0
                            ? <span className="text-xs text-muted-foreground">— No permissions assigned —</span>
                            : r.perms.map(p => <span key={p} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted">{p}</span>)}
                        </div>
                      </div>
                    ),
                    actions: [
                      { label: "Edit Permissions", tone: "primary", onClick: () => openEdit(r) },
                      { label: "Clone Role" },
                      { label: "Archive", tone: "danger" },
                    ],
                  })}>
                    <td onClick={e=>e.stopPropagation()}><input type="checkbox" /></td>
                    <td className="font-medium">{r.name}</td>
                    <td className="font-mono text-xs">{r.guard}</td>
                    <td className="font-mono">{r.perms.length}</td>
                    <td className="text-xs text-muted-foreground">
                      {r.perms.length === 0 ? "—" : (
                        <>
                          <span className="font-mono">{visible.join(", ")}</span>
                          {more > 0 && <span className="ml-2 text-target font-semibold">and {more} more</span>}
                        </>
                      )}
                    </td>
                    <td onClick={e=>e.stopPropagation()}>
                      <button onClick={() => openEdit(r)} className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold"><Edit className="h-3 w-3"/>Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs">
            <span className="text-muted-foreground">Showing 1 to {Math.min(perPage, filtered.length)} of {filtered.length} results</span>
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
