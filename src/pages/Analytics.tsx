import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { fmtZAR } from "@/lib/nav";

const turn = Array.from({ length: 12 }, (_, i) => ({ m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], v: 18 + Math.round(Math.sin(i/2)*4 + i*0.6) }));
const reps = [{ r: "Carmen A.", v: 124 }, { r: "Ike I.", v: 108 }, { r: "Makoane N.", v: 91 }, { r: "Patrick M.", v: 78 }];
const split = [{ name: "Medical Aid", v: 71, c: "hsl(var(--navy))" }, { name: "Cash", v: 29, c: "hsl(var(--gold))" }];

export default function Analytics() {
  return (
    <>
      <PageHeader kicker="Section 9 · Reports" title="Analytics & Reports" breadcrumb={["Analytics", "All Reports"]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="Total Turnover (R'M)">
          <div className="h-64"><ResponsiveContainer><LineChart data={turn}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="m" fontSize={11} /><YAxis fontSize={11} /><Tooltip formatter={(v:any)=>`R ${v}M`} /><Line dataKey="v" stroke="hsl(var(--target-red))" strokeWidth={3} dot /></LineChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Commission by Rep (R'000)">
          <div className="h-64"><ResponsiveContainer><BarChart data={reps}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="r" fontSize={11} /><YAxis fontSize={11} /><Tooltip /><Bar dataKey="v" fill="hsl(var(--gold))" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Medical Aid vs Cash">
          <div className="h-64"><ResponsiveContainer><PieChart><Pie data={split} dataKey="v" innerRadius={60} outerRadius={90} label>{split.map((s) => <Cell key={s.name} fill={s.c} />)}</Pie><Legend /><Tooltip /></PieChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Outstanding Payments (Aging)">
          <table className="data-table"><thead><tr><th>Bucket</th><th className="text-right">Amount</th></tr></thead><tbody>
            <tr><td>0–30</td><td className="text-right font-mono">{fmtZAR(412000)}</td></tr>
            <tr><td>31–60</td><td className="text-right font-mono">{fmtZAR(184000)}</td></tr>
            <tr><td>61–90</td><td className="text-right font-mono text-amber-700">{fmtZAR(72000)}</td></tr>
            <tr><td>90+</td><td className="text-right font-mono text-red-700 font-bold">{fmtZAR(48000)}</td></tr>
          </tbody></table>
        </Panel>
      </div>
    </>
  );
}
