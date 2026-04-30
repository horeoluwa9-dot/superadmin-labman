import { PageHeader, Panel, Pill, fmtZAR } from "@/components/shared/Toolbar";
import { KpiCard } from "@/components/shared/KpiCard";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, FunnelChart, Funnel, LabelList } from "recharts";

const branchRevenue = [
  { b: "Booysens", v: 184 }, { b: "Pretoria", v: 162 }, { b: "Durban", v: 141 },
  { b: "Cape Town", v: 128 }, { b: "JHB HQ", v: 114 }, { b: "Welkom", v: 82 },
];
const repPerf = [
  { r: "Carmen Angelica", v: 124 }, { r: "Ike Igbo", v: 108 }, { r: "Makoane N.", v: 91 },
  { r: "Patrick M.", v: 78 }, { r: "James K.", v: 64 },
];
const funnel = [
  { name: "New", value: 124, fill: "hsl(var(--muted-foreground))" },
  { name: "Contacted", value: 84, fill: "hsl(var(--info))" },
  { name: "Meeting", value: 51, fill: "#7c3aed" },
  { name: "Negotiation", value: 28, fill: "hsl(var(--warning))" },
  { name: "Converted", value: 17, fill: "hsl(var(--success))" },
];

export default function SalesDashboard() {
  return (
    <>
      <PageHeader kicker="Section 6A · Sales & Marketing" title="Sales Dashboard" breadcrumb={["Sales", "Dashboard"]}
        actions={
          <select className="text-xs border border-border rounded-md px-2 py-1.5 bg-white">
            <option>Monthly</option><option>Daily</option><option>Weekly</option><option>Last 7 days</option><option>Last 30 days</option><option>Last 12 months</option>
          </select>
        } />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <KpiCard label="Turnover MTD"        value={fmtZAR(8_412_000)} delta="+12%" deltaTone="up" accent="gold" />
        <KpiCard label="Commission MTD"      value={fmtZAR(412_500)}   delta="+8%"  deltaTone="up" accent="navy" />
        <KpiCard label="Requisitions MTD"    value="14,820"            delta="+5%"  deltaTone="up" accent="success" />
        <KpiCard label="Avg Req Value"       value={fmtZAR(567)}       delta="+3%"  deltaTone="up" accent="navy" />
        <KpiCard label="Active Clients"      value="1,284"             delta="+24"  deltaTone="up" accent="success" />
        <KpiCard label="New Clients"         value="42" sub="this month" accent="navy" />
        <KpiCard label="Outstanding Payments" value={fmtZAR(192_400)}  deltaTone="down" accent="warn" />
        <KpiCard label="Pipeline Value"      value={fmtZAR(2_840_000)} accent="gold" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <Panel title="Revenue by Branch (R'000)">
          <div className="h-64"><ResponsiveContainer><BarChart data={branchRevenue}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="b" fontSize={11} /><YAxis fontSize={11} /><Tooltip /><Bar dataKey="v" fill="hsl(var(--target-red))" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Top Reps by Turnover (R'000)">
          <div className="h-64"><ResponsiveContainer><BarChart data={repPerf} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis type="number" fontSize={11} /><YAxis type="category" dataKey="r" fontSize={11} width={100} /><Tooltip /><Bar dataKey="v" fill="hsl(var(--gold))" radius={[0,6,6,0]} /></BarChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Conversion Funnel">
          <div className="h-64"><ResponsiveContainer><FunnelChart><Tooltip /><Funnel dataKey="value" data={funnel} isAnimationActive><LabelList position="right" fill="#000" stroke="none" dataKey="name" /></Funnel></FunnelChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Sales Rep Performance">
          <div className="overflow-x-auto"><table className="data-table"><thead><tr><th>Rep</th><th>Branch</th><th>Mthly Turnover</th><th>Commission</th><th>Target%</th><th>Last Clock-in</th></tr></thead><tbody>
            {repPerf.map((r,i) => (
              <tr key={r.r}><td>{r.r}</td><td>Booysens</td><td className="font-mono text-xs">{fmtZAR(r.v*1000)}</td><td className="font-mono text-xs">{fmtZAR(r.v*50)}</td><td>{[112,98,87,76,64][i]}%</td><td className="text-xs font-mono">07:42 · GPS ✓</td></tr>
            ))}
          </tbody></table></div>
        </Panel>
      </div>
    </>
  );
}
