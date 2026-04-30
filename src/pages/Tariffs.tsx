import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs, fmtZAR } from "@/components/shared/Toolbar";
import { RefreshCw } from "lucide-react";

const TABS = ["Cash Prices", "Schedule A", "Schedule B", "Schedule C"];

const data = [
  { code: "HBA1C",   name: "Glycated Haemoglobin", priceA: 245, priceB: 232, priceC: 218, cash: 280, eff: "01 Jan 2026", sync: "synced" },
  { code: "FBC",     name: "Full Blood Count",     priceA: 132, priceB: 125, priceC: 118, cash: 145, eff: "01 Jan 2026", sync: "synced" },
  { code: "HIV-RNA", name: "HIV PCR Viral Load",   priceA: 1280, priceB: 1195, priceC: 1110, cash: 1450, eff: "01 Jan 2026", sync: "pending" },
  { code: "PSA",     name: "Prostate-Specific Ag", priceA: 295, priceB: 278, priceC: 261, cash: 320, eff: "01 Jan 2026", sync: "synced" },
  { code: "TSH",     name: "Thyroid-Stim. Hormone",priceA: 188, priceB: 178, priceC: 168, cash: 210, eff: "01 Jan 2026", sync: "synced" },
];

export default function Tariffs() {
  const [tab, setTab] = useState(TABS[0]);
  const col = tab === "Cash Prices" ? "cash" : tab === "Schedule A" ? "priceA" : tab === "Schedule B" ? "priceB" : "priceC";
  return (
    <>
      <PageHeader
        kicker="Section 5H · Administration"
        title="Tariff Schedules"
        breadcrumb={["Administration", "Tariffs"]}
        actions={
          <button className="bg-navy text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />Sync with MedPrax
          </button>
        }
      />
      <Panel>
        <Tabs items={TABS} active={tab} onChange={setTab} />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Code</th><th>Test Name</th><th className="text-right">Price (ZAR)</th><th>Effective</th><th>MedPrax Sync</th></tr></thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.code}>
                  <td className="font-mono font-bold text-xs">{d.code}</td>
                  <td>{d.name}</td>
                  <td className="text-right font-mono font-semibold">{fmtZAR((d as any)[col])}</td>
                  <td className="text-xs font-mono">{d.eff}</td>
                  <td>{d.sync === "synced" ? <Pill tone="success">Synced · 02:14</Pill> : <Pill tone="warning">Pending sync</Pill>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
