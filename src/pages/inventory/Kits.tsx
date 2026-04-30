import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill, fmtZAR } from "@/components/shared/Toolbar";

type K = { id: string; name: string; mfr: string; lot: string; tests: string; capacity: number; stock: number; expiry: string; branch: string };
const ROWS: K[] = [
  { id: "KIT-1101", name: "HIV ELISA", mfr: "Abbott",  lot: "AB-7741", tests: "HIV 1/2",          capacity: 96,  stock: 14, expiry: "08/2026", branch: "Booysens" },
  { id: "KIT-1102", name: "FBC Reagent Pack", mfr: "Sysmex", lot: "SM-9920", tests: "FBC",        capacity: 200, stock:  6, expiry: "06/2026", branch: "JHB HQ" },
  { id: "KIT-1103", name: "TSH/FT4 Panel",  mfr: "Roche", lot: "RC-4421", tests: "Thyroid",       capacity: 100, stock: 22, expiry: "11/2026", branch: "Durban" },
  { id: "KIT-1104", name: "Hep B Surface",  mfr: "Abbott",  lot: "AB-3308", tests: "HBsAg",        capacity: 96,  stock:  3, expiry: "07/2026", branch: "Lagos" },
  { id: "KIT-1105", name: "Glucose Strips", mfr: "Roche", lot: "RC-1010", tests: "Glucose",       capacity: 500, stock:120, expiry: "12/2026", branch: "Cape Town" },
  { id: "KIT-1106", name: "TB GeneXpert",   mfr: "Cepheid",lot: "CE-7710", tests: "MTB/RIF",       capacity: 50,  stock: 18, expiry: "09/2026", branch: "Polokwane" },
];
const cols: Column<K>[] = [
  { header: "Code", cell: r => r.id, mono: true },
  { header: "Kit",  cell: r => <span className="font-medium">{r.name}</span> },
  { header: "Manufacturer", cell: r => r.mfr },
  { header: "Lot",  cell: r => r.lot, mono: true },
  { header: "Tests / Cap.", cell: r => <span className="font-mono">{r.tests} · {r.capacity}</span> },
  { header: "Stock", cell: r => <Pill tone={r.stock<5?"danger":r.stock<15?"warning":"success"}>{r.stock}</Pill> },
  { header: "Expiry", cell: r => r.expiry, mono: true },
  { header: "Branch", cell: r => r.branch },
];
export default function Kits() {
  return <EntityList kicker="Section 12A · Inventory" title="Kit & Reagent Registry" breadcrumb={["Inventory","Kits"]}
    primaryLabel="Register Kit" rows={ROWS} columns={cols}
    kpis={[
      { label: "Active Kits", value: ROWS.length, accent: "navy" },
      { label: "Critical Stock", value: ROWS.filter(r=>r.stock<5).length, accent: "red" },
      { label: "Expiring (90d)", value: 2, accent: "warn" },
      { label: "Total Inventory Value", value: fmtZAR(842300), accent: "gold" },
    ]}
    getDrawer={r => ({
      title: r.name,
      subtitle: `${r.id} · Lot ${r.lot}`,
      meta: { Manufacturer: r.mfr, Tests: r.tests, Capacity: r.capacity, Stock: r.stock, Expiry: r.expiry, Branch: r.branch },
      body: <p className="text-muted-foreground">AI-predicted depletion: {Math.max(2, r.stock*2)} days. Auto-reorder triggers at min threshold.</p>,
      actions: [{ label: "Create Store Request", tone: "primary" }, { label: "Adjust Stock" }, { label: "View Consumption" }],
    })}
  />;
}
