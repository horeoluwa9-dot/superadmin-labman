import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill, fmtZAR } from "@/components/shared/Toolbar";

type Co = { id: string; name: string; reg: string; vat: string; type: string; branches: number; active: boolean };
const ROWS: Co[] = [
  { id: "C-001", name: "Target Pathology Laboratory (Pty) Ltd", reg: "2008/045123/07", vat: "4760123890", type: "Holding", branches: 29, active: true },
  { id: "C-002", name: "Target Pathology Lagos Ltd", reg: "RC-892341", vat: "—", type: "International", branches: 1, active: true },
  { id: "C-003", name: "Target Pathology Zimbabwe (Pvt)", reg: "ZW-441/2019", vat: "—", type: "International", branches: 1, active: true },
  { id: "C-004", name: "Target Pathology Lesotho", reg: "LS-2022/118", vat: "—", type: "International", branches: 1, active: true },
  { id: "C-005", name: "Healthlink Diagnostics", reg: "2014/771239/07", vat: "4810445621", type: "Subsidiary", branches: 1, active: true },
];
const cols: Column<Co>[] = [
  { header: "Name",       cell: r => <span className="font-medium">{r.name}</span> },
  { header: "Reg #",      cell: r => r.reg, mono: true },
  { header: "VAT #",      cell: r => r.vat, mono: true },
  { header: "Type",       cell: r => <span className="pill-info text-[10px]">{r.type}</span> },
  { header: "Branches",   cell: r => <span className="font-mono">{r.branches}</span> },
  { header: "Status",     cell: r => <Pill tone={r.active?"success":"muted"}>{r.active?"Active":"Inactive"}</Pill> },
];
import { NEW_COMPANY_FIELDS } from "@/lib/forms";
export default function Companies() {
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
      meta: { "Reg #": r.reg, "VAT #": r.vat, Branches: r.branches, Status: r.active?"Active":"Inactive" },
      actions: [{ label: "Edit Company", tone: "primary" }, { label: "View Branches" }, { label: "Audit Trail" }],
    })}
  />;
}
