import { PageHeader, Panel, Pill, Pagination } from "@/components/shared/Toolbar";
import { useFormDialog } from "@/components/shared/FormDialog";
import { UserPlus } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";
import { NEW_SALES_FIELDS, NEW_USER_FIELDS } from "@/lib/forms";

const TEAM = [
  { name: "L. van der Merwe",   role: "Sales Manager", branch: "Cape Town",  doctors: 84, target: 250000, mtd: 218400, comm: 8 },
  { name: "Carmen Angelica",    role: "Sales Person",  branch: "Cape Town",  doctors: 42, target: 150000, mtd: 142200, comm: 6 },
  { name: "Patrick Magupya",    role: "Sales Person",  branch: "Head Office",doctors: 38, target: 150000, mtd: 168400, comm: 6 },
  { name: "Ike Igbo MBA",       role: "Sales Person",  branch: "Durban",     doctors: 31, target: 150000, mtd: 124800, comm: 6 },
  { name: "Makoane Ngoasheng",  role: "Sales Person",  branch: "KwaMhlanga", doctors: 27, target: 120000, mtd: 98400,  comm: 6 },
];

export default function SalesTeam() {
  const form = useFormDialog();
  return (
    <>
      <PageHeader kicker="Section 6 · Sales" title="Sales Team Management" breadcrumb={["Sales","Team"]}
        actions={
          <div className="flex gap-2">
            <button onClick={() => form.open({ title: "Create Sales User", fields: NEW_SALES_FIELDS, size: "lg", submitLabel: "Create Sales Account" })} className="bg-target text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center gap-1.5"><UserPlus className="h-3.5 w-3.5" />Create Sales Person / Manager</button>
          </div>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Sales Team" value={TEAM.length} accent="navy" />
        <KpiCard label="Doctors Covered" value={TEAM.reduce((s,r)=>s+r.doctors,0)} accent="gold" />
        <KpiCard label="Target (MTD)" value={`R ${TEAM.reduce((s,r)=>s+r.target,0).toLocaleString()}`} accent="success" />
        <KpiCard label="Achieved (MTD)" value={`R ${TEAM.reduce((s,r)=>s+r.mtd,0).toLocaleString()}`} accent="red" />
      </div>
      <Panel>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Role</th><th>Branch</th><th>Doctors</th><th>Target</th><th>MTD</th><th>%</th><th>Commission</th></tr></thead>
            <tbody>{TEAM.map(t => {
              const pct = Math.round((t.mtd/t.target)*100);
              return (
                <tr key={t.name}>
                  <td className="font-medium">{t.name}</td>
                  <td><Pill tone={t.role==="Sales Manager"?"warning":"info"}>{t.role}</Pill></td>
                  <td>{t.branch}</td>
                  <td className="font-mono">{t.doctors}</td>
                  <td className="font-mono text-xs">R {t.target.toLocaleString()}</td>
                  <td className="font-mono text-xs font-semibold">R {t.mtd.toLocaleString()}</td>
                  <td><Pill tone={pct>=100?"success":pct>=80?"warning":"danger"}>{pct}%</Pill></td>
                  <td className="font-mono">{t.comm}%</td>
                </tr>
              );
            })}</tbody>
          </table>
          <Pagination total={TEAM.length} />
        </div>
      </Panel>
    </>
  );
}
