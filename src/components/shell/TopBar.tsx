import { useState } from "react";
import { Bell, Search, ShieldAlert, ChevronDown, Power, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { BRANCHES } from "@/lib/nav";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { toast } from "sonner";

const dot = (s: "live" | "degraded" | "offline") =>
  s === "live" ? "bg-emerald-500" : s === "degraded" ? "bg-amber-500" : "bg-red-500";

const PENDING_APPROVALS = [
  { id: "AP-2041", type: "Financial", title: "High-amount test panel · R 14,200", who: "Dr. M. Pillay · Booysens", sla: "48 min" },
  { id: "AP-2042", type: "Clinical",  title: "Critical K+ 7.2 mmol/L override", who: "Lab Tech · JHB HQ", sla: "12 min" },
  { id: "AP-2043", type: "Inventory", title: "Emergency reagent reorder", who: "Inventory Mgr · Durban", sla: "4 hrs" },
  { id: "AP-2044", type: "Access",    title: "Level 3 → Level 4 elevation request", who: "Y. Kambembo", sla: "2 days" },
  { id: "AP-2045", type: "External",  title: "MedPrax tariff variance > 8%", who: "System", sla: "6 hrs" },
  { id: "AP-2046", type: "Financial", title: "Manual tariff override · R 3,450", who: "Data Capturer · Lagos", sla: "1 hr" },
  { id: "AP-2047", type: "Clinical",  title: "Re-run authorisation · Hep B", who: "Pathologist · Cape Town", sla: "30 min" },
];

const ALERTS = [
  { tone: "danger" as const, title: "Critical K+ unreleased — Patient #LAB-9921", branch: "Booysens", t: "2 min ago" },
  { tone: "warn"   as const, title: "Analyzer XN-1000 degraded — 4 invalid runs", branch: "JHB HQ",   t: "11 min ago" },
  { tone: "warn"   as const, title: "Kit depletion risk — HIV ELISA · 3 days",    branch: "Durban",   t: "28 min ago" },
  { tone: "danger" as const, title: "Suspicious manual entry pattern detected",    branch: "Lagos",    t: "1 hr ago" },
];

export function TopBar() {
  const drawer = useDrawer();
  const [branch, setBranch] = useState("ALL");
  const systems = [
    { label: "ERP",  s: "live" as const },
    { label: "LIMS", s: "live" as const },
    { label: "LIS",  s: "degraded" as const },
    { label: "APIs", s: "live" as const },
  ];
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-border h-14 flex items-center px-4 gap-4">
      <span className="pill-danger">SUPER ADMIN</span>

      <div className="hidden lg:flex items-center gap-3 pl-2 border-l border-border h-6">
        {systems.map((sys) => (
          <button
            key={sys.label}
            onClick={() => drawer.open({
              title: `${sys.label} Subsystem`,
              subtitle: `Status: ${sys.s.toUpperCase()}`,
              meta: { Uptime: "99.97% (30d)", "Active Nodes": "12 / 12", "Last Incident": "—", "P95 Latency": "84 ms" },
              body: <p className="text-muted-foreground">Drilldown into {sys.label} health. All checks reporting nominal except a degraded queue worker on LIS-NODE-03.</p>,
              actions: [{ label: "Run Health Check", tone: "primary" }, { label: "View Logs" }],
            })}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <span className={`status-dot ${dot(sys.s)}`} />
            <span className="font-medium">{sys.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search specimens, patients, users, tests, invoices…"
          onKeyDown={(e) => e.key === "Enter" && toast.info("Search executed", { description: `Querying across all 17 modules…` })}
          className="w-full bg-muted/60 hover:bg-muted focus:bg-white focus:ring-2 focus:ring-target/40 focus:outline-none border border-transparent focus:border-target/60 rounded-lg pl-9 pr-3 py-1.5 text-sm transition-colors"
        />
      </div>

      {/* Approvals popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="relative px-2 py-1 hover:bg-muted rounded-md" aria-label="Approvals">
            <span className="text-xs font-semibold text-foreground/70">Approvals</span>
            <span className="absolute -top-1 -right-1 bg-target text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">{PENDING_APPROVALS.length}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[420px] p-0">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-navy">Pending Approvals</div>
              <div className="text-[11px] text-muted-foreground">{PENDING_APPROVALS.length} awaiting your decision</div>
            </div>
            <span className="pill-danger">SLA</span>
          </div>
          <div className="max-h-[420px] overflow-y-auto divide-y divide-border">
            {PENDING_APPROVALS.map(a => (
              <button key={a.id}
                onClick={() => drawer.open({
                  title: a.title,
                  subtitle: `${a.id} · ${a.type} approval · SLA ${a.sla}`,
                  meta: { Type: a.type, Requester: a.who, "SLA Remaining": a.sla, ID: a.id },
                  body: <p className="text-muted-foreground">Approval requires Level 4+ authority. All actions are logged immutably to the ISO Evidence Vault.</p>,
                  actions: [
                    { label: "Approve", tone: "primary" },
                    { label: "Reject",  tone: "danger" },
                    { label: "Request Clarification" },
                  ],
                })}
                className="w-full text-left px-4 py-3 hover:bg-muted/40 transition-colors flex items-start gap-3">
                <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${a.type === "Clinical" ? "bg-red-500" : a.type === "Financial" ? "bg-amber-500" : "bg-blue-500"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-navy truncate">{a.title}</span>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">{a.sla}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">{a.who} · {a.id}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="px-4 py-2.5 border-t border-border bg-muted/30">
            <a href="/approvals" className="text-xs font-semibold text-target hover:underline">Open Approvals Hub →</a>
          </div>
        </PopoverContent>
      </Popover>

      {/* Alerts popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="relative p-2 hover:bg-muted rounded-md" aria-label="Alerts">
            <Bell className="h-5 w-5 text-foreground/70 animate-shake origin-top" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[380px] p-0">
          <div className="px-4 py-3 border-b border-border">
            <div className="text-sm font-bold text-navy">Critical Alerts</div>
            <div className="text-[11px] text-muted-foreground">Cannot be dismissed without action</div>
          </div>
          <div className="max-h-[380px] overflow-y-auto divide-y divide-border">
            {ALERTS.map((a, i) => (
              <div key={i} className="px-4 py-3 flex items-start gap-3">
                {a.tone === "danger"
                  ? <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  : <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-navy">{a.title}</div>
                  <div className="text-[11px] text-muted-foreground">{a.branch} · {a.t}</div>
                </div>
                <button
                  onClick={() => toast.success("Alert acknowledged", { description: a.title })}
                  className="text-[10px] font-bold text-target hover:underline shrink-0">ACK</button>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Branch selector */}
      <div className="relative">
        <select
          value={branch}
          onChange={(e) => { setBranch(e.target.value); toast.info("Branch scope changed", { description: e.target.value === "ALL" ? "All 29 branches" : e.target.value }); }}
          className="appearance-none bg-muted/60 hover:bg-muted text-xs font-medium pr-7 pl-3 py-1.5 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-target/40"
        >
          <option value="ALL">All Branches (29)</option>
          {BRANCHES.map((b) => <option key={b}>{b}</option>)}
        </select>
        <ChevronDown className="h-3.5 w-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
      </div>

      {/* Emergency mode */}
      <button
        onClick={() => drawer.open({
          title: "Emergency Mode",
          subtitle: "Restricted control — Level 5 only",
          meta: { Status: "Inactive", "Last Activated": "Never", Authorisations: "Mr. Richard / Prof", Scope: "Institution-wide" },
          body: (
            <div className="space-y-2 text-muted-foreground">
              <p>Activating Emergency Mode will: lock non-essential modules, force re-auth for all sessions, suspend external API writes, and notify all Level 4+ users.</p>
              <p className="text-red-700 font-semibold">All actions during Emergency Mode are flagged in the audit vault.</p>
            </div>
          ),
          actions: [{ label: "Activate Emergency Mode", tone: "danger" }, { label: "Cancel" }],
        })}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100">
        <ShieldAlert className="h-3.5 w-3.5" /> Emergency
      </button>

      <div className="flex items-center gap-2 pl-2 border-l border-border h-8">
        <button onClick={() => drawer.open({
          title: "Super Admin",
          subtitle: "Level 5 · Director",
          meta: { Email: "admin@targetlab.co.za", "Last Login": "Today 06:42", "2FA": "Enabled", Branch: "All (29)" },
          actions: [{ label: "View Profile", tone: "primary" }, { label: "Switch Account" }, { label: "Sign out", tone: "danger" }],
        })} className="h-8 w-8 rounded-full bg-gradient-gold flex items-center justify-center text-navy text-xs font-bold">SA</button>
        <div className="hidden md:block">
          <div className="text-xs font-semibold leading-none">Super Admin</div>
          <div className="text-[10px] text-muted-foreground">Level 5 · Director</div>
        </div>
        <button onClick={() => toast.success("Signed out", { description: "Session ended securely." })}>
          <Power className="h-4 w-4 text-muted-foreground hidden md:block" />
        </button>
      </div>
    </header>
  );
}
