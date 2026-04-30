import { PageHeader, Panel, Pill, Tabs, Pagination } from "@/components/shared/Toolbar";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useState } from "react";
import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";
import { NEW_LEAVE_FIELDS } from "@/lib/forms";

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
  const form = useFormDialog();
  const action = useActionDialog();
  const [tab, setTab] = useState("Pending");
  const counts = REQUESTS.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] || 0) + 1 }), {} as Record<string, number>);
  const filtered = REQUESTS.filter(r => r.status === tab);

  const openNew = () => form.open({
    title: "New Leave Request",
    subtitle: "Submit a leave request — routes to line manager + HR for approval.",
    fields: NEW_LEAVE_FIELDS,
    size: "lg",
    submitLabel: "Submit Request",
    successMessage: "Leave request submitted",
  });

  return (
    <>
      <PageHeader kicker="Section 7C · HR" title="Leave Management" breadcrumb={["HR & Staff", "Leave"]}
        actions={<button onClick={openNew} className="bg-target hover:bg-target-dark text-white text-xs font-semibold px-3.5 py-2 rounded-lg">+ New Request</button>}
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
            <thead><tr><th>Ref</th><th>Staff</th><th>Branch</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td className="font-mono text-xs">{r.id}</td>
                  <td className="font-medium">{r.staff}</td>
                  <td>{r.branch}</td>
                  <td><span className="pill-info text-[10px]">{r.type}</span></td>
                  <td className="font-mono text-xs">{r.from}</td>
                  <td className="font-mono text-xs">{r.to}</td>
                  <td className="font-mono">{r.days}</td>
                  <td><Pill tone={r.status === "Approved" ? "success" : r.status === "Rejected" ? "danger" : "warning"}>{r.status}</Pill></td>
                  <td>
                    {r.status === "Pending" ? (
                      <div className="flex gap-1">
                        <button onClick={() => action.open({
                          title: `Approve ${r.id}`, subtitle: `${r.staff} · ${r.type} · ${r.days} day(s)`,
                          tone: "approve", reasonLabel: "Approval comment (optional)",
                          presetReasons: ["Coverage confirmed","Within entitlement","Manager endorsed"],
                          confirmLabel: "Approve Leave",
                        })} className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-1 rounded">Approve</button>
                        <button onClick={() => action.open({
                          title: `Reject ${r.id}`, subtitle: `${r.staff} · ${r.type} · ${r.days} day(s)`,
                          tone: "reject", requireReason: true, reasonLabel: "Reason for rejection",
                          presetReasons: ["Coverage gap","Insufficient notice","Outside entitlement","Conflicts with audit"],
                          confirmLabel: "Reject Leave",
                        })} className="text-[10px] font-semibold bg-red-600 text-white px-2 py-1 rounded">Reject</button>
                      </div>
                    ) : (
                      <button onClick={() => drawer.open({ title: r.id, meta: { Reason: r.reason, From: r.from, To: r.to } })} className="text-[10px] text-target font-semibold">View →</button>
                    )}
                  </td>
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
