import { useState } from "react";
import { PageHeader, Panel, Pill, Tabs, DataToolbar, Pagination, fmtZAR } from "@/components/shared/Toolbar";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, MessageCircleQuestion, Clock } from "lucide-react";

const items = {
  Financial: [
    { tone: "warning" as const, title: "High-value test billing requires approval", detail: "MRI Pathology panel · R 18,420 · Patient TPL-2026-04-30-0098", who: "K. Mokoena · Data Capturer · Cape Town", risk: "High", sla: "47m", consequence: "Specimen will be discarded if not actioned in 2h" },
    { tone: "warning" as const, title: "Refund request — duplicate billing", detail: "Bonitas claim refund of R 2,318.00 — Patient consented", who: "ms ntswaki maleke · Booysens", risk: "Medium", sla: "1h 14m", consequence: "Patient pending refund" },
  ],
  Clinical: [
    { tone: "info" as const, title: "Manual override on critical Hb result", detail: "Hb 4.1 g/dL flagged auto-critical — manual reissue requested", who: "Pathologist Dr. Phakathi", risk: "Critical", sla: "12m", consequence: "Doctor not notified yet" },
  ],
  Inventory: [
    { tone: "success" as const, title: "Emergency reagent order", detail: "HIV PCR kit — request 30 boxes from supplier · R 87,420", who: "Inventory Manager · Pretoria", risk: "Medium", sla: "3h 02m", consequence: "Stock-out in 4 days" },
  ],
  Access: [
    { tone: "danger" as const, title: "Privilege escalation request", detail: "Request to elevate Lab Tech (L2) → Senior Lab Tech (L3)", who: "HR Officer", risk: "High", sla: "—", consequence: "Audit-logged" },
  ],
  External: [],
};

const TABS = ["All", "Financial", "Clinical", "Inventory", "Access", "External"];

export default function Approvals() {
  const [params] = useSearchParams();
  const [active, setActive] = useState(params.get("tab")?.replace(/^./, c => c.toUpperCase()) || "All");
  const counts = Object.fromEntries(TABS.map(t => [t, t === "All"
    ? Object.values(items).flat().length
    : items[t as keyof typeof items]?.length ?? 0])) as Record<string, number>;
  const visible = active === "All"
    ? Object.entries(items).flatMap(([cat, arr]) => arr.map(i => ({ ...i, category: cat })))
    : (items[active as keyof typeof items] || []).map(i => ({ ...i, category: active }));

  const catColor = (c: string) => ({
    Financial: "bg-gradient-gold text-navy",
    Clinical: "bg-blue-100 text-blue-800",
    Inventory: "bg-emerald-100 text-emerald-800",
    Access: "bg-purple-100 text-purple-800",
    External: "bg-teal-100 text-teal-800",
  } as any)[c] || "pill-muted";

  return (
    <>
      <PageHeader
        kicker="Section 10"
        title="Approvals Hub"
        breadcrumb={["Home", "Approvals"]}
        actions={<Pill tone="warning">7 pending</Pill>}
      />
      <Panel>
        <Tabs items={TABS} active={active} onChange={setActive} counts={counts} />
        {visible.length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle2 className="h-14 w-14 mx-auto text-emerald-500 mb-3" />
            <h3 className="text-lg font-bold text-navy">All caught up</h3>
            <p className="text-sm text-muted-foreground mt-1">No pending approvals in this category.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((it, i) => (
              <article key={i} className="rounded-lg border border-border bg-white p-4 hover:shadow-card transition-shadow">
                <div className="flex flex-wrap items-start gap-3">
                  <span className={`pill ${catColor(it.category)}`}>{it.category}</span>
                  <Pill tone={it.risk === "Critical" ? "danger" : it.risk === "High" ? "warning" : "muted"}>{it.risk} risk</Pill>
                  <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> SLA {it.sla}
                  </div>
                </div>
                <h4 className="mt-2 font-semibold text-navy">{it.title}</h4>
                <p className="text-sm text-muted-foreground mt-0.5">{it.detail}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Requested by <span className="text-foreground font-medium">{it.who}</span>
                </p>
                <div className="mt-2 text-xs bg-amber-50 text-amber-900 px-3 py-1.5 rounded border border-amber-200">
                  ⚠ Consequence: {it.consequence}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </button>
                  <button className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-md">
                    <MessageCircleQuestion className="h-3.5 w-3.5" /> Clarify
                  </button>
                  <button className="ml-auto text-xs text-target font-semibold hover:text-target-dark">View Full Context →</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}
