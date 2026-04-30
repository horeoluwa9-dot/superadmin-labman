import { PageHeader, Panel, Pill, fmtZAR } from "@/components/shared/Toolbar";
import { KpiCard } from "@/components/shared/KpiCard";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { Award } from "lucide-react";

const REPS = [
  { name: "CARMEN ANGELICA",   branch: "Cape Town", reqs: 142, turnover: 184200, target: 200000, comm: 18420 },
  { name: "Patrick Magupya",   branch: "Head Office", reqs: 98, turnover: 142800, target: 150000, comm: 14280 },
  { name: "Ike Igbo MBA",      branch: "Durban",    reqs:  74, turnover: 92410,  target: 120000, comm:  9241 },
  { name: "Makoane Ngoasheng", branch: "KwaMhlanga",reqs: 110, turnover: 168200, target: 160000, comm: 16820 },
  { name: "mr francis ike",    branch: "Lagos",     reqs: 165, turnover: 312800, target: 280000, comm: 31280 },
];
export default function Commission() {
  const drawer = useDrawer();
  const total = REPS.reduce((s,r)=>s+r.comm,0);
  return (<>
    <PageHeader kicker="Section 6D · Sales" title="Commission Management" breadcrumb={["Sales","Commission"]} />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <KpiCard label="Commission Pool · April" value={fmtZAR(total)} accent="gold" icon={<Award className="h-4 w-4" />} />
      <KpiCard label="Reps Eligible" value={REPS.length} accent="navy" />
      <KpiCard label="Above Target" value={REPS.filter(r=>r.turnover>=r.target).length} accent="success" />
      <KpiCard label="Below Target" value={REPS.filter(r=>r.turnover<r.target).length} accent="warn" />
    </div>
    <Panel title="Rep Performance & Commission">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="data-table">
          <thead><tr><th>Rep</th><th>Branch</th><th>Reqs</th><th>Turnover</th><th>Target</th><th>% Achieved</th><th>Commission</th><th></th></tr></thead>
          <tbody>{REPS.map(r => {
            const pct = Math.round(r.turnover/r.target*100);
            return (
              <tr key={r.name} className="cursor-pointer" onClick={() => drawer.open({
                title: r.name + " — April",
                meta: { Branch: r.branch, Requisitions: r.reqs, Turnover: fmtZAR(r.turnover), Target: fmtZAR(r.target), "% Achieved": pct+"%", Commission: fmtZAR(r.comm) },
                actions: [{ label: "Approve & Pay", tone: "primary" }, { label: "Adjust" }, { label: "Withhold", tone: "danger" }],
              })}>
                <td className="font-medium">{r.name}</td>
                <td>{r.branch}</td>
                <td className="font-mono">{r.reqs}</td>
                <td className="font-mono">{fmtZAR(r.turnover)}</td>
                <td className="font-mono text-muted-foreground">{fmtZAR(r.target)}</td>
                <td><Pill tone={pct>=100?"success":pct>=80?"warning":"danger"}>{pct}%</Pill></td>
                <td className="font-mono font-semibold text-emerald-700">{fmtZAR(r.comm)}</td>
                <td></td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </Panel>
  </>);
}
