import { PageHeader, Panel, Pill, Tabs, Pagination, fmtZAR } from "@/components/shared/Toolbar";
import { useFormDialog, useActionDialog } from "@/components/shared/FormDialog";
import { useState, useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { useBranch } from "@/lib/branch";
import { BRANCHES } from "@/lib/nav";

const ORDERS = [
  { no: "ORD-2026-0412", patient: "T. Mokoena", branch: "Booysens", tests: 4, status: "Pending", priority: "Routine", value: 968.88, doctor: "Dr. Phakathi", created: "30/04 07:42" },
  { no: "ORD-2026-0413", patient: "S. Khumalo", branch: "Pretoria", tests: 1, status: "Confirmed", priority: "Urgent", value: 1667.50, doctor: "Dr. R. Yemmy", created: "30/04 07:51" },
  { no: "ORD-2026-0414", patient: "N. Dlamini", branch: "Cape Town", tests: 2, status: "Pending", priority: "Routine", value: 473.80, doctor: "Dr. F. Ike", created: "30/04 08:03" },
  { no: "ORD-2026-0415", patient: "P. v.d. Merwe", branch: "Booysens", tests: 2, status: "Confirmed", priority: "STAT", value: 779.70, doctor: "Dr. Phakathi", created: "30/04 08:12" },
  { no: "ORD-2026-0416", patient: "A. Nkosi", branch: "Durban", tests: 1, status: "Cancelled", priority: "Routine", value: 227.70, doctor: "Dr. I. Igbo", created: "30/04 08:18" },
];

const TABS = ["All", "Pending", "Confirmed", "Cancelled"];

export default function Orders() {
  const form = useFormDialog();
  const action = useActionDialog();
  const { branch } = useBranch();
  const [tab, setTab] = useState("All");
  const [fBranch, setFBranch] = useState("");
  const [fPriority, setFPriority] = useState("");
  const [fDoctor, setFDoctor] = useState("");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("2026-04-01");
  const [to, setTo] = useState("2026-04-30");

  const filtered = useMemo(() => ORDERS.filter(o => {
    if (branch !== "ALL" && o.branch !== branch) return false;
    if (tab !== "All" && o.status !== tab) return false;
    if (fBranch && o.branch !== fBranch) return false;
    if (fPriority && o.priority !== fPriority) return false;
    if (fDoctor && !o.doctor.includes(fDoctor)) return false;
    if (search && !`${o.patient} ${o.no} ${o.doctor}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [tab, fBranch, fPriority, fDoctor, search, branch]);

  const counts = ORDERS.reduce((a, r) => ({ ...a, All: (a.All||0)+1, [r.status]: (a[r.status]||0)+1 }), {} as any);

  return (
    <>
      <PageHeader kicker="Section 3B · LIMS" title="Orders" breadcrumb={["Laboratory","Orders"]}
        actions={<button onClick={() => form.open({ title: "Place New Order", subtitle: "Create a lab order on behalf of a doctor / patient.", fields: [
          { name: "patient", label: "Patient", required: true },
          { name: "doctor",  label: "Doctor",  required: true },
          { name: "branch",  label: "Branch",  type: "select", required: true, options: BRANCHES },
          { name: "tests",   label: "Tests Ordered", type: "multiselect", options: ["FBC","U&E","HBA1C","HIV PCR","TSH","PSA","Lipogram"], span: 2, required: true },
          { name: "priority",label: "Priority", type: "select", options: ["Routine","Urgent","STAT"], required: true },
          { name: "billing", label: "Billing", type: "select", options: ["Cash","Medical Aid","Corporate"], required: true },
          { name: "notes",   label: "Clinical Notes", type: "textarea", span: 2 },
        ], size: "lg", submitLabel: "Place Order" })} className="bg-target text-white text-xs font-semibold px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5"><ShoppingCart className="h-3.5 w-3.5" />Place Order</button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Total Orders" value={ORDERS.length} accent="navy" />
        <KpiCard label="Pending" value={counts.Pending||0} accent="warn" />
        <KpiCard label="Confirmed" value={counts.Confirmed||0} accent="success" />
        <KpiCard label="Value (today)" value={fmtZAR(ORDERS.reduce((s,r)=>s+r.value,0))} accent="gold" />
      </div>
      <Panel>
        <Tabs items={TABS} active={tab} onChange={setTab} counts={counts} />
        <FilterBar
          date={{ from, to, setFrom, setTo }}
          filters={[
            { name: "branch", label: "Branches", options: BRANCHES, value: fBranch, onChange: setFBranch },
            { name: "priority", label: "Priority", options: ["Routine","Urgent","STAT"], value: fPriority, onChange: setFPriority },
            { name: "doctor", label: "Doctors", options: ["Phakathi","R. Yemmy","F. Ike","I. Igbo"], value: fDoctor, onChange: setFDoctor },
          ]}
          search={search} onSearch={setSearch}
          onClear={() => { setFBranch(""); setFPriority(""); setFDoctor(""); setSearch(""); }}
        />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Order #</th><th>Patient</th><th>Doctor</th><th>Branch</th><th>Priority</th><th>Tests</th><th className="text-right">Value</th><th>Status</th><th>Created</th><th>Action</th></tr></thead>
            <tbody>{filtered.map(o => (
              <tr key={o.no}>
                <td className="font-mono text-xs">{o.no}</td>
                <td className="font-medium">{o.patient}</td>
                <td className="text-xs">{o.doctor}</td>
                <td>{o.branch}</td>
                <td><Pill tone={o.priority==="STAT"?"danger":o.priority==="Urgent"?"warning":"muted"}>{o.priority}</Pill></td>
                <td className="font-mono">{o.tests}</td>
                <td className="text-right font-mono text-xs">{fmtZAR(o.value)}</td>
                <td><Pill tone={o.status==="Confirmed"?"success":o.status==="Cancelled"?"danger":"warning"}>{o.status}</Pill></td>
                <td className="text-xs font-mono">{o.created}</td>
                <td>
                  {o.status === "Pending" && (
                    <button onClick={() => action.open({ title: `Confirm ${o.no}`, tone: "approve", confirmLabel: "Confirm Order" })} className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-1 rounded">Confirm</button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={10} className="text-center py-8 text-muted-foreground text-xs">No orders match your filters.</td></tr>}
            </tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
    </>
  );
}
