import { PageHeader, Panel, Pill, DataToolbar, Pagination } from "@/components/shared/Toolbar";
import { LevelPill } from "@/components/shared/Pill";
import { CheckCircle2, Settings2 } from "lucide-react";

const users = [
  { name: "William Nettmann",  email: "william@targetlab.co.za",  branch: "Booysens",   verified: true,  roles: ["Developer"],                            level: 5 as const },
  { name: "Yanick Kambembo",   email: "yanick@targetlab.co.za",   branch: "Head Office", verified: true,  roles: ["Administrator"],                        level: 4 as const },
  { name: "mr francis ike",    email: "francis@targetlab.co.za",  branch: "Lagos",      verified: true,  roles: ["Administrator","Manager","Pathologist"], level: 5 as const },
  { name: "richard yemmy",     email: "richard@targetlab.co.za",  branch: "JHB HQ",     verified: true,  roles: ["Manager"],                              level: 4 as const },
  { name: "mrs ida thakam",    email: "ida@targetlab.co.za",      branch: "Head Office", verified: true,  roles: ["Manager","Pathologist","Lab Tech"],     level: 4 as const },
  { name: "ms ntswaki maleke", email: "ntswaki@targetlab.co.za",  branch: "Booysens",   verified: true,  roles: ["Manager","Data Capturer"],              level: 3 as const },
  { name: "mr Patrick Magupya",email: "patrick@targetlab.co.za",  branch: "Head Office", verified: true,  roles: ["Manager","Data Capturer","Rep"],        level: 3 as const },
  { name: "CARMEN ANGELICA",   email: "carmen@targetlab.co.za",   branch: "Cape Town",  verified: true,  roles: ["Representative"],                       level: 2 as const },
  { name: "Ike Igbo MBA",      email: "ike@targetlab.co.za",      branch: "Durban",     verified: false, roles: ["Representative"],                       level: 2 as const },
  { name: "Makoane Ngoasheng", email: "makoane@targetlab.co.za",  branch: "KwaMhlanga", verified: true,  roles: ["Representative"],                       level: 2 as const },
];

export default function Users() {
  return (
    <>
      <PageHeader kicker="Section 8A · Authentication" title="Users" breadcrumb={["Authentication", "Users"]} />
      <Panel>
        <DataToolbar primaryLabel="New User" />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Full Name</th><th>Email</th><th>Laboratory</th><th>Verified</th><th>Roles</th><th>Access</th><th>Action</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email}>
                  <td className="font-medium">{u.name}</td>
                  <td className="font-mono text-xs">{u.email}</td>
                  <td>{u.branch}</td>
                  <td>{u.verified ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <span className="text-muted-foreground">—</span>}</td>
                  <td><div className="flex flex-wrap gap-1">{u.roles.map(r => <span key={r} className="pill-info text-[10px]">{r}</span>)}</div></td>
                  <td><LevelPill level={u.level} /></td>
                  <td><button className="p-1 hover:bg-muted rounded"><Settings2 className="h-3.5 w-3.5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={35} />
        </div>
      </Panel>
    </>
  );
}
