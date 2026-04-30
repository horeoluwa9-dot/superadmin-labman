import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { LifeBuoy, Plus, Paperclip } from "lucide-react";

const tickets = [
  { id: "TK-2026-0421", topic: "Cobas 6000 not posting results", cat: "Hardware", prio: "High",   status: "In Progress", who: "Lab Manager · Booysens", responded: "8m" },
  { id: "TK-2026-0420", topic: "Login loop on Chrome",          cat: "Login",    prio: "Medium", status: "Open",        who: "Carmen Angelica",        responded: "—" },
  { id: "TK-2026-0419", topic: "MedPrax sync error 502",        cat: "Sync",     prio: "High",   status: "Resolved",    who: "Patrick M.",             responded: "2m" },
];
const tone = (p: string) => p === "High" ? "danger" : p === "Medium" ? "warning" : "muted";

export default function Support() {
  return (
    <>
      <PageHeader kicker="Section 16 · Support" title="IT Support Tickets" breadcrumb={["Support", "All Tickets"]}
        actions={<button className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" />Submit Ticket</button>} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <Panel><div className="flex items-center gap-3"><LifeBuoy className="h-8 w-8 text-target" /><div><div className="text-xs text-muted-foreground">Average Response</div><div className="text-2xl font-bold text-navy">12 min</div></div></div></Panel>
        <Panel><div><div className="text-xs text-muted-foreground">Open Tickets</div><div className="text-2xl font-bold text-navy">14</div></div></Panel>
        <Panel><div><div className="text-xs text-muted-foreground">Resolved (this week)</div><div className="text-2xl font-bold text-emerald-600">87</div></div></Panel>
      </div>

      <Panel>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Ticket</th><th>Topic</th><th>Category</th><th>Priority</th><th>Status</th><th>Submitted By</th><th>Last Response</th></tr></thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td className="font-mono text-xs font-bold">{t.id}</td>
                  <td className="font-medium">{t.topic}</td>
                  <td><span className="pill-muted">{t.cat}</span></td>
                  <td><Pill tone={tone(t.prio) as any}>{t.prio}</Pill></td>
                  <td>{t.status === "Resolved" ? <Pill tone="success">{t.status}</Pill> : t.status === "In Progress" ? <Pill tone="warning">{t.status}</Pill> : <Pill tone="info">{t.status}</Pill>}</td>
                  <td className="text-xs">{t.who}</td>
                  <td className="text-xs font-mono">{t.responded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
