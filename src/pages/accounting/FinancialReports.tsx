import { PageHeader, Panel, Pill, fmtZAR } from "@/components/shared/Toolbar";
import { Download, Lock } from "lucide-react";

const reports = [
  { name: "Financial Report",       desc: "Full P&L, revenue, costs, margins",     level: 5 },
  { name: "Financial Statement",    desc: "Balance sheet, cash flow",              level: 5 },
  { name: "Asset Register",         desc: "All assets, values, depreciation",      level: 4 },
  { name: "Daily Cash Intake",      desc: "Cash received per branch/day",          level: 4 },
  { name: "Bank Deposits",          desc: "All deposit records",                   level: 4 },
  { name: "Debt Recovery Report",   desc: "Outstanding amounts + recovery",        level: 4 },
  { name: "Petty Cash",             desc: "Per branch transactions",               level: 3 },
  { name: "Cost Reconciliation",    desc: "Test costs vs revenue",                 level: 5 },
  { name: "Leakage & Fraud Flags",  desc: "AI-flagged financial anomalies",        level: 5 },
];

export default function FinancialReports() {
  return (
    <>
      <PageHeader kicker="Section 4D · Accounting" title="Financial Reports" breadcrumb={["Accounting", "Reports"]} />
      <Panel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {reports.map((r) => (
            <div key={r.name} className="rounded-lg border border-border bg-white p-4 hover:shadow-card transition-shadow">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-navy text-sm">{r.name}</h3>
                {r.level === 5
                  ? <span className="pill-gold">👑 L5</span>
                  : <span className="pill bg-amber-100 text-amber-800">L{r.level}+</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1 min-h-[28px]">{r.desc}</p>
              <div className="mt-3 flex items-center gap-2">
                <input type="date" className="text-xs border border-border rounded px-2 py-1 flex-1" />
                <button className="text-xs font-semibold bg-navy text-white px-3 py-1.5 rounded inline-flex items-center gap-1"><Download className="h-3 w-3" />Run</button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
          <Lock className="h-3 w-3" /> All financial figures denominated in South African Rand (ZAR · {fmtZAR(0)}).
        </p>
      </Panel>
    </>
  );
}
