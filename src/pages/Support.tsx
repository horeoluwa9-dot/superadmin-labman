import { useState, useMemo } from "react";
import { PageHeader, Panel, Pill, Tabs, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { FilterBar } from "@/components/shared/FilterBar";
import { KpiCard } from "@/components/shared/KpiCard";
import { LifeBuoy, Plus, MessageSquare, Paperclip, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

type Ticket = {
  id: string; topic: string; cat: string; prio: "Low"|"Medium"|"High"|"Critical";
  status: "Open"|"In Progress"|"Awaiting User"|"Resolved"|"Closed";
  who: string; branch: string; created: string; responded: string;
  thread: { who: string; role: "User"|"IT"|"System"; at: string; msg: string }[];
};

const TICKETS: Ticket[] = [
  { id: "TK-2026-0421", topic: "Cobas 6000 not posting results", cat: "Hardware", prio: "High", status: "In Progress",
    who: "Lab Manager · Booysens", branch: "Booysens", created: "30/04 09:14", responded: "8m",
    thread: [
      { who: "Lab Manager", role: "User", at: "30/04 09:14", msg: "Cobas 6000 stopped posting results to LIS at 09:00 SAST. ASTM channel timing out. Affecting 24 pending samples on the analyzer." },
      { who: "System",      role: "System", at: "30/04 09:14", msg: "Auto-classified Severity HIGH · Routed to: LIS Engineering · SLA response: 15min, resolution 2h." },
      { who: "Patrick (IT)",role: "IT", at: "30/04 09:22", msg: "Acknowledged. I can see the ASTM listener crashed at 08:58. Restarting the LIS connector now and re-driving queued ASTM messages from analyzer buffer. Please do NOT power-cycle the analyzer." },
      { who: "Patrick (IT)",role: "IT", at: "30/04 09:31", msg: "Connector restarted. 18/24 messages flowed in. Investigating the remaining 6 — they appear to have malformed OBX segments. Will hand-correct and post within the hour. Follow-up: I will deploy a watchdog to auto-restart the listener if heartbeat > 30s." },
    ] },
  { id: "TK-2026-0420", topic: "Login loop on Chrome v124", cat: "Login", prio: "Medium", status: "Open",
    who: "Carmen Angelica", branch: "Cape Town", created: "30/04 08:41", responded: "—",
    thread: [
      { who: "Carmen", role: "User", at: "30/04 08:41", msg: "After entering OTP, the page reloads and asks me to log in again. Cleared cache, no change. Edge works fine." },
      { who: "System", role: "System", at: "30/04 08:41", msg: "Auto-triaged: matches known issue KB-2026-018 (SameSite cookie on Chrome 124). Suggested fix attached for IT review." },
    ] },
  { id: "TK-2026-0419", topic: "MedPrax sync error 502", cat: "Integration", prio: "High", status: "Resolved",
    who: "Patrick M.", branch: "JHB HQ", created: "29/04 22:11", responded: "2m",
    thread: [
      { who: "Patrick M.", role: "User",   at: "29/04 22:11", msg: "MedPrax tariff sync failing with 502 since 22:00." },
      { who: "Sandile (IT)", role: "IT",   at: "29/04 22:13", msg: "MedPrax confirmed maintenance window. Switched to cached tariff snapshot, no billing impact. Will re-sync at 02:00." },
      { who: "Sandile (IT)", role: "IT",   at: "30/04 02:14", msg: "Sync completed (1,046 medical aid entries reconciled). Closing." },
    ] },
  { id: "TK-2026-0418", topic: "Doctor portal PDF rendering blank", cat: "Result Delivery", prio: "Critical", status: "In Progress",
    who: "Dr. F. Ike", branch: "Durban", created: "30/04 06:02", responded: "3m",
    thread: [
      { who: "Dr. F. Ike", role: "User", at: "30/04 06:02", msg: "Patient PDF results downloading as 0 KB since 5am. Need URGENT — pre-op patient." },
      { who: "Sandile (IT)", role: "IT", at: "30/04 06:05", msg: "Confirmed PDF microservice OOM at 05:48. Restarted, scaled +2 replicas. Pulling your patient's result manually now and emailing in 2 min as fallback." },
    ] },
  { id: "TK-2026-0417", topic: "New phlebotomist needs L2 access", cat: "Access", prio: "Low", status: "Awaiting User",
    who: "HR · Pretoria", branch: "Pretoria", created: "29/04 16:30", responded: "1h",
    thread: [
      { who: "HR", role: "User", at: "29/04 16:30", msg: "Please provision Labman access for new phleb (employee #4421) at L2 — Lab Floor." },
      { who: "Wisdom (IT)", role: "IT", at: "29/04 17:35", msg: "Account created (username: jdube). Awaiting POPIA acknowledgement form before activation. Form sent to new starter — please ask them to sign and reply." },
    ] },
  { id: "TK-2026-0416", topic: "Printer #3 jamming barcodes", cat: "Hardware", prio: "Medium", status: "Resolved",
    who: "Booysens Front Desk", branch: "Booysens", created: "29/04 10:10", responded: "12m",
    thread: [
      { who: "Front Desk", role: "User", at: "29/04 10:10", msg: "Zebra ZD420 keeps jamming on barcode rolls." },
      { who: "Patrick (IT)", role: "IT", at: "29/04 10:22", msg: "Cleaned print head, replaced ribbon, re-calibrated label gap. Printed 50 test labels — all clean. Ticket can be reopened if recurs in 48h." },
    ] },
];

const TABS = ["All","Open","In Progress","Awaiting User","Resolved"];
const tone = (p: string) => p === "Critical" ? "danger" : p === "High" ? "danger" : p === "Medium" ? "warning" : "muted";

const NEW_TICKET_FIELDS = [
  { name: "topic",    label: "Subject", required: true, span: 2 as const },
  { name: "category", label: "Category", type: "select" as const, options: ["Hardware","Login","Integration","Result Delivery","Access","Performance","Bug","Feature Request","Other"], required: true },
  { name: "priority", label: "Priority", type: "select" as const, options: ["Low","Medium","High","Critical"], required: true },
  { name: "branch",   label: "Branch", type: "select" as const, options: ["JHB HQ","Booysens","Pretoria","Cape Town","Durban","Polokwane","Other"], required: true },
  { name: "module",   label: "Affected Module", type: "select" as const, options: ["LIMS","Accounting","HR","Inventory","Sales","Admin","Doctor Portal","Patient Portal","Analyzer","Other"], required: true },
  { name: "details",  label: "Describe the issue", type: "textarea" as const, required: true, span: 2 as const, hint: "Steps to reproduce, expected vs actual, screenshots if any" },
  { name: "users",    label: "Number of users affected", type: "number" as const },
  { name: "downtime", label: "Service stopped?", type: "checkbox" as const, placeholder: "Yes — work cannot continue" },
  { name: "attach",   label: "Attach file(s)", type: "file" as const, span: 2 as const, hint: "Logs, screenshots, photos. PDF/PNG/JPG up to 10MB" },
];

export default function Support() {
  const form = useFormDialog();
  const drawer = useDrawer();
  const action = useActionDialog();
  const [tab, setTab] = useState("All");
  const [fPrio, setFPrio] = useState("");
  const [fCat, setFCat] = useState("");
  const [search, setSearch] = useState("");

  const counts = TICKETS.reduce((a, t) => ({ ...a, All: (a.All||0)+1, [t.status]: (a[t.status]||0)+1 }), {} as any);
  const filtered = useMemo(() => TICKETS.filter(t => {
    if (tab !== "All" && t.status !== tab) return false;
    if (fPrio && t.prio !== fPrio) return false;
    if (fCat && t.cat !== fCat) return false;
    if (search && !`${t.id} ${t.topic} ${t.who}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [tab, fPrio, fCat, search]);

  const viewTicket = (t: Ticket) => drawer.open({
    title: `${t.id} · ${t.topic}`,
    subtitle: `${t.who} · ${t.branch} · Opened ${t.created}`,
    meta: {
      Category: t.cat,
      Priority: <Pill tone={tone(t.prio) as any}>{t.prio}</Pill>,
      Status: t.status,
      "First Response SLA": "15 min",
      "Resolution SLA": t.prio === "Critical" ? "1 h" : t.prio === "High" ? "2 h" : t.prio === "Medium" ? "8 h" : "24 h",
      "Last Activity": t.responded,
    },
    body: (
      <div className="space-y-3">
        <div className="font-semibold text-navy text-sm">Conversation</div>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {t.thread.map((m, i) => (
            <div key={i} className={`rounded-lg border p-3 ${m.role==="IT" ? "border-emerald-200 bg-emerald-50/60" : m.role==="System" ? "border-amber-200 bg-amber-50/60" : "border-border bg-muted/40"}`}>
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold ${m.role==="IT" ? "text-emerald-700" : m.role==="System" ? "text-amber-700" : "text-navy"}`}>{m.who} <span className="text-muted-foreground">· {m.role}</span></span>
                <span className="text-[10px] text-muted-foreground font-mono">{m.at}</span>
              </div>
              <p className="text-xs mt-1 leading-relaxed">{m.msg}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-target/30 bg-target/5 p-3">
          <div className="text-[10px] font-bold uppercase text-target tracking-wider">Add IT Reply</div>
          <textarea rows={3} placeholder="Type a clear, audit-ready response. Include action taken, root-cause and next steps…" className="mt-2 w-full text-xs border border-border rounded p-2 bg-white" />
          <div className="flex items-center justify-between mt-2">
            <button className="text-[11px] inline-flex items-center gap-1 text-target font-semibold"><Paperclip className="h-3 w-3" />Attach</button>
            <span className="text-[10px] text-muted-foreground">Sent to user via email + in-app</span>
          </div>
        </div>
      </div>
    ),
    actions: [
      { label: "Send Reply", tone: "primary" },
      { label: "Mark Resolved", onClick: () => action.open({ title: `Resolve ${t.id}`, tone: "approve", confirmLabel: "Mark Resolved", presetReasons: ["Root cause fixed","User-side resolved","Duplicate ticket","Cannot reproduce"] }) },
      { label: "Escalate to L3" },
      { label: "Reassign" },
    ],
  });

  return (
    <>
      <PageHeader kicker="Section 16 · Support" title="IT Support Tickets" breadcrumb={["Support","All Tickets"]}
        actions={<button onClick={() => form.open({ title: "Submit IT Support Ticket", subtitle: "Help our IT team resolve this fast — be specific.", fields: NEW_TICKET_FIELDS, size: "lg", submitLabel: "Submit Ticket" })} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" />Submit Ticket</button>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Avg First Response" value="12 min" accent="success" />
        <KpiCard label="Open Tickets" value={(counts.Open||0)+(counts["In Progress"]||0)} accent="warn" />
        <KpiCard label="Resolved (week)" value={87} accent="navy" />
        <KpiCard label="SLA Breaches (30d)" value={2} accent="red" />
      </div>

      <Panel>
        <Tabs items={TABS} active={tab} onChange={setTab} counts={counts} />
        <FilterBar
          filters={[
            { name: "prio", label: "Priorities", options: ["Low","Medium","High","Critical"], value: fPrio, onChange: setFPrio },
            { name: "cat",  label: "Categories", options: ["Hardware","Login","Integration","Result Delivery","Access","Performance","Bug"], value: fCat, onChange: setFCat },
          ]}
          search={search} onSearch={setSearch}
          onClear={() => { setFPrio(""); setFCat(""); setSearch(""); }}
        />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Ticket</th><th>Topic</th><th>Category</th><th>Priority</th><th>Status</th><th>Submitted By</th><th>Branch</th><th>Last Response</th><th>Action</th></tr></thead>
            <tbody>{filtered.map(t => (
              <tr key={t.id} className="cursor-pointer" onClick={() => viewTicket(t)}>
                <td className="font-mono text-xs font-bold">{t.id}</td>
                <td className="font-medium">{t.topic}</td>
                <td><span className="pill-muted">{t.cat}</span></td>
                <td><Pill tone={tone(t.prio) as any}>{t.prio}</Pill></td>
                <td>
                  {t.status === "Resolved" ? <Pill tone="success"><CheckCircle2 className="h-2.5 w-2.5 inline mr-0.5"/>{t.status}</Pill>
                   : t.status === "In Progress" ? <Pill tone="warning"><Clock className="h-2.5 w-2.5 inline mr-0.5"/>{t.status}</Pill>
                   : t.status === "Awaiting User" ? <Pill tone="info">{t.status}</Pill>
                   : <Pill tone="info"><AlertTriangle className="h-2.5 w-2.5 inline mr-0.5"/>{t.status}</Pill>}
                </td>
                <td className="text-xs">{t.who}</td>
                <td className="text-xs">{t.branch}</td>
                <td className="text-xs font-mono">{t.responded}</td>
                <td><button onClick={(e) => { e.stopPropagation(); viewTicket(t); }} className="text-[10px] font-semibold bg-navy text-white px-2 py-1 rounded inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" />View</button></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={9} className="text-center py-8 text-muted-foreground text-xs">No tickets match your filters.</td></tr>}
            </tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
    </>
  );
}
