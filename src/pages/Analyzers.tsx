import { useState, useMemo } from "react";
import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { KpiCard } from "@/components/shared/KpiCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { Wrench, Activity, ShieldAlert, Plug, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

type A = { name: string; model: string; sn: string; branch: string; dept: string; tests: number; status: "live"|"degraded"|"offline"; last: string; trust: number; ip: string; protocol: string; firmware: string };

const ANALYZERS: A[] = [
  { name: "Cobas 6000",     model: "c501",     sn: "CBS6K-77882", branch: "Booysens",  dept: "CHEM",  tests: 84, status: "live",     last: "12 Apr 2026", trust: 92, ip: "10.21.4.18",  protocol: "ASTM 1394", firmware: "v3.4.7" },
  { name: "Sysmex XN-1000", model: "XN-1000",  sn: "SYS-XN-44102",branch: "Pretoria",  dept: "HAEM", tests: 36, status: "degraded", last: "02 Apr 2026", trust: 67, ip: "10.22.4.10",  protocol: "HL7 v2.4",  firmware: "v2.1.0" },
  { name: "BD Phoenix",     model: "M50",      sn: "BDP-M50-882", branch: "Durban",    dept: "MICRO", tests: 28, status: "live",     last: "21 Mar 2026", trust: 88, ip: "10.24.4.4",   protocol: "HL7 v2.5",  firmware: "v1.8.2" },
  { name: "Architect i2000",model: "i2000",    sn: "ARC-i2-3301", branch: "Cape Town", dept: "CHEM",  tests: 64, status: "live",     last: "10 Apr 2026", trust: 95, ip: "10.23.4.7",   protocol: "ASTM 1394", firmware: "v4.2.1" },
  { name: "COBAS 4800",     model: "4800 PCR", sn: "CBS48-22011", branch: "JHB HQ",    dept: "VIRO",  tests: 18, status: "offline",  last: "27 Apr 2026", trust: 41, ip: "10.20.4.22",  protocol: "ASTM 1394", firmware: "v2.0.9" },
];

const trustColor = (t: number) => t >= 80 ? "text-emerald-600 bg-emerald-100" : t >= 50 ? "text-amber-700 bg-amber-100" : "text-red-700 bg-red-100";
const dot = (s: string) => s === "live" ? "bg-emerald-500" : s === "degraded" ? "bg-amber-500" : "bg-red-500 animate-pulse";

