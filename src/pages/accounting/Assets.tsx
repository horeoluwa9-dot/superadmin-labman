import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs, fmtZAR } from "@/components/shared/Toolbar";

const TABS = ["Computer & IT", "Office Assets", "Lab Equipment", "Vehicles", "Medical Devices"];

const assets = {
  "Lab Equipment": [
    { id: "AS-LAB-0042", name: "Cobas 6000 Analyzer", branch: "Booysens", assigned: "Lab Manager", purchase: "12 Mar 2022", cost: 1480000, value: 1024000, condition: "Good", warranty: "12 Mar 2027", serial: "CBS6K-77882", maintenance: "01 Jun 2026" },
    { id: "AS-LAB-0043", name: "Sysmex XN-1000",      branch: "Pretoria", assigned: "Lab Tech 04",  purchase: "08 Aug 2021", cost: 920000,  value: 612000, condition: "Good", warranty: "08 Aug 2026", serial: "SYS-XN-44102", maintenance: "15 May 2026" },
  ],
  "Vehicles": [
    { id: "AS-VEH-0014", name: "Toyota Hilux 2.4 GD", branch: "Booysens", assigned: "Driver J. Pieters", purchase: "04 Apr 2023", cost: 624000, value: 488000, condition: "Excellent", warranty: "—", serial: "CK 09 BH GP · Lic exp 30/06/2026", maintenance: "20 Jul 2026" },
  ],
  "Computer & IT": [], "Office Assets": [], "Medical Devices": [],
};

export default function Assets() {
  const [tab, setTab] = useState<keyof typeof assets>("Lab Equipment");
  const rows = assets[tab];
  return (
    <>
      <PageHeader
        kicker="Section 4E · Accounting"
        title="Asset Management"
        breadcrumb={["Accounting", "Assets"]}
        actions={<button className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg">Register New Asset</button>}
      />
      <Panel>
        <Tabs items={TABS as any} active={tab} onChange={(t) => setTab(t as any)} />
        {rows.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">No assets in this category yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Asset ID</th><th>Name</th><th>Branch</th><th>Assigned</th>
                  <th>Purchase</th><th className="text-right">Cost</th><th className="text-right">Value</th>
                  <th>Condition</th><th>Warranty</th><th>Serial / Reg</th><th>Maintenance Due</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => (
                  <tr key={a.id}>
                    <td className="font-mono text-xs">{a.id}</td>
                    <td className="font-medium">{a.name}</td>
                    <td>{a.branch}</td><td className="text-xs">{a.assigned}</td>
                    <td className="text-xs font-mono">{a.purchase}</td>
                    <td className="text-right font-mono text-xs">{fmtZAR(a.cost)}</td>
                    <td className="text-right font-mono text-xs font-semibold">{fmtZAR(a.value)}</td>
                    <td><Pill tone={a.condition === "Excellent" ? "success" : "info"}>{a.condition}</Pill></td>
                    <td className="text-xs font-mono">{a.warranty}</td>
                    <td className="text-xs font-mono">{a.serial}</td>
                    <td className="text-xs font-mono">{a.maintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
}
