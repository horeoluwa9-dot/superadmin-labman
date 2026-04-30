import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill, fmtZAR } from "@/components/shared/Toolbar";

type C = { id: string; name: string; cat: string; outstanding: number; due: string; terms: string; status: "Current"|"Overdue"|"Hold" };
const ROWS: C[] = [
  { id: "CR-101", name: "Roche Diagnostics SA",  cat: "Reagents",   outstanding: 184200, due: "15/05/2026", terms: "Net 30",  status: "Current" },
  { id: "CR-102", name: "Abbott Diagnostics",     cat: "Kits",       outstanding: 92400,  due: "02/05/2026", terms: "Net 30",  status: "Overdue" },
  { id: "CR-103", name: "Sysmex SA",              cat: "Analyzers",  outstanding: 312800, due: "20/05/2026", terms: "Net 60",  status: "Current" },
  { id: "CR-104", name: "Cepheid Africa",         cat: "Kits",       outstanding: 64200,  due: "10/05/2026", terms: "Net 30",  status: "Current" },
  { id: "CR-105", name: "Eskom",                  cat: "Utilities",  outstanding: 142000, due: "05/05/2026", terms: "Net 7",   status: "Overdue" },
  { id: "CR-106", name: "Telkom Business",        cat: "Telecom",    outstanding: 18400,  due: "12/05/2026", terms: "Net 30",  status: "Current" },
  { id: "CR-107", name: "Bidvest Facilities",     cat: "Facilities", outstanding: 44210,  due: "08/05/2026", terms: "Net 14",  status: "Hold" },
];
const cols: Column<C>[] = [
  { header: "Ref",  cell: r => r.id, mono: true },
  { header: "Creditor", cell: r => <span className="font-medium">{r.name}</span> },
  { header: "Category", cell: r => <span className="pill-info text-[10px]">{r.cat}</span> },
  { header: "Outstanding", cell: r => fmtZAR(r.outstanding) },
  { header: "Due", cell: r => r.due, mono: true },
  { header: "Terms", cell: r => r.terms },
  { header: "Status", cell: r => <Pill tone={r.status==="Current"?"success":r.status==="Overdue"?"danger":"warning"}>{r.status}</Pill> },
];
import { NEW_CREDITOR_FIELDS } from "@/lib/forms";
export default function Creditors() {
  return <EntityList kicker="Section 4C · Accounting" title="Creditors" breadcrumb={["Accounting","Creditors"]}
    primaryLabel="New Creditor" formFields={NEW_CREDITOR_FIELDS} formSize="lg" rows={ROWS} columns={cols}
    kpis={[
      { label: "Total Outstanding", value: fmtZAR(ROWS.reduce((s,r)=>s+r.outstanding,0)), accent: "red" },
      { label: "Overdue", value: ROWS.filter(r=>r.status==="Overdue").length, accent: "warn" },
      { label: "On Hold", value: ROWS.filter(r=>r.status==="Hold").length, accent: "navy" },
      { label: "Avg Terms", value: "Net 30", accent: "gold" },
    ]}
    getDrawer={r => ({
      title: r.name, subtitle: r.id,
      meta: { Category: r.cat, Outstanding: fmtZAR(r.outstanding), Due: r.due, Terms: r.terms, Status: r.status },
      actions: [{ label: "Schedule Payment", tone: "primary" }, { label: "Place on Hold", tone: "danger" }],
    })}
  />;
}
