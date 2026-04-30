import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill } from "@/components/shared/Toolbar";

type R = { id: string; item: string; branch: string; days: number; cause: string; risk: "High"|"Medium"|"Low" };
const ROWS: R[] = [
  { id: "RK-001", item: "HIV ELISA Kit",  branch: "Booysens", days: 3, cause: "Spike in demand · TB program", risk: "High" },
  { id: "RK-002", item: "FBC Reagent",    branch: "JHB HQ",   days: 5, cause: "Supplier delay · Sysmex SA",   risk: "High" },
  { id: "RK-003", item: "Hep B Surface",  branch: "Lagos",    days: 4, cause: "Customs hold",                 risk: "High" },
  { id: "RK-004", item: "TSH/FT4 Panel",  branch: "Durban",   days: 12,cause: "Normal consumption",           risk: "Medium" },
  { id: "RK-005", item: "Glucose Strips", branch: "Cape Town",days: 30,cause: "Healthy stock",                risk: "Low" },
];
const cols: Column<R>[] = [
  { header: "Ref",   cell: r => r.id, mono: true },
  { header: "Item",  cell: r => <span className="font-medium">{r.item}</span> },
  { header: "Branch",cell: r => r.branch },
  { header: "Days to Depletion", cell: r => <span className="font-mono">{r.days}d</span> },
  { header: "Cause", cell: r => r.cause },
  { header: "Risk",  cell: r => <Pill tone={r.risk==="High"?"danger":r.risk==="Medium"?"warning":"success"}>{r.risk}</Pill> },
];
export default function SupplyRisk() {
  return <EntityList kicker="Section 12D · Inventory" title="Supply Risk Dashboard" breadcrumb={["Inventory","Supply Risk"]}
    primaryLabel="Mitigation Plan" rows={ROWS} columns={cols}
    intro="AI-driven depletion forecast across all branches and SKUs. High risk items auto-trigger emergency reorder approval queue."
    getDrawer={r => ({
      title: `${r.item} — ${r.branch}`,
      meta: { "Days to Depletion": r.days+"d", Cause: r.cause, Risk: r.risk },
      actions: [{ label: "Trigger Emergency Order", tone: "primary" }, { label: "Notify Supplier" }],
    })}
  />;
}
