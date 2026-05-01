import { useState, useMemo } from "react";
import { PageHeader, Panel, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Plus, Search, Edit, Columns3 } from "lucide-react";
import { NEW_DEPT_FIELDS } from "@/lib/forms";
import { toast } from "sonner";

type D = { id: string; name: string; code: string; order: number; pk: number; head?: string; sla?: string };

const ROWS_INIT: D[] = [
  { id: "9d605bbc-734a-492f-b009-ff8bb9aa3024", name: "HAEM",  code: "H", order: 2,  pk: 1,  head: "mrs ida thakam",   sla: "6h" },
  { id: "9d605bbc-7a2d-49e1-9b4b-131f749b55c4", name: "CHEM",  code: "C", order: 4,  pk: 2,  head: "Dr. R. Yemmy",     sla: "4h" },
  { id: "9d605bbc-7e42-4fc7-914d-10b53f08f347", name: "SERO",  code: "S", order: 6,  pk: 3,  head: "Dr. M. Phakathi",  sla: "24h" },
  { id: "9d605bbc-8070-4887-aec6-09fcb5644985", name: "ISOT",  code: "I", order: 8,  pk: 4,  head: "Dr. M. Phakathi",  sla: "48h" },
  { id: "9d605bbc-8390-4a62-9241-5fac92a8c899", name: "HISTO", code: "P", order: 12, pk: 5,  head: "mr francis ike",   sla: "5d" },
  { id: "9d605bbc-8fa8-4af9-8b13-f2f97704e3af", name: "MICRO", code: "M", order: 10, pk: 7,  head: "Dr. F. Ike",       sla: "48h" },
  { id: "9d605bbc-9828-4a47-a335-ddda2f60522f", name: "HIV",   code: "V", order: 13, pk: 83, head: "Dr. M. Phakathi",  sla: "24h" },
  { id: "9d605bbc-9c45-4d33-8a84-86c6f43759fb", name: "DIABE", code: "D", order: 15, pk: 84, head: "Dr. R. Yemmy",     sla: "24h" },
];

export default function Departments() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const action = useActionDialog();
  const [rows, setRows] = useState(ROWS_INIT);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(
    () => rows.filter(r => !search || `${r.name} ${r.code} ${r.id}`.toLowerCase().includes(search.toLowerCase())),
    [rows, search]
  );

  const openCreate = () => form.open({
    title: "New Department",
    fields: NEW_DEPT_FIELDS, size: "lg", submitLabel: "Create",
    onSubmit: (v) => setRows(rs => [{ id: crypto.randomUUID(), name: v.name, code: v.code, order: Number(v.order)||0, pk: Number(v.pk)||0, head: v.head, sla: v.tat }, ...rs]),
  });
  const openEdit = (r: D) => form.open({
    title: `Edit ${r.name}`, fields: NEW_DEPT_FIELDS.map(f => ({ ...f, defaultValue: (r as any)[f.name] ?? f.defaultValue ?? "" })),
    size: "lg", submitLabel: "Save",
    onSubmit: (v) => setRows(rs => rs.map(x => x.id === r.id ? { ...x, ...v, order: Number(v.order)||x.order, pk: Number(v.pk)||x.pk } : x)),
  });
  const confirmDelete = (r: D) => action.open({
    title: `Delete ${r.name}?`, tone: "reject", requireReason: true,
    reasonLabel: "Reason", confirmLabel: "Delete department",
    onConfirm: () => setRows(rs => rs.filter(x => x.id !== r.id)),
  });

  return (
    <>
      <PageHeader kicker="Section 5C · Administration" title="Departments" breadcrumb={["Administration","Departments","List"]}
        actions={
          <button onClick={openCreate} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" />New department
          </button>
        }
      />
      <Panel>
        <div className="flex items-center justify-end mb-3 gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="pl-8 pr-3 py-1.5 text-sm border border-border rounded bg-white w-64" />
          </div>
          <button className="border border-border rounded p-1.5"><Columns3 className="h-4 w-4 text-muted-foreground" /></button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th className="w-8"><input type="checkbox" /></th><th>Id</th><th>Department</th><th>Department code</th><th>Department order ▾</th><th>Pk ▾</th><th></th></tr></thead>
            <tbody>
              {filtered.slice(0, perPage).map(r => (
                <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                  title: r.name, subtitle: `Code ${r.code} · order ${r.order} · pk ${r.pk}`,
                  meta: { Id: r.id, Department: r.name, Code: r.code, Order: r.order, Pk: r.pk, Head: r.head||"—", "TAT SLA": r.sla||"—" },
                  actions: [
                    { label: "Edit", tone: "primary", onClick: () => openEdit(r) },
                    { label: "View Tests", onClick: () => toast.success(`Filter Tests by ${r.name}`) },
                    { label: "Delete", tone: "danger", onClick: () => confirmDelete(r) },
                  ],
                })}>
                  <td onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                  <td className="font-mono text-xs">{r.id}</td>
                  <td className="font-semibold">{r.name}</td>
                  <td>{r.code}</td>
                  <td>{r.order}</td>
                  <td>{r.pk}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <button onClick={() => openEdit(r)} className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold"><Edit className="h-3.5 w-3.5"/>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs">
            <span className="text-muted-foreground">Showing 1 to {Math.min(perPage, filtered.length)} of {filtered.length} results</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Per page</span>
              <select value={perPage} onChange={e => setPerPage(parseInt(e.target.value))} className="border border-border rounded px-2 py-0.5">
                {[10,25,50].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
