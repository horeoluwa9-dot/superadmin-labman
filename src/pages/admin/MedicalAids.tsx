import { useState, useMemo } from "react";
import { PageHeader, Panel, Pill, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { KpiCard } from "@/components/shared/KpiCard";
import { Search, Edit, Plus } from "lucide-react";
import { fmtZAR } from "@/components/shared/Toolbar";
import { toast } from "sonner";

type MA = { id: string; name: string; code: string; admin: string; medCode: string; medName: string; blocked: boolean; lives: number; outstanding: number; rejectRate: number; tariff: string };
const ROWS_INIT: MA[] = [
  { id: "MA-001", name: "AFROX MEDICAL AID SOCIETY",         code: "AFROX",    admin: "METROPOLITAN HEALTH", medCode: "",    medName: "",                       blocked: false, lives: 12000,   outstanding:  84200, rejectRate: 5.2, tariff: "MedPrax 2026" },
  { id: "MA-002", name: "ENGEN MEDICAL BENEFIT FUND",        code: "ENGEN",    admin: "DISCOVERY HEALTH",     medCode: "",    medName: "",                       blocked: false, lives:  8200,   outstanding:  41800, rejectRate: 4.1, tariff: "MedPrax 2026" },
  { id: "MA-003", name: "HIGHCARE HOSPITAL PLAN (ALLIANCE)", code: "HIGHCARE", admin: "MEDSCHEME",            medCode: "",    medName: "",                       blocked: false, lives:  4100,   outstanding:  22300, rejectRate: 6.7, tariff: "MedPrax 2026" },
  { id: "MA-004", name: "PLATMED (ALLIANCE)",                code: "PLATMED",  admin: "PLATINUM HEALTH",     medCode: "",    medName: "",                       blocked: false, lives:  3300,   outstanding:  18100, rejectRate: 3.8, tariff: "MedPrax 2026" },
  { id: "MA-005", name: "ARGUS MEDICAL AID SOCIETY",         code: "ARGUS",    admin: "MEDSCHEME",            medCode: "",    medName: "",                       blocked: false, lives:  2900,   outstanding:  15800, rejectRate: 5.0, tariff: "MedPrax 2026" },
  { id: "MA-006", name: "BMW EMPLOYEES MEDICAL AID SOCIETY", code: "BMW",      admin: "DISCOVERY HEALTH",     medCode: "",    medName: "",                       blocked: false, lives:  6700,   outstanding:  31200, rejectRate: 3.2, tariff: "MedPrax 2026" },
  { id: "MA-007", name: "BONITAS MEDICAL FUND",              code: "BONITAS",  admin: "MEDSCHEME",            medCode: "BON", medName: "BONITAS MEDICAL FUND",   blocked: false, lives: 720000,  outstanding: 642100, rejectRate: 6.8, tariff: "MedPrax 2026" },
  { id: "MA-008", name: "CAPE MEDICAL PLAN",                 code: "CAPE MED", admin: "CAPE MEDICAL PLAN",    medCode: "",    medName: "",                       blocked: false, lives: 18000,   outstanding:  88400, rejectRate: 4.4, tariff: "MedPrax 2026" },
  { id: "MA-009", name: "CNA GALLO",                          code: "CNA",      admin: "MEDSCHEME",            medCode: "",    medName: "",                       blocked: true,  lives:  1200,   outstanding:  72800, rejectRate: 11.3, tariff: "MedPrax 2026" },
  { id: "MA-010", name: "DA GAMA MEDICAL SCHEME",            code: "DA GAMA",  admin: "METROPOLITAN HEALTH", medCode: "",    medName: "",                       blocked: false, lives:  3400,   outstanding:  19100, rejectRate: 4.9, tariff: "MedPrax 2026" },
];

export const NEW_MA_FIELDS_FULL = [
  { name: "code",       label: "Code", required: true, group: "Identity" },
  { name: "name",       label: "Full name", required: true, group: "Identity" },
  { name: "admin",      label: "Administrator", type: "select" as const, options: ["METROPOLITAN HEALTH","MEDSCHEME","DISCOVERY HEALTH","PLATINUM HEALTH","CAPE MEDICAL PLAN","BONITAS","GEMS"], group: "Identity" },
  { name: "medName",    label: "Medscheme Name", group: "Identity" },
  { name: "medCode",    label: "Medscheme Code", group: "Identity" },
  { name: "website",    label: "Website", group: "Contact" },
  { name: "email",      label: "Email", type: "email" as const, group: "Contact" },
  { name: "postal",     label: "Postal address", type: "textarea" as const, group: "Contact" },
  { name: "address",    label: "Address", type: "textarea" as const, group: "Contact" },
  { name: "cellphone",  label: "Cellphone", type: "tel" as const, group: "Contact" },
  { name: "telephone",  label: "Telephone", type: "tel" as const, group: "Contact" },
  { name: "fax",        label: "Fax number", group: "Contact" },
  { name: "blocked",    label: "Blocked", type: "checkbox" as const, group: "EDI" },
  { name: "ediActive",  label: "EDI Active", type: "checkbox" as const, group: "EDI" },
  { name: "ediCode",    label: "EDI Code", group: "EDI" },
  { name: "contact",    label: "Contact", group: "Billing" },
  { name: "creditType", label: "Credit type", type: "select" as const, options: ["CASH","ACCOUNT","COD","30 DAYS","60 DAYS"], defaultValue: "CASH", required: true, group: "Billing" },
  { name: "rateType",   label: "Rate type", defaultValue: "PATH", required: true, group: "Billing" },
  { name: "unitRate",   label: "Unit rate", type: "number" as const, defaultValue: "13.5", required: true, group: "Billing" },
  { name: "invMA",      label: "Invoice medical aid", type: "checkbox" as const, group: "Invoicing" },
  { name: "invPat",     label: "Invoice patient",     type: "checkbox" as const, group: "Invoicing" },
  { name: "invType",    label: "Invoice type", group: "Invoicing" },
  { name: "route",      label: "Route", group: "Invoicing" },
  { name: "display",    label: "Display", type: "checkbox" as const, group: "Display" },
  { name: "message",    label: "Message", group: "Display" },
  { name: "medFormat",  label: "Med format", type: "textarea" as const, span: 2 as const, required: true, group: "Format" },
  { name: "managed",    label: "Managed",      type: "checkbox" as const, group: "Compliance" },
  { name: "language",   label: "Language", defaultValue: "ENGLISH", required: true, group: "Compliance" },
  { name: "checked",    label: "Checked",      type: "checkbox" as const, group: "Compliance" },
  { name: "confirmFunds", label: "Confirm funds", type: "checkbox" as const, group: "Compliance" },
  { name: "perc",       label: "Perc", type: "number" as const, defaultValue: "0", required: true, group: "Misc" },
  { name: "pk",         label: "PK", required: true, group: "Misc" },
];

export default function MedicalAids() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const [rows, setRows] = useState(ROWS_INIT);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => rows.filter(r => !search || `${r.name} ${r.code} ${r.admin}`.toLowerCase().includes(search.toLowerCase())), [rows, search]);

  const toggleBlock = (id: string) => setRows(rs => rs.map(r => r.id === id ? { ...r, blocked: !r.blocked } : r));

  const openEdit = (r: MA) => form.open({
    title: `Edit ${r.name}`, size: "xl", submitLabel: "Save Changes",
    fields: NEW_MA_FIELDS_FULL.map(f => ({ ...f, defaultValue: (r as any)[f.name] ?? f.defaultValue ?? "" })),
  });

  return (
    <>
      <PageHeader kicker="Section 5D · Administration" title="Medical Aids" breadcrumb={["Administration","Medical Aids"]}
        actions={<button onClick={() => form.open({ title: "Create Medical Aid", size: "xl", submitLabel: "Create", fields: NEW_MA_FIELDS_FULL })} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" />New Medical Aid</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Schemes" value={`${rows.length} (1,046 total)`} accent="navy" />
        <KpiCard label="Lives Covered" value={`${(rows.reduce((s,r)=>s+r.lives,0)/1e6).toFixed(2)}M+`} accent="gold" />
        <KpiCard label="Outstanding" value={fmtZAR(rows.reduce((s,r)=>s+r.outstanding,0))} accent="red" />
        <KpiCard label="Blocked" value={rows.filter(r=>r.blocked).length} accent="warn" />
      </div>

      <Panel>
        <div className="flex items-center justify-between mb-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medical aids…" className="pl-8 pr-3 py-1.5 text-sm border border-border rounded bg-white w-72" />
          </div>
          <span className="text-xs text-muted-foreground">Showing 1 to {filtered.length} of 1,046 results</span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Full name</th><th>Code</th><th>Blocked</th><th>Administrator</th><th>Medscheme Code</th><th>Medscheme Name</th><th>Outstanding</th><th></th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                  title: r.name, subtitle: `${r.code} · ${r.admin}`,
                  meta: { Code: r.code, Administrator: r.admin, Lives: r.lives.toLocaleString(), Outstanding: fmtZAR(r.outstanding), "Reject Rate": r.rejectRate+"%", Tariff: r.tariff, Status: r.blocked?"Blocked":"Active" },
                  body: <p className="text-xs text-muted-foreground">Tariff sync via MedPrax. Last sync today 06:00. Variances over 8% trigger Super Admin approval.</p>,
                  actions: [{ label: "Edit", tone: "primary", onClick: () => openEdit(r) }, { label: "Sync Tariffs Now" }, { label: "View Claims" }, { label: "Reconciliation Report" }, { label: r.blocked?"Unblock":"Block", tone: "danger", onClick: () => toggleBlock(r.id) }],
                })}>
                  <td className="font-medium">{r.name}</td>
                  <td className="font-mono text-xs">{r.code}</td>
                  <td onClick={(e) => { e.stopPropagation(); toggleBlock(r.id); }}>
                    <button role="switch" aria-checked={r.blocked} className={`relative w-9 h-5 rounded-full transition-colors ${r.blocked ? "bg-red-500" : "bg-muted-foreground/30"}`}>
                      <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${r.blocked ? "translate-x-4" : ""}`} />
                    </button>
                  </td>
                  <td className="text-xs">{r.admin}</td>
                  <td><input defaultValue={r.medCode} className="border border-border rounded px-2 py-1 text-xs w-28 bg-white" onClick={e => e.stopPropagation()} /></td>
                  <td><input defaultValue={r.medName} className="border border-border rounded px-2 py-1 text-xs w-44 bg-white" onClick={e => e.stopPropagation()} /></td>
                  <td className="text-right font-mono text-xs">{fmtZAR(r.outstanding)}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <button onClick={() => openEdit(r)} className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold"><Edit className="h-3.5 w-3.5"/>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={1046} />
        </div>
      </Panel>
    </>
  );
}
