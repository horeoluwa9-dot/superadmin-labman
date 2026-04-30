import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { KpiCard } from "@/components/shared/KpiCard";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Mail, Send } from "lucide-react";

const ISSUES = [
  { id: "NL-2026-04", title: "April 2026 Newsletter — TB Awareness Month", sent: 2841, opened: 1742, clicked: 412, status: "Sent"     as const, date: "15/04/2026" },
  { id: "NL-2026-03", title: "March 2026 — New Tariff Updates",            sent: 2790, opened: 1611, clicked: 348, status: "Sent"     as const, date: "15/03/2026" },
  { id: "NL-2026-05", title: "May 2026 — Hep B Diagnostic Pathways",       sent:    0, opened:    0, clicked:   0, status: "Draft"    as const, date: "—" },
  { id: "NL-2026-X1", title: "Special Edition — MedPrax Integration Live", sent:    0, opened:    0, clicked:   0, status: "Scheduled"as const, date: "07/05/2026" },
];

export default function Newsletter() {
  const drawer = useDrawer();
  return (<>
    <PageHeader kicker="Section 6E · Sales" title="Newsletter (Marketing to Doctors)" breadcrumb={["Sales","Newsletter"]}
      actions={<button onClick={() => drawer.open({
        title: "New Newsletter Issue",
        body: <p className="text-muted-foreground">Build a newsletter with rich text, attachments, and per-department articles. Test send before broadcast.</p>,
        actions: [{ label: "Save Draft", tone: "primary" }, { label: "Send Test" }],
      })} className="bg-target text-white text-xs font-semibold px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> New Issue</button>}
    />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <KpiCard label="Recipients (Doctors)" value="2,841" accent="navy" />
      <KpiCard label="Avg Open Rate" value="61.3%" accent="success" delta="+3.2%" />
      <KpiCard label="Avg Click Rate" value="14.5%" accent="gold" />
      <KpiCard label="Unsubscribed (LTM)" value="42" accent="warn" />
    </div>
    <Panel title="Issues">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="data-table">
          <thead><tr><th>Issue</th><th>Title</th><th>Date</th><th>Sent</th><th>Opened</th><th>Clicked</th><th>Status</th><th></th></tr></thead>
          <tbody>{ISSUES.map(i => (
            <tr key={i.id} className="cursor-pointer" onClick={() => drawer.open({
              title: i.title, subtitle: i.id,
              meta: { Sent: i.sent, Opened: i.opened, Clicked: i.clicked, "Open Rate": i.sent? Math.round(i.opened/i.sent*100)+"%" : "—", Status: i.status, Date: i.date },
              actions: i.status === "Draft"
                ? [{ label: "Send Now", tone: "primary" }, { label: "Schedule" }, { label: "Send Test" }]
                : [{ label: "Open Report" }, { label: "Resend to Bounces" }],
            })}>
              <td className="font-mono text-xs">{i.id}</td>
              <td className="font-medium">{i.title}</td>
              <td className="font-mono text-xs">{i.date}</td>
              <td className="font-mono">{i.sent.toLocaleString()}</td>
              <td className="font-mono">{i.opened.toLocaleString()}</td>
              <td className="font-mono">{i.clicked.toLocaleString()}</td>
              <td><Pill tone={i.status==="Sent"?"success":i.status==="Scheduled"?"info":"warning"}>{i.status}</Pill></td>
              <td><Send className="h-3.5 w-3.5 text-muted-foreground" /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </Panel>
  </>);
}
