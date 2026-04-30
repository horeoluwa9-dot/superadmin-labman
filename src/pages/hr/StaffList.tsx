import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { LevelPill } from "@/components/shared/Pill";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { DataToolbar, Pagination } from "@/components/shared/Toolbar";

const staff = [
  { n: "William Nettmann", email: "william@targetlab.co.za", lab: "Booysens", v: true, roles: ["Developer"], level: 5 as const },
  { n: "Yanick Kambembo", email: "yanick@targetlab.co.za", lab: "Head Office", v: true, roles: ["Administrator"], level: 4 as const },
  { n: "Sister A. Naidoo", email: "naidoo@targetlab.co.za", lab: "Booysens", v: true, roles: ["Phlebotomist"], level: 1 as const },
  { n: "J. Pieters", email: "pieters@targetlab.co.za", lab: "Booysens", v: true, roles: ["Driver"], level: 1 as const },
  { n: "mrs ida thakam", email: "ida@targetlab.co.za", lab: "Head Office", v: true, roles: ["Manager","Pathologist","Lab Tech"], level: 4 as const },
];
export default function StaffList() {
  return (
    <>
      <PageHeader kicker="Section 7A · HR" title="Staff List" breadcrumb={["HR & Staff", "Staff List"]} />
      <Panel>
        <DataToolbar primaryLabel="New User" />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Full Name</th><th>Email</th><th>Laboratory</th><th>Verified</th><th>Roles</th><th>Level</th><th>Status</th><th></th></tr></thead>
            <tbody>{staff.map((s) => (
              <tr key={s.email}>
                <td className="font-medium">{s.n}</td><td className="font-mono text-xs">{s.email}</td><td>{s.lab}</td>
                <td>{s.v && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}</td>
                <td><div className="flex flex-wrap gap-1">{s.roles.map(r=><span key={r} className="pill-info text-[10px]">{r}</span>)}</div></td>
                <td><LevelPill level={s.level} /></td>
                <td><Pill tone="success">Active</Pill></td>
                <td><ChevronRight className="h-4 w-4 text-muted-foreground" /></td>
              </tr>
            ))}</tbody>
          </table>
          <Pagination total={35} />
        </div>
      </Panel>
    </>
  );
}
