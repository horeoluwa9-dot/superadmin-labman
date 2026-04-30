import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill } from "@/components/shared/Toolbar";
import { useActionDialog, useFormDialog } from "@/components/shared/FormDialog";
import { Edit, Trash2 } from "lucide-react";
import { NEW_COMPANY_FIELDS } from "@/lib/forms";

type Co = { id: string; name: string; tel: string; fax: string; contact: string; reg: string; vat: string; type: string; branches: number; active: boolean };
const ROWS: Co[] = [
  { id: "C-001", name: "Target Pathology Laboratories", tel: "011-493-1116",                fax: "011-493-1118", contact: "Patrick",  reg: "2008/045123/07", vat: "4760123890", type: "Holding", branches: 29, active: true },
  { id: "C-002", name: "DR. Moyo and Partners",         tel: "263 8644117157, 263 777020549", fax: "—",            contact: "Kimberly", reg: "ZW-441/2019",     vat: "—",          type: "International", branches: 1, active: true },
  { id: "C-003", name: "Geroge Zozi",                    tel: ",",                            fax: "—",            contact: "—",        reg: "—",                vat: "—",          type: "Subsidiary", branches: 1, active: true },
  { id: "C-004", name: "Target lab Nigeria",             tel: "011-493-1116",                fax: "011-493-1118", contact: "Patrick",  reg: "RC-892341",        vat: "—",          type: "International", branches: 1, active: true },
  { id: "C-005", name: "Target Pathology Lesotho",       tel: "+266-2231-7700",              fax: "—",            contact: "Lerato",  reg: "LS-2022/118",      vat: "—",          type: "International", branches: 1, active: true },
  { id: "C-006", name: "Healthlink Diagnostics",         tel: "011-880-4421",                fax: "011-880-4499", contact: "Jaco",    reg: "2014/771239/07",   vat: "4810445621", type: "Subsidiary", branches: 1, active: true },
];

function CompaniesInner() {
  const action = useActionDialog();
  const form = useFormDialog();
  const cols: Column<Co>[] = [
    { header: "Name",          cell: r => <span className="font-medium">{r.name}</span> },
    { header: "Telephone",     cell: r => <span className="text-xs">{r.tel}</span> },
    { header: "Fax number",    cell: r => <span className="text-xs">{r.fax}</span> },
    { header: "Contact person",cell: r => <span className="text-xs">{r.contact}</span> },
    { header: "Type",          cell: r => <span className="pill-info text-[10px]">{r.type}</span> },
    { header: "Branches",      cell: r => <span className="font-mono">{r.branches}</span> },
    { header: "Status",        cell: r => <Pill tone={r.active?"success":"muted"}>{r.active?"Active":"Inactive"}</Pill> },
    { header: "",              cell: r => (
      <div className="flex items-center gap-2" onClick={e=>e.stopPropagation()}>
        <button onClick={() => form.open({ title: `Edit ${r.name}`, size: "lg", submitLabel: "Save Changes", fields: NEW_COMPANY_FIELDS.map(f => ({ ...f, defaultValue: f.name==="name"?r.name : f.name==="regNo"?r.reg : f.name==="vatNo"?r.vat : f.defaultValue })) })} className="text-blue-600 inline-flex items-center gap-1 text-xs font-semibold"><Edit className="h-3 w-3"/>Edit</button>
        <button onClick={() => action.open({ title: `Delete ${r.name}?`, subtitle: "This will archive the company. Branches and history are retained.", tone: "reject", requireReason: true, reasonLabel: "Justification (audited)", confirmLabel: "Delete Company" })} className="text-red-600 inline-flex items-center gap-1 text-xs font-semibold"><Trash2 className="h-3 w-3"/>Delete</button>
      </div>
    ) },
  ];

  return <EntityList kicker="Section 5A · Administration" title="Companies" breadcrumb={["Administration","Companies"]}
    primaryLabel="New Company" formFields={NEW_COMPANY_FIELDS} formSize="lg"
    rows={ROWS} columns={cols}
    kpis={[
      { label: "Companies", value: ROWS.length, accent: "navy" },
      { label: "Branches Total", value: ROWS.reduce((s,r)=>s+r.branches,0), accent: "gold" },
      { label: "Countries", value: 4, accent: "success" },
      { label: "VAT-registered", value: ROWS.filter(r=>r.vat!=="—").length, accent: "red" },
    ]}
    getDrawer={r => ({
      title: r.name,
      subtitle: `${r.id} · ${r.type}`,
      meta: { "Telephone": r.tel, "Fax": r.fax, "Contact": r.contact, "Reg #": r.reg, "VAT #": r.vat, Branches: r.branches, Status: r.active?"Active":"Inactive" },
      actions: [{ label: "Edit Company", tone: "primary" }, { label: "View Branches" }, { label: "Audit Trail" }],
    })}
  />;
}
export default function Companies() { return <CompaniesInner />; }
