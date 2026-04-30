import { PageHeader, Panel, Pill, fmtZAR, Tabs } from "@/components/shared/Toolbar";
import { KpiCard } from "@/components/shared/KpiCard";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { useState } from "react";
import { Receipt, Image as ImageIcon } from "lucide-react";

const CLAIMS = [
  { id: "EX-3401", staff: "CARMEN ANGELICA", branch: "Cape Town", date: "29/04/2026", cat: "Fuel",          amt:  840,  status: "Pending"  as const, desc: "Doctor visits — Bellville route" },
  { id: "EX-3402", staff: "Patrick Magupya", branch: "Head Office",date: "28/04/2026", cat: "Accommodation",amt: 2200,  status: "Approved" as const, desc: "Polokwane site review · 1 night" },
  { id: "EX-3403", staff: "J. Pieters",      branch: "Booysens", date: "30/04/2026", cat: "Fuel",          amt:  690,  status: "Pending"  as const, desc: "Morning specimen run" },
  { id: "EX-3404", staff: "Yanick Kambembo", branch: "Head Office",date: "27/04/2026", cat: "Meals",        amt:  410,  status: "Paid"     as const, desc: "Tech vendor lunch · MedPrax" },
  { id: "EX-3405", staff: "Makoane N.",      branch: "KwaMhlanga", date: "29/04/2026", cat: "Transport",    amt: 1280,  status: "Rejected" as const, desc: "Personal vehicle · no receipt" },
  { id: "EX-3406", staff: "Ike Igbo MBA",    branch: "Durban",   date: "30/04/2026", cat: "Fuel",          amt: 1100,  status: "Pending"  as const, desc: "Doctor visits · Pinetown + Westville" },
];

export default function Expenses() {
  const drawer = useDrawer();
  const [tab, setTab] = useState("Pending");
  const counts = CLAIMS.reduce((a, c) => ({ ...a, [c.status]: (a[c.status] || 0) + 1 }), {} as Record<string, number>);
  const filtered = CLAIMS.filter(c => c.status === tab);
  const totalMonth = CLAIMS.reduce((s, c) => s + c.amt, 0);

  return (
    <>
      <PageHeader kicker="Section 7E · HR" title="Expense Claims" breadcrumb={["HR & Staff", "Expenses"]} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Pending Approval" value={counts.Pending || 0} accent="warn" />
        <KpiCard label="Total · April"    value={fmtZAR(totalMonth)} accent="navy" icon={<Receipt className="h-4 w-4" />} />
        <KpiCard label="Outliers Flagged" value="1" accent="red" sub="Above 2σ pattern" />
        <KpiCard label="Avg Turnaround"   value="2.1 days" accent="success" />
      </div>
      <Panel>
        <Tabs items={["Pending","Approved","Paid","Rejected"]} active={tab} onChange={setTab} counts={counts} />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Ref</th><th>Staff</th><th>Branch</th><th>Date</th><th>Category</th><th>Amount</th><th>Status</th><th></th></tr></thead>
            <tbody>{filtered.map(c => (
              <tr key={c.id} className="cursor-pointer" onClick={() => drawer.open({
                title: `${c.cat} Claim · ${c.id}`,
                subtitle: `${c.staff} · ${c.branch}`,
                meta: { Date: c.date, Category: c.cat, Amount: fmtZAR(c.amt), Status: c.status },
                body: <>
                  <div className="font-semibold text-navy">Description</div>
                  <p className="text-muted-foreground">{c.desc}</p>
                  <div className="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-40" />Receipt attachment preview
                  </div>
                </>,
                actions: c.status === "Pending"
                  ? [{ label: "Approve & Pay", tone: "primary" }, { label: "Reject", tone: "danger" }, { label: "Query" }]
                  : c.status === "Approved" ? [{ label: "Mark Paid", tone: "primary" }] : [{ label: "Re-open" }],
              })}>
                <td className="font-mono text-xs">{c.id}</td>
                <td className="font-medium">{c.staff}</td>
                <td>{c.branch}</td>
                <td className="font-mono text-xs">{c.date}</td>
                <td><span className="pill-info text-[10px]">{c.cat}</span></td>
                <td className="font-mono">{fmtZAR(c.amt)}</td>
                <td><Pill tone={c.status === "Paid" ? "success" : c.status === "Approved" ? "info" : c.status === "Rejected" ? "danger" : "warning"}>{c.status}</Pill></td>
                <td><Receipt className="h-3.5 w-3.5 text-muted-foreground" /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
