import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";

const kits = [
  { name: "HIV PCR Kit",   lot: "L-2026-0214", per: 96, branch: "Pretoria", stock: 4,  min: 10, exp: "30/06/2026", depl: 4,  status: "Critical" },
  { name: "FBC Reagent A", lot: "L-2026-0188", per: 500,branch: "Booysens", stock: 12, min: 5,  exp: "12/09/2026", depl: 21, status: "OK" },
  { name: "HBA1C Cartridge", lot: "L-2025-1102", per: 120, branch: "Cape Town", stock: 8, min: 6, exp: "01/12/2026", depl: 12, status: "Low" },
  { name: "Glucose Strips", lot: "L-2026-0301", per: 200, branch: "Durban", stock: 0, min: 4, exp: "—", depl: 0, status: "OUT" },
];
const tone = (s: string) => s === "OK" ? "success" : s === "Low" ? "warning" : s === "Critical" ? "danger" : "danger";

export default function Inventory() {
  return (
    <>
      <PageHeader kicker="Section 13 · Inventory" title="Kits & Reagents" breadcrumb={["Inventory", "Kits"]}
        actions={<button className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg">Register New Kit</button>} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {["Booysens","Pretoria","Cape Town"].map((b, i) => (
          <Panel key={b} title={`${b} · Stock Level`}>
            <div className="text-2xl font-bold text-navy">{[78,42,91][i]}%</div>
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden"><div className={`h-full ${["bg-emerald-500","bg-amber-500","bg-emerald-500"][i]}`} style={{ width: `${[78,42,91][i]}%` }} /></div>
            <div className="text-xs text-muted-foreground mt-2">{[2,7,1][i]} items below threshold</div>
          </Panel>
        ))}
      </div>
      <Panel title="Kit Inventory">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Kit</th><th>Lot</th><th>Tests/Kit</th><th>Branch</th><th>Stock</th><th>Min</th><th>Expiry</th><th>Predicted Depletion</th><th>Status</th></tr></thead>
            <tbody>
              {kits.map((k) => (
                <tr key={k.lot+k.branch}>
                  <td className="font-medium">{k.name}</td>
                  <td className="font-mono text-xs">{k.lot}</td>
                  <td className="text-xs">{k.per}</td>
                  <td>{k.branch}</td>
                  <td className={`font-mono font-bold ${k.stock===0?"text-red-600":k.stock<k.min?"text-amber-600":""}`}>{k.stock}</td>
                  <td className="text-xs">{k.min}</td>
                  <td className="font-mono text-xs">{k.exp}</td>
                  <td className="text-xs">{k.depl ? `${k.depl} days` : "—"}</td>
                  <td><Pill tone={tone(k.status) as any}>{k.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