export default function Analyzers() {
  const drawer = useDrawer();
  const form = useFormDialog();
  const action = useActionDialog();
  const [pinging, setPinging] = useState<string|null>(null);
  const [fBranch, setFBranch] = useState(""); const [fDept, setFDept] = useState(""); const [fStatus, setFStatus] = useState(""); const [search, setSearch] = useState("");

  const filtered = useMemo(() => ANALYZERS.filter(a => {
    if (fBranch && a.branch !== fBranch) return false;
    if (fDept && a.dept !== fDept) return false;
    if (fStatus && a.status !== fStatus) return false;
    if (search && !`${a.name} ${a.sn} ${a.model}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [fBranch, fDept, fStatus, search]);

  const pingLis = (a: A) => {
    setPinging(a.sn);
    toast.info(`Pinging LIS bridge for ${a.name}…`, { description: `${a.protocol} → ${a.ip}` });
    setTimeout(() => {
      setPinging(null);
      if (a.status === "live") toast.success(`${a.name} · LIS connected`, { description: `RTT 84ms · last message 2s ago` });
      else if (a.status === "degraded") toast.warning(`${a.name} · intermittent`, { description: `RTT 1.8s · 12 ASTM acks dropped in last hour` });
      else toast.error(`${a.name} · LIS unreachable`, { description: `No heartbeat since ${a.last}` });
    }, 1200);
  };

  const trustHistory = (a: A) => drawer.open({
    title: `${a.name} · Trust Score Breakdown`, subtitle: `${a.sn} · ${a.branch}`,
    meta: { Current: <span className="font-bold text-lg">{a.trust}</span>, Verdict: a.trust>=80?"Trusted":a.trust>=50?"Watch":"Distrust" },
    body: (
      <div className="space-y-3">
        <div className="font-semibold text-sm">Score Components (Last 30 days)</div>
        {[
          { k: "Internal QC pass rate (Levey-Jennings)", v: a.trust>=80? "98.4%" : a.trust>=50? "91.0%" : "76.2%", w: 30 },
          { k: "EQA / PT scheme performance",            v: a.trust>=80? "100% (z<2)" : "87% (z<2)",                w: 25 },
          { k: "Calibration drift",                       v: a.trust>=80? "Within 1σ" : "Drift detected",            w: 15 },
          { k: "Result reproducibility",                  v: a.trust>=80? "0.3% CV"  : "1.8% CV",                     w: 15 },
          { k: "Maintenance compliance",                  v: a.trust>=80? "On schedule" : "1 overdue",                w: 10 },
          { k: "LIS connectivity uptime",                 v: a.status==="live"? "99.97%" : "94.1%",                    w: 5 },
        ].map(c => (
          <div key={c.k} className="flex items-center justify-between text-xs border-b border-border py-2">
            <span className="text-muted-foreground">{c.k} <span className="text-[9px] pill-muted ml-1">w{c.w}</span></span>
            <span className="font-mono font-semibold">{c.v}</span>
          </div>
        ))}
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-2 text-[10px] text-amber-800">
          ⓘ Trust scores feed Pathologist auto-validation rules. Below 70 = mandatory dual sign-off. Below 50 = result block.
        </div>
      </div>
    ),
    actions: [
      { label: "View Full Audit", tone: "primary" },
      { label: "Recalculate Now" },
      { label: "Override (Super Admin only)", tone: "danger", onClick: () => action.open({ title: "Override Trust Score", tone: "approve", requireReason: true, reasonLabel: "Justification (audited)", confirmLabel: "Apply Override" }) },
    ],
  });

  const maintenance = (a: A) => drawer.open({
    title: `${a.name} · Maintenance`, subtitle: `${a.sn} · ${a.branch}`,
    meta: { "Last Service": a.last, "Next Due": "12 May 2026", Engineer: "Roche FSE", "Service Plan": "Gold (Quarterly)" },
    body: (
      <div className="space-y-3">
        <div className="font-semibold text-sm">Service History</div>
        <ul className="space-y-1.5 text-xs">
          {[
            { d: a.last, who: "Roche FSE · Naidoo", what: "Quarterly PM · pumps cleaned, optics calibrated, firmware updated to "+a.firmware },
            { d: "12 Jan 2026", who: "Roche FSE · Naidoo", what: "Quarterly PM · sample probe replaced (P/N 04488019001)" },
            { d: "08 Oct 2025", who: "Internal · Lab Tech 04", what: "Daily/weekly tasks completed for Q4" },
          ].map((s,i) => (
            <li key={i} className="rounded-lg border border-border p-2.5">
              <div className="flex items-center justify-between"><span className="font-mono text-[10px] text-muted-foreground">{s.d}</span><span className="text-[10px] font-semibold">{s.who}</span></div>
              <p className="mt-1">{s.what}</p>
            </li>
          ))}
        </ul>
        <div className="font-semibold text-sm">Daily Tasks</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {["Probe wash","Reagent check","QC run L1/L2","Waste empty","Lamp hours","Backup data"].map(t => (
            <label key={t} className="flex items-center gap-2 p-2 rounded border border-border bg-muted/30">
              <input type="checkbox" defaultChecked={a.status==="live"} className="rounded" />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>
    ),
    actions: [
      { label: "Schedule Maintenance", tone: "primary", onClick: () => form.open({ title: `Schedule Maintenance · ${a.name}`, submitLabel: "Schedule", fields: [
        { name: "type", label: "Type", type: "select", options: ["Preventive","Corrective","Calibration","Firmware Update","EQA Run"], required: true },
        { name: "date", label: "Scheduled Date", type: "date", required: true },
        { name: "engineer", label: "Engineer / Vendor", required: true },
        { name: "downtime", label: "Expected Downtime (h)", type: "number" },
        { name: "notes", label: "Notes", type: "textarea", span: 2 },
      ] }) },
      { label: "Mark Service Complete" },
      { label: "Open Service Ticket" },
    ],
  });

  const lisConn = (a: A) => drawer.open({
    title: `${a.name} · LIS Connectivity`, subtitle: `${a.protocol} ↔ ${a.ip}`,
    meta: { Protocol: a.protocol, IP: a.ip, Firmware: a.firmware, Status: a.status, "Heartbeat": a.status==="live"?"2s ago":a.status==="degraded"?"3m ago":"3h ago" },
    body: (
      <div className="space-y-3">
        <div className="font-semibold text-sm">Last 5 Messages</div>
        <ul className="space-y-1.5 text-xs">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="rounded bg-muted/40 p-2 flex items-start gap-2">
              <span className={`mt-1 h-1.5 w-1.5 rounded-full ${i===0&&a.status!=="live"?"bg-red-500":"bg-emerald-500"}`} />
              <div className="flex-1">
                <div className="font-mono text-[10px] text-muted-foreground">14:2{i}:0{i*7%6} · OBR^^^FBC · Lab# TPL-2026-04-30-014{i}</div>
                <div className="text-[11px]">ACK received · 0 errors</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ),
    actions: [
      { label: "Restart Bridge", tone: "primary", onClick: () => action.open({ title: `Restart LIS bridge · ${a.name}`, tone: "approve", confirmLabel: "Restart", presetReasons: ["Stalled queue","Listener crash","Firmware mismatch"] }) },
      { label: "Edit Connection", onClick: () => form.open({ title: `LIS Connection · ${a.name}`, submitLabel: "Save", fields: [
        { name: "ip", label: "IP Address", required: true, defaultValue: a.ip },
        { name: "port", label: "Port", required: true, defaultValue: "5050" },
        { name: "protocol", label: "Protocol", type: "select", options: ["ASTM 1394","HL7 v2.3","HL7 v2.4","HL7 v2.5","POCT1-A2"], defaultValue: a.protocol },
        { name: "tls", label: "TLS / mTLS", type: "checkbox", defaultValue: true },
        { name: "queueDir", label: "Queue Directory", defaultValue: "/var/lis/queue", span: 2 },
      ] }) },
      { label: "Download Connection Log" },
    ],
  });

  const manage = (a: A) => drawer.open({
    title: a.name, subtitle: `${a.model} · ${a.sn} · ${a.branch}`,
    meta: { Department: a.dept, Status: a.status, "Tests Today": a.tests, Trust: a.trust+"/100", IP: a.ip, Firmware: a.firmware },
    body: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => trustHistory(a)} className="rounded-lg border border-border p-3 text-center hover:bg-muted">
            <Activity className="h-5 w-5 text-target mx-auto" />
            <div className="text-[10px] font-bold mt-1.5">TRUST SCORE</div>
            <div className="text-lg font-bold">{a.trust}</div>
          </button>
          <button onClick={() => maintenance(a)} className="rounded-lg border border-border p-3 text-center hover:bg-muted">
            <Wrench className="h-5 w-5 text-amber-600 mx-auto" />
            <div className="text-[10px] font-bold mt-1.5">MAINTENANCE</div>
            <div className="text-[10px] font-mono">{a.last}</div>
          </button>
          <button onClick={() => lisConn(a)} className="rounded-lg border border-border p-3 text-center hover:bg-muted">
            <Plug className="h-5 w-5 text-emerald-600 mx-auto" />
            <div className="text-[10px] font-bold mt-1.5">LIS CONN</div>
            <div className="text-[10px] capitalize">{a.status}</div>
          </button>
        </div>
        <div className="text-xs text-muted-foreground">Use the cards above to drill into trust score breakdown, maintenance history, or live LIS connectivity diagnostics.</div>
      </div>
    ),
    actions: [
      { label: "Run Diagnostic", tone: "primary", onClick: () => pingLis(a) },
      { label: "Pause Analyzer", tone: "danger", onClick: () => action.open({ title: `Pause ${a.name}`, tone: "reject", confirmLabel: "Pause", presetReasons: ["Maintenance","QC failure","Reagent shortage","Engineer onsite"] }) },
      { label: "Edit Profile", onClick: () => form.open({ title: `Edit · ${a.name}`, size: "lg", submitLabel: "Save", fields: [
        { name: "name", label: "Name", required: true, defaultValue: a.name },
        { name: "model", label: "Model", defaultValue: a.model },
        { name: "sn", label: "Serial #", required: true, defaultValue: a.sn },
        { name: "branch", label: "Branch", required: true, defaultValue: a.branch },
        { name: "dept", label: "Department", type: "select", options: ["CHEM","HAEM","MICRO","HISTO","VIRO","HIV"], defaultValue: a.dept },
        { name: "ip", label: "IP", defaultValue: a.ip },
        { name: "protocol", label: "Protocol", type: "select", options: ["ASTM 1394","HL7 v2.3","HL7 v2.4","HL7 v2.5","POCT1-A2"], defaultValue: a.protocol },
        { name: "firmware", label: "Firmware", defaultValue: a.firmware },
      ] }) },
    ],
  });

  return (
    <>
      <PageHeader kicker="Section 14 · LIS Governance" title="Analyzer Registry" breadcrumb={["Analyzers","Registry"]}
        actions={<button onClick={() => form.open({ title: "Register New Analyzer", size: "lg", submitLabel: "Register & Connect", fields: [
          { name: "name", label: "Name", required: true },
          { name: "model", label: "Model", required: true },
          { name: "sn", label: "Serial #", required: true },
          { name: "branch", label: "Branch", required: true },
          { name: "dept", label: "Department", type: "select", options: ["CHEM","HAEM","MICRO","HISTO","VIRO","HIV"], required: true },
          { name: "ip", label: "IP Address", required: true },
          { name: "protocol", label: "Protocol", type: "select", options: ["ASTM 1394","HL7 v2.3","HL7 v2.4","HL7 v2.5","POCT1-A2"], required: true },
          { name: "vendor", label: "Vendor", required: true },
          { name: "purchase", label: "Purchase Date", type: "date" },
          { name: "warranty", label: "Warranty Expiry", type: "date" },
        ] })} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plug className="h-3.5 w-3.5" />Register Analyzer</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Analyzers" value={ANALYZERS.length} accent="navy" />
        <KpiCard label="Live" value={ANALYZERS.filter(a=>a.status==="live").length} accent="success" />
        <KpiCard label="Avg Trust" value={Math.round(ANALYZERS.reduce((s,a)=>s+a.trust,0)/ANALYZERS.length)} accent="gold" />
        <KpiCard label="Critical (Trust < 50)" value={ANALYZERS.filter(a=>a.trust<50).length} accent="red" />
      </div>

      <Panel>
        <FilterBar
          filters={[
            { name: "branch", label: "Branches", options: ["Booysens","Pretoria","Cape Town","Durban","JHB HQ"], value: fBranch, onChange: setFBranch },
            { name: "dept",   label: "Departments", options: ["CHEM","HAEM","MICRO","HISTO","VIRO","HIV"], value: fDept, onChange: setFDept },
            { name: "status", label: "Statuses", options: ["live","degraded","offline"], value: fStatus, onChange: setFStatus },
          ]}
          search={search} onSearch={setSearch}
          onClear={() => { setFBranch(""); setFDept(""); setFStatus(""); setSearch(""); }}
        />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Analyzer</th><th>Model</th><th>Serial</th><th>Branch</th><th>Dept</th><th>Tests</th><th>Status</th><th>Last Maint.</th><th>Trust Score</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.sn}>
                  <td className="font-medium">{a.name}</td>
                  <td className="text-xs">{a.model}</td>
                  <td className="font-mono text-xs">{a.sn}</td>
                  <td>{a.branch}</td>
                  <td><span className="pill-muted">{a.dept}</span></td>
                  <td className="text-xs font-mono">{a.tests}</td>
                  <td><span className="inline-flex items-center gap-1.5 text-xs"><span className={`h-2 w-2 rounded-full ${dot(a.status)}`} />{a.status}</span></td>
                  <td className="text-xs font-mono">{a.last}</td>
                  <td>
                    <button onClick={() => trustHistory(a)} className="flex items-center gap-2 hover:bg-muted rounded p-1 -m-1">
                      <div className="relative h-9 w-9">
                        <svg className="h-9 w-9 -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                          <circle cx="18" cy="18" r="15" fill="none"
                            stroke={a.trust >= 80 ? "#10b981" : a.trust >= 50 ? "#f59e0b" : "#ef4444"}
                            strokeWidth="3" strokeDasharray={`${(a.trust/100)*94.2} 94.2`} strokeLinecap="round" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{a.trust}</span>
                      </div>
                      <span className={`pill ${trustColor(a.trust)}`}>{a.trust >= 80 ? "Trusted" : a.trust >= 50 ? "Watch" : "Distrust"}</span>
                    </button>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => manage(a)} className="text-[10px] font-semibold bg-navy text-white px-2 py-1 rounded">Manage</button>
                      <button onClick={() => maintenance(a)} title="Maintenance" className="p-1 rounded hover:bg-amber-50 hover:text-amber-700"><Wrench className="h-3.5 w-3.5" /></button>
                      <button onClick={() => pingLis(a)} title="Test LIS" disabled={pinging===a.sn} className="p-1 rounded hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50">
                        {pinging===a.sn ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plug className="h-3.5 w-3.5" />}
                      </button>
                      <button onClick={() => trustHistory(a)} title="Trust" className="p-1 rounded hover:bg-target/10 hover:text-target"><ShieldAlert className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
