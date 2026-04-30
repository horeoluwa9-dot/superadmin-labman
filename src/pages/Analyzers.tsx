import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";

const analyzers = [
  { name: "Cobas 6000",   model: "c501",      sn: "CBS6K-77882", branch: "Booysens", dept: "CHEM",  tests: 84, status: "live",     last: "12 Apr 2026", trust: 92 },
  { name: "Sysmex XN-1000", model: "XN-1000", sn: "SYS-XN-44102", branch: "Pretoria", dept: "HAEM", tests: 36, status: "degraded", last: "02 Apr 2026", trust: 67 },
  { name: "BD Phoenix",   model: "M50",       sn: "BDP-M50-882",  branch: "Durban",  dept: "MICRO", tests: 28, status: "live",     last: "21 Mar 2026", trust: 88 },
  { name: "Architect i2000",model: "i2000",   sn: "ARC-i2-3301",  branch: "Cape Town",dept: "CHEM", tests: 64, status: "live",     last: "10 Apr 2026", trust: 95 },
  { name: "COBAS 4800",   model: "4800 PCR",  sn: "CBS48-22011",  branch: "JHB HQ",  dept: "VIRO",  tests: 18, status: "offline",  last: "27 Apr 2026", trust: 41 },
];

const trustColor = (t: number) => t >= 80 ? "text-emerald-600 bg-emerald-100" : t >= 50 ? "text-amber-700 bg-amber-100" : "text-red-700 bg-red-100";
const dot = (s: string) => s === "live" ? "bg-emerald-500" : s === "degraded" ? "bg-amber-500" : "bg-red-500 animate-pulse";

export default function Analyzers() {
  return (
    <>
      <PageHeader kicker="Section 14 · LIS Governance" title="Analyzer Registry" breadcrumb={["Analyzers", "Registry"]} />
      <Panel>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Analyzer</th><th>Model</th><th>Serial</th><th>Branch</th><th>Dept</th><th>Tests</th><th>Status</th><th>Last Maintenance</th><th>Trust Score</th><th>Actions</th></tr></thead>
            <tbody>
              {analyzers.map((a) => (
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
                    <div className="flex items-center gap-2">
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
                    </div>
                  </td>
                  <td><button className="text-xs text-target font-semibold">Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
