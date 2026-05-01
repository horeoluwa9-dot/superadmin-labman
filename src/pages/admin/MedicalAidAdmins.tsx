import { useState, useMemo } from "react";
import { PageHeader, Panel, Pill, Pagination, fmtZAR } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Plus, Search, Edit, Trash2, Filter as FilterIcon } from "lucide-react";
import { NEW_MA_ADMIN_FIELDS } from "@/lib/forms";
import { toast } from "sonner";

type A = {
  id: string; name: string; webAddress?: string; webUsername?: string;
  schemes: number; contact: string; telephone?: string; fax?: string;
  address?: string; postal?: string; comment?: string;
  status: "Live" | "Onboarding";
};

const ROWS_INIT: A[] = [
  { id: "ADM-001", name: "HEALTH SERVICES MANAGEMENT TRUST", schemes: 6, contact: "ops@hsmt.co.za",          telephone: "+27 11 555 1100", status: "Live" },
  { id: "ADM-002", name: "Discovery Admin",       schemes: 1, contact: "ops@discovery.co.za",     telephone: "+27 11 529 0000", status: "Live" },
  { id: "ADM-003", name: "Medscheme",             schemes: 12, contact: "labs@medscheme.com",      telephone: "+27 11 671 0000", status: "Live" },
  { id: "ADM-004", name: "Metropolitan Health",   schemes: 4, contact: "gems@metropolitan.co.za", telephone: "+27 21 940 8500", status: "Live" },
  { id: "ADM-005", name: "Universal Healthcare",  schemes: 3, contact: "claims@universal.co.za",  telephone: "+27 11 208 1000", status: "Live" },
  { id: "ADM-006", name: "Bonitas Admin",         schemes: 1, contact: "labs@bonitas.co.za",      telephone: "+27 11 538 0000", status: "Live" },
  { id: "ADM-007", name: "Polmed Admin",          schemes: 1, contact: "labs@polmed.co.za",       telephone: "+27 12 366 7000", status: "Live" },
  { id: "ADM-008", name: "PSMAS Direct",          schemes: 1, contact: "claims@psmas.co.zw",      telephone: "+263 4 707 555",  status: "Live" },
  { id: "ADM-009", name: "AXA Direct (NG)",       schemes: 1, contact: "ops@axamansard.com",      telephone: "+234 1 277 2000", status: "Onboarding" },
];

export default function MedicalAidAdmins() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const action = useActionDialog();
  const [rows, setRows] = useState(ROWS_INIT);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All"|"Live"|"Onboarding">("All");

  const filtered = useMemo(() => rows.filter(r => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    if (search && !`${r.name} ${r.contact} ${r.id}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [rows, search, statusFilter]);

  const openCreate = () => form.open({
    title: "Create Medical Aid Administrator",
    subtitle: "All fields are saved to the administrator master and audited.",
    fields: NEW_MA_ADMIN_FIELDS,
    size: "xl",
    submitLabel: "Create",
    successMessage: "Administrator created",
    onSubmit: (v) => {
      setRows(rs => [{ id: `ADM-${String(rs.length+1).padStart(3,"0")}`, name: v.name, schemes: 0, contact: v.email||"—", telephone: v.telephone, status: "Onboarding" }, ...rs]);
    },
  });

  const openEdit = (r: A) => form.open({
    title: `Edit Medical Aid Administrator — ${r.name}`,
    subtitle: "Update administrator details. Changes are audit-logged.",
    fields: NEW_MA_ADMIN_FIELDS.map(f => ({ ...f, defaultValue: (r as any)[f.name] ?? f.defaultValue ?? "" })),
    size: "xl",
    submitLabel: "Save changes",
    successMessage: "Administrator updated",
    onSubmit: (v) => {
      setRows(rs => rs.map(x => x.id === r.id ? { ...x, ...v } : x));
    },
  });

  const confirmDelete = (r: A) => action.open({
    title: `Delete ${r.name}?`,
    subtitle: "This is permanent. All linked schemes will be unassigned.",
    tone: "reject",
    requireReason: true,
    reasonLabel: "Reason for deletion",
    presetReasons: ["Duplicate","Merger","Inactive","Replaced"],
    confirmLabel: "Delete administrator",
    onConfirm: () => {
      setRows(rs => rs.filter(x => x.id !== r.id));
      toast.success(`${r.name} deleted`);
    },
  });

  const downloadCsv = () => {
    const csv = ["Code,Administrator,Schemes,Contact,Telephone,Status",
      ...filtered.map(r => [r.id, r.name, r.schemes, r.contact, r.telephone||"", r.status].join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "medical-aid-administrators.csv";
    a.click();
    toast.success("Exported CSV");
  };

  return (
    <>
      <PageHeader kicker="Section 5D · Administration" title="Medical Aid Administrators"
        breadcrumb={["Administration","Medical Aid Admins","List"]}
        actions={
          <div className="flex gap-2">
            <button onClick={downloadCsv} className="border border-border bg-white text-xs font-semibold px-3 py-2 rounded-lg">Export CSV</button>
            <button onClick={() => window.print()} className="border border-border bg-white text-xs font-semibold px-3 py-2 rounded-lg">Print</button>
            <button onClick={openCreate} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" /> New Administrator
            </button>
          </div>
        }
      />
      <Panel>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search administrators…" className="pl-8 pr-3 py-1.5 text-sm border border-border rounded bg-white w-72" />
          </div>
          <FilterIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="border border-border rounded px-2 py-1.5 text-xs bg-white">
            <option>All</option><option>Live</option><option>Onboarding</option>
          </select>
          <span className="ml-auto text-xs text-muted-foreground">{filtered.length} of {rows.length}</span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Code</th><th>Administrator</th><th>Schemes</th><th>Contact</th><th>Telephone</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                  title: r.name, subtitle: r.id,
                  meta: { Schemes: r.schemes, Contact: r.contact, Telephone: r.telephone||"—", Status: r.status },
                  body: <p className="text-xs text-muted-foreground">EDI claims switching, member-funds confirmation, and remittance reconciliation flow through this administrator.</p>,
                  actions: [
                    { label: "Edit", tone: "primary", onClick: () => openEdit(r) },
                    { label: "Open Claims Portal", onClick: () => toast.success(`Opening ${r.name} portal in new tab`) },
                    { label: "View Schemes", onClick: () => toast.success(`${r.schemes} schemes listed`) },
                    { label: "Delete", tone: "danger", onClick: () => confirmDelete(r) },
                  ],
                })}>
                  <td className="font-mono text-xs">{r.id}</td>
                  <td className="font-medium">{r.name}</td>
                  <td className="font-mono">{r.schemes}</td>
                  <td className="font-mono text-xs">{r.contact}</td>
                  <td className="font-mono text-xs">{r.telephone||"—"}</td>
                  <td><Pill tone={r.status==="Live"?"success":"warning"}>{r.status}</Pill></td>
                  <td onClick={e => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(r)} className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold"><Edit className="h-3.5 w-3.5"/>Edit</button>
                      <button onClick={() => confirmDelete(r)} className="inline-flex items-center gap-1 text-red-600 text-xs font-semibold ml-2"><Trash2 className="h-3.5 w-3.5"/>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
    </>
  );
}
