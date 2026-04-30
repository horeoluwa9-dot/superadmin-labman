import { Bell, Search, ShieldAlert, ChevronDown, Power } from "lucide-react";
import { BRANCHES } from "@/lib/nav";

const dot = (s: "live" | "degraded" | "offline") =>
  s === "live" ? "bg-emerald-500" : s === "degraded" ? "bg-amber-500" : "bg-red-500";

export function TopBar() {
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
          <button key={sys.label} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
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
          className="w-full bg-muted/60 hover:bg-muted focus:bg-white focus:ring-2 focus:ring-target/40 focus:outline-none border border-transparent focus:border-target/60 rounded-lg pl-9 pr-3 py-1.5 text-sm transition-colors"
        />
      </div>

      <button className="relative p-2 hover:bg-muted rounded-md" aria-label="Approvals">
        <span className="text-xs font-semibold text-foreground/70">Approvals</span>
        <span className="absolute -top-1 -right-1 bg-target text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">7</span>
      </button>

      <button className="relative p-2 hover:bg-muted rounded-md" aria-label="Alerts">
        <Bell className="h-5 w-5 text-foreground/70 animate-shake origin-top" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
      </button>

      <div className="relative">
        <select
          defaultValue="ALL"
          className="appearance-none bg-muted/60 hover:bg-muted text-xs font-medium pr-7 pl-3 py-1.5 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-target/40"
        >
          <option value="ALL">All Branches (29)</option>
          {BRANCHES.map((b) => <option key={b}>{b}</option>)}
        </select>
        <ChevronDown className="h-3.5 w-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
      </div>

      <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100">
        <ShieldAlert className="h-3.5 w-3.5" /> Emergency
      </button>

      <div className="flex items-center gap-2 pl-2 border-l border-border h-8">
        <div className="h-8 w-8 rounded-full bg-gradient-gold flex items-center justify-center text-navy text-xs font-bold">SA</div>
        <div className="hidden md:block">
          <div className="text-xs font-semibold leading-none">Super Admin</div>
          <div className="text-[10px] text-muted-foreground">Level 5 · Director</div>
        </div>
        <Power className="h-4 w-4 text-muted-foreground hidden md:block" />
      </div>
    </header>
  );
}
