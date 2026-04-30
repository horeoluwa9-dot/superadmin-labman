import { PageHeader, Panel, Pill, DataToolbar, Pagination, Tabs } from "@/components/shared/Toolbar";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { useState } from "react";
import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";

const REQUESTS = [
  { id: "LV-2210", staff: "Sister A. Naidoo",   role: "Phlebotomist",  branch: "Booysens", type: "Sick",       from: "01/05/2026", to: "03/05/2026", days: 3, status: "Pending",  reason: "Flu — certificate attached" },
  { id: "LV-2211", staff: "J. Pieters",         role: "Driver",         branch: "Booysens", type: "Annual",     from: "10/05/2026", to: "20/05/2026", days: 11, status: "Pending",  reason: "Family vacation" },
  { id: "LV-2212", staff: "Carmen Angelica",    role: "Representative", branch: "Cape Town",type: "Family",     from: "02/05/2026", to: "02/05/2026", days: 1, status: "Approved", reason: "Bereavement" },
  { id: "LV-2213", staff: "mrs ida thakam",     role: "Pathologist",    branch: "Head Office", type: "Study",   from: "15/05/2026", to: "17/05/2026", days: 3, status: "Approved", reason: "ISO 15189 audit course" },
  { id: "LV-2214", staff: "Patrick Magupya",    role: "Manager",        branch: "Head Office", type: "Annual",  from: "06/05/2026", to: "12/05/2026", days: 7, status: "Rejected", reason: "Coverage gap — Booysens" },
  { id: "LV-2215", staff: "Yanick Kambembo",    role: "Administrator",  branch: "Head Office", type: "Sick",    from: "29/04/2026", to: "30/04/2026", days: 2, status: "Approved", reason: "Migraine" },
  { id: "LV-2216", staff: "Makoane Ngoasheng",  role: "Representative", branch: "KwaMhlanga",type: "Maternity",  from: "01/06/2026", to: "31/08/2026", days: 92,status: "Pending",  reason: "Statutory maternity" },
];

export default function Leave() {
  const drawer = useDrawer();
  const [tab, setTab] = useState("Pending");
  const counts = REQUESTS.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] || 0) + 1 }), {} as Record<string, number>);
  const filtered = REQUESTS.filter(r => r.status === tab);

  return (
    <>
      <PageHeader kicker="Section 7C · HR" title="Leave Management" breadcrumb={["HR & Staff", "Leave"]}
        actions={<button onClick={() => drawer.open({
          title: "New Leave Request",
          body: <p className="text-muted-foreground">Submit a leave request for any staff member. Approval routes to line manager + HR.</p>,
          actions: [{ label: "Submit", tone: "primary" }],
        })} className="bg-target text-white text-xs font-semibold px-3.5 py-2 rounded-lg">+ New Request</button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Pending" value={counts.Pending || 0} accent="warn" sub="Awaiting approval" icon={<Clock className="h-4 w-4" />} />
        <KpiCard label="Approved (MTD)" value={counts.Approved || 0} accent="success" sub="This month" icon={<CheckCircle2 className="h-4 w-4" />} />
        <KpiCard label="Rejected" value={counts.Rejected || 0} accent="red" icon={<XCircle className="h-4 w-4" />} />
        <KpiCard label="Coverage Risk" value="2" accent="warn" sub="Branches at risk" />
      </div>
      <Panel>
        <Tabs items={["Pending","Approved","Rejected"]} active={tab} onChange={setTab} counts={counts} />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Ref</th><th>Staff</th><th>Branch</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="cursor-pointer" onClick={() => drawer.open({
                  title: `${r.staff} — ${r.type} Leave`,
                  subtitle: `${r.id} · ${r.branch}`,
                  meta: { Type: r.type, From: r.from, To: r.to, Days: r.days, Role: r.role, Status: r.status },
                  body: <><div className="font-semibold text-navy">Reason</div><p className="text-muted-foreground">{r.reason}</p></>,
                  actions: r.status === "Pending"
                    ? [{ label: "Approve", tone: "primary" }, { label: "Reject", tone: "danger" }, { label: "Request Info" }]
                    : [{ label: "Reverse Decision" }],
                })}>
                  <td className="font-mono text-xs">{r.id}</td>
                  <td className="font-medium">{r.staff}</td>
                  <td>{r.branch}</td>
                  <td><span className="pill-info text-[10px]">{r.type}</span></td>
                  <td className="font-mono text-xs">{r.from}</td>
                  <td className="font-mono text-xs">{r.to}</td>
                  <td className="font-mono">{r.days}</td>
                  <td>
                    <Pill tone={r.status === "Approved" ? "success" : r.status === "Rejected" ? "danger" : "warning"}>{r.status}</Pill>
                  </td>
                  <td><Calendar className="h-3.5 w-3.5 text-muted-foreground" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
    </>
  );
}
