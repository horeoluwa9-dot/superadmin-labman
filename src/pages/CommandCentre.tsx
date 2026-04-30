import { Panel } from "@/components/shared/Panel";
import { KpiCard } from "@/components/shared/KpiCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { Pill } from "@/components/shared/Pill";
import { fmtZAR } from "@/lib/nav";
import {
  AlertTriangle, FlaskConical, Activity, Server, Lock,
  TestTube, Clock, Repeat, Hand, DollarSign, ListChecks, PieChart as PieIcon, BadgeDollarSign,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, PieChart, Pie, Cell,
} from "recharts";

const alerts = [
  { tone: "danger" as const, title: "Unreleased critical patient result", owner: "Dr. M. Phakathi", sla: "12m", branch: "Booysens" },
  { tone: "danger" as const, title: "Cobas 6000 — repeated invalids (HIV)", owner: "Lab Manager", sla: "27m", branch: "Pretoria" },
  { tone: "warning" as const, title: "High-value test awaiting financial approval (R 18,420)", owner: "K. Mokoena", sla: "1h 04m", branch: "Cape Town" },
  { tone: "warning" as const, title: "Suspicious manual result entry (HBA1C × 7)", owner: "Welkom Lab", sla: "2h 11m", branch: "Welkom" },
  { tone: "warning" as const, title: "HIV kit depletion risk — 4 days at current rate", owner: "Inventory", sla: "—", branch: "Pretoria" },
  { tone: "danger" as const, title: "Access violation — login from new IP (Lagos)", owner: "F. Ike", sla: "8m", branch: "Lagos" },
];

const erp  = [{l:"Finance",s:"live"},{l:"HR",s:"live"},{l:"Inventory",s:"degraded"},{l:"Sales",s:"live"}];
const lims = [{l:"Pre-Lab",s:"live"},{l:"Lab",s:"live"},{l:"Post-Lab",s:"degraded"},{l:"QA",s:"live"}];
const lis  = [{l:"Cobas 6000 · Booysens",s:"live"},{l:"Sysmex XN-1000 · Pretoria",s:"degraded"},{l:"BD Phoenix · Durban",s:"live"},{l:"Architect i2000 · Cape Town",s:"live"},{l:"COBAS 4800 · JHB HQ",s:"offline"}];
const apis = [{l:"MedPrax",s:"live"},{l:"Elixir",s:"live"},{l:"Medical Aid",s:"degraded"},{l:"NDIC Result Feeds",s:"live"}];

const dot = (s: string) =>
  s === "live" ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,.6)]" :
  s === "degraded" ? "bg-amber-500" : "bg-red-500 animate-pulse";

const trendData = Array.from({ length: 14 }, (_, i) => ({ d: i + 1, v: 1100 + Math.round(Math.sin(i / 1.5) * 220 + i * 35) }));
const branchVol = [
  { b: "Booysens", v: 312 }, { b: "Pretoria", v: 287 }, { b: "Durban", v: 254 },
  { b: "Cape Town", v: 218 }, { b: "JHB HQ", v: 196 }, { b: "Welkom", v: 142 },
];
const cashMA = [{ name: "Medical Aid", v: 71 }, { name: "Cash", v: 29 }];

const patients = [
  { ln: "TPL-2026-04-30-0142", id: "9201155012083", first: "Thandiwe", sur: "Mokoena", dr: "DR-204", aid: "Discovery KeyCare", aidNo: "5500-2210", tests: "FBC, U&E, HBA1C", bill: "Medical Aid", t: "07:42", b: "Booysens" },
  { ln: "TPL-2026-04-30-0143", id: "8807085048089", first: "Sibusiso", sur: "Khumalo", dr: "DR-088", aid: "Cash", aidNo: "—", tests: "HIV PCR", bill: "Cash", t: "07:51", b: "Pretoria" },
  { ln: "TPL-2026-04-30-0144", id: "9504220789083", first: "Naledi", sur: "Dlamini", dr: "DR-117", aid: "Bonitas", aidNo: "8821-001", tests: "TSH, Free T4", bill: "Medical Aid", t: "08:03", b: "Cape Town" },
  { ln: "TPL-2026-04-30-0145", id: "7711100456082", first: "Pieter", sur: "van der Merwe", dr: "DR-204", aid: "Momentum", aidNo: "M-77100", tests: "PSA, Lipogram", bill: "Medical Aid", t: "08:12", b: "Booysens" },
  { ln: "TPL-2026-04-30-0146", id: "9912140234086", first: "Ayanda", sur: "Nkosi", dr: "DR-301", aid: "Cash", aidNo: "—", tests: "Pregnancy hCG", bill: "Cash", t: "08:18", b: "Durban" },
  { ln: "TPL-2026-04-30-0147", id: "8303155123085", first: "Lerato", sur: "Mahlangu", dr: "DR-088", aid: "GEMS", aidNo: "G-83031", tests: "CD4, Viral Load", bill: "Medical Aid", t: "08:25", b: "Pretoria" },
];

