import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill, fmtZAR } from "@/components/shared/Toolbar";

type W = { id: string; date: string; item: string; qty: number; reason: "Expired"|"Spilled"|"Contaminated"|"Damaged"; branch: string; staff: string; cost: number };
const ROWS: W[] = [
  { id: "WS-901", date: "29/04/2026", item: "Hep B Surface Kit", qty: 1, reason: "Expired",      branch: "Lagos",   staff: "R. Mensah", cost: 1840 },
  { id: "WS-902", date: "28/04/2026", item: "FBC Reagent",       qty: 1, reason: "Spilled",      branch: "JHB HQ",  staff: "B. Nkosi",  cost:  920 },
  { id: "WS-903", date: "26/04/2026", item: "Glucose Strips",    qty: 18,reason: "Damaged",      branch: "Cape Town",staff: "L. vdM",    cost:  640 },
  { id: "WS-904", date: "25/04/2026", item: "HIV ELISA",         qty: 1, reason: "Contaminated", branch: "Booysens",staff: "Sister A.", cost: 1840 },
];
const cols: Column<W>[] = [
  { header: "Ref", cell: r => r.id, mono: true },
  { header: "Date", cell: r => r.date, mono: true },
  { header: "Item", cell: r => <span className="font-medium">{r.item}</span> },
  { header: "Qty",  cell: r => <span className="font-mono">{r.qty}</span> },
  { header: "Reason", cell: r => <Pill tone={r.reason==="Expired"?"warning":"danger"}>{r.reason}</Pill> },
  { header: "Branch", cell: r => r.branch },
  { header: "Staff",  cell: r => r.staff },
  { header: "Cost",   cell: r => fmtZAR(r.cost) },
];
export default function Wastage() {
  return <EntityList kicker="Section 12C · Inventory" title="Wastage Log" breadcrumb={["Inventory","Wastage"]}
    primaryLabel="Log Wastage" rows={ROWS} columns={cols}
    kpis={[
      { label: "Wastage MTD", value: fmtZAR(ROWS.reduce((s,r)=>s+r.cost,0)), accent: "red" },
      { label: "Events", value: ROWS.length, accent: "warn" },
      { label: "Top Reason", value: "Expired", accent: "navy" },
      { label: "Anomaly Flag", value: "Lagos", accent: "warn", sub: "2σ above mean" },
    ]}
    getDrawer={r => ({
      title: `${r.item} — ${r.reason}`,
      meta: { Date: r.date, Qty: r.qty, Cost: fmtZAR(r.cost), Branch: r.branch, Staff: r.staff },
      actions: [{ label: "Approve Write-off", tone: "primary" }, { label: "Investigate", tone: "danger" }],
    })}
  />;
}
