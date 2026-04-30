import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { Sparkles, Send, ChevronRight } from "lucide-react";

const observations = [
  "Branch Booysens turnover dropped 23% vs same week last month — investigate",
  "Doctor T. Naidoo referral volume decreased 40% — possible competitor switch",
  "Rep Patrick has not visited 8 assigned MAO doctors in 2 weeks",
  "Analyzer at Pretoria showing elevated re-run rate (12%) — maintenance review recommended",
  "HIV kit stock at Pretoria will deplete in estimated 4 days at current consumption rate",
  "Manual entry rate at Welkom: 34% — above 15% threshold",
];
const chips = ["Top reps this month", "Branches below target", "Pending invoices over 60 days", "Abnormal results not released"];

export default function AI() {
  return (
    <>
      <PageHeader kicker="Section 9C · Level 5 Only" title="AI Analysis" breadcrumb={["Analytics", "AI"]}
        actions={<span className="pill-gold">👑 L5</span>} />
      <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-lg text-xs mb-5">
        <strong>AI advises — AI does not decide.</strong> All AI suggestions are advisory only. Super Admin must confirm before any action is taken. Every AI query is logged in the audit trail.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <Panel title="EOD Patient Forecast"><div className="text-3xl font-bold text-navy">≈ 2,640</div><div className="text-xs text-muted-foreground mt-1">±4% confidence · based on 06:00–14:00 trend</div></Panel>
        <Panel title="Month-end Turnover Forecast"><div className="text-3xl font-bold text-navy">R 28.4M</div><div className="text-xs text-emerald-600 font-semibold mt-1">+6.4% vs target</div></Panel>
        <Panel title="Doctor Churn Risk (Top 3)">
          <ul className="text-sm space-y-1.5">
            <li className="flex justify-between"><span>Dr. T. Naidoo</span><Pill tone="danger">82%</Pill></li>
            <li className="flex justify-between"><span>Dr. K. Mokoena</span><Pill tone="warning">61%</Pill></li>
            <li className="flex justify-between"><span>Dr. P. Smith</span><Pill tone="warning">54%</Pill></li>
          </ul>
        </Panel>
      </div>

      <Panel title="AI Advisory Feed" actions={<Pill tone="info">Updated 2 min ago</Pill>} className="mb-5">
        <ul className="divide-y divide-border">
          {observations.map((o) => (
            <li key={o} className="py-3 flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-target shrink-0 mt-0.5" />
              <p className="text-sm flex-1">{o}</p>
              <button className="text-[11px] font-semibold text-muted-foreground hover:text-foreground">Dismiss</button>
              <button className="text-[11px] font-semibold text-target hover:text-target-dark inline-flex items-center">Investigate <ChevronRight className="h-3 w-3" /></button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Ask the AI">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {chips.map((c) => <button key={c} className="pill-muted hover:bg-muted">{c}</button>)}
        </div>
        <div className="flex gap-2">
          <input placeholder="Ask anything — e.g. Which doctor had highest turnover in March at Durban?" className="flex-1 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-target/30" />
          <button className="bg-target hover:bg-target-dark text-white px-4 rounded-lg inline-flex items-center gap-1.5 text-sm font-semibold"><Send className="h-4 w-4" />Ask</button>
        </div>
      </Panel>
    </>
  );
}