export default function CommandCentre() {
  return (
    <>
      <PageHeader
        kicker="Director / CEO View · Level 5"
        title="Command Centre"
        breadcrumb={["Home", "Command Centre"]}
        actions={
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>Live · auto-refresh every 5 min</span>
          </div>
        }
      />

      {/* Panel A — Critical Alerts (pinned) */}
      <Panel
        className="mb-5"
        title="Critical Alerts"
        subtitle="Pinned to top — cannot be scrolled away"
        actions={<Pill tone="danger" pulse>6 active</Pill>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {alerts.map((a, i) => (
            <div key={i} className={`relative rounded-lg border p-3.5 flex items-start gap-3 ${
              a.tone === "danger" ? "bg-red-50/60 border-red-200" : "bg-amber-50/60 border-amber-200"
            }`}>
              <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${a.tone === "danger" ? "bg-red-500 animate-pulse" : "bg-amber-500"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-navy">{a.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {a.owner} · <span className="font-mono">{a.branch}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-foreground/70">SLA {a.sla}</span>
                  <button className="text-[11px] font-semibold text-target hover:text-target-dark">Resolve →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Panel B — System Health Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <SystemColumn icon={<Server className="h-4 w-4" />} title="ERP" rows={erp} />
        <SystemColumn icon={<FlaskConical className="h-4 w-4" />} title="LIMS" rows={lims} />
        <SystemColumn icon={<Activity className="h-4 w-4" />} title="LIS" rows={lis} />
      </div>
      <Panel className="mb-5" title="External APIs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {apis.map((a) => (
            <button key={a.l} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 hover:bg-muted text-left">
              <span className={`h-2 w-2 rounded-full ${dot(a.s)}`} />
              <span className="text-sm font-medium">{a.l}</span>
            </button>
          ))}
        </div>
      </Panel>

      {/* Panel C — KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <KpiCard label="Tests Processed Today" value="1,847" delta="+12.4% vs yesterday" deltaTone="up" icon={<TestTube className="h-4 w-4" />} accent="navy" />
        <KpiCard label="Avg Turnaround Time"   value="4h 12m" delta="−18m vs target" deltaTone="up" icon={<Clock className="h-4 w-4" />} accent="success" />
        <KpiCard label="Re-run Frequency"      value="6.8%"   delta="+0.3pp" deltaTone="down" icon={<Repeat className="h-4 w-4" />} accent="warn" />
        <KpiCard label="Manual Entry Ratio"    value="11.4%"  sub="under 15% threshold" icon={<Hand className="h-4 w-4" />} accent="success" />
        <KpiCard label="Revenue Today"         value={fmtZAR(742_310)} delta="+8.1% vs avg" deltaTone="up" icon={<DollarSign className="h-4 w-4" />} accent="gold" />
        <KpiCard label="Outstanding Approvals" value="7" sub="View All →" icon={<ListChecks className="h-4 w-4" />} accent="red" />
        <KpiCard label="Claim Success Rate"    value="94.2%"  delta="+1.1pp" deltaTone="up" icon={<BadgeDollarSign className="h-4 w-4" />} accent="success" />
        <KpiCard label="Cash vs Medical Aid"   value="29 / 71" sub="Medical Aid majority" icon={<PieIcon className="h-4 w-4" />} accent="navy" />
      </div>

      {/* Mini charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <Panel title="Revenue — Last 14 Days" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => `R${v}k`} />
                <Tooltip formatter={(v: any) => `R ${(v * 1000).toLocaleString("en-ZA")}`} />
                <Line type="monotone" dataKey="v" stroke="hsl(var(--target-red))" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Cash vs Medical Aid">
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={cashMA} dataKey="v" innerRadius={50} outerRadius={75} paddingAngle={3}>
                  <Cell fill="hsl(var(--navy))" />
                  <Cell fill="hsl(var(--gold))" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs -mt-4">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-navy" />Medical Aid 71%</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-gold" />Cash 29%</span>
          </div>
        </Panel>
      </div>

      {/* Panel D — Show Patience for One Day */}
      <Panel
        title="Show Patience for One Day"
        subtitle="Real-time daily patient table · resets at midnight · Level 5 only"
        actions={
          <div className="flex items-center gap-2">
            <span className="pill-gold">👑 Level 5</span>
            <Pill tone="success" pulse>Live</Pill>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3 mb-4 text-xs">
          <select className="border border-border rounded-md px-2 py-1 bg-white">
            <option>All branches (29)</option>
          </select>
          <input type="date" defaultValue="2026-04-30" readOnly className="border border-border rounded-md px-2 py-1 bg-muted/40 font-mono" />
          <span className="ml-auto text-muted-foreground">AI EOD prediction: <span className="font-bold text-navy">≈ 2,640 patients</span></span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lab Number</th><th>ID Number</th><th>First Name</th><th>Surname</th>
                <th>Doctor Code</th><th>Medical Aid</th><th>Aid Number</th>
                <th>Tests Ordered</th><th>Billing</th><th>Capture Time</th><th>Branch</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.ln}>
                  <td className="font-mono text-xs">{p.ln}</td>
                  <td className="font-mono text-xs">{p.id}</td>
                  <td>{p.first}</td><td className="font-medium">{p.sur}</td>
                  <td className="font-mono text-xs">{p.dr}</td>
                  <td>{p.aid}</td><td className="font-mono text-xs">{p.aidNo}</td>
                  <td className="text-xs">{p.tests}</td>
                  <td>{p.bill === "Cash" ? <Pill tone="warning">Cash</Pill> : <Pill tone="info">Medical Aid</Pill>}</td>
                  <td className="font-mono text-xs">{p.t}</td>
                  <td>{p.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="text-sm">Total today: <span className="font-bold text-navy text-lg">1,847</span> patients across 29 branches</div>
          <div className="h-20">
            <ResponsiveContainer>
              <BarChart data={branchVol}>
                <Bar dataKey="v" fill="hsl(var(--target-red))" radius={[4,4,0,0]} />
                <XAxis dataKey="b" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Panel>
    </>
  );
}

function SystemColumn({ icon, title, rows }: { icon: React.ReactNode; title: string; rows: { l: string; s: string }[] }) {
  return (
    <Panel title={title}>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.l} className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0">
            <span className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${dot(r.s)}`} />
              {r.l}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.s}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1">{icon} {title} subsystems</div>
    </Panel>
  );
}
