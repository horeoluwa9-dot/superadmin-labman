import { PageHeader, Panel, Pill, DataToolbar, Pagination, Tabs } from "@/components/shared/Toolbar";
import { LevelPill } from "@/components/shared/Pill";
import { CheckCircle2, ChevronRight, MapPin, KeyRound, UserX, Mail } from "lucide-react";
import { STAFF } from "@/data/staff";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { useState } from "react";
import { KpiCard } from "@/components/shared/KpiCard";

export default function StaffList() {
  const drawer = useDrawer();
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? STAFF : STAFF.filter(s => s.status === tab);
  const counts = { All: STAFF.length, Active: STAFF.filter(s=>s.status==="Active").length, Suspended: STAFF.filter(s=>s.status==="Suspended").length, Terminated: STAFF.filter(s=>s.status==="Terminated").length };
  const clockedNow = STAFF.filter(s => s.clockedIn).length;

  return (
    <>
      <PageHeader kicker="Section 7A · HR" title="Staff Directory — All 35" breadcrumb={["HR & Staff", "Staff List"]} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Total Staff"   value={STAFF.length} accent="navy" />
        <KpiCard label="Clocked In Now" value={clockedNow}  accent="success" sub="GPS verified" />
        <KpiCard label="Suspended"      value={counts.Suspended} accent="warn" />
        <KpiCard label="Branches Covered" value="29" accent="gold" />
      </div>
      <Panel>
        <Tabs items={["All","Active","Suspended","Terminated"]} active={tab} onChange={setTab} counts={counts as any} />
        <DataToolbar primaryLabel="New User"
          onPrimary={() => drawer.open({
            title: "New User",
            body: <p className="text-muted-foreground">Provision a new staff account. They will receive a welcome email + first-login confirmation flow.</p>,
            actions: [{ label: "Create & Send Invite", tone: "primary" }, { label: "Cancel" }],
          })}
        />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Full Name</th><th>Email</th><th>Branch</th><th>Verif.</th><th>Roles</th><th>Level</th><th>Status</th><th>Last Login</th><th>Clock</th><th></th></tr></thead>
            <tbody>{filtered.map((s) => (
              <tr key={s.email} className="cursor-pointer" onClick={() => drawer.open({
                title: s.name,
                subtitle: s.roles.join(" · ") + " · L" + s.level,
                meta: { Email: s.email, Branch: s.branch, Verified: s.verified ? "Yes" : "No", Status: s.status, "Last Login": s.lastLogin, "Clocked-In": s.clockedIn ? "Yes" : "No" },
                body: (
                  <div className="space-y-2">
                    <div className="font-semibold text-navy">Roles ({s.roles.length})</div>
                    <div className="flex flex-wrap gap-1.5">{s.roles.map(r => <span key={r} className="pill-info text-[10px]">{r}</span>)}</div>
                    <div className="font-semibold text-navy mt-3">Recent Activity</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Clocked in {s.clockedIn ? "today" : "—"} via {s.branch} GPS</li>
                      <li>• Last password change: 14/03/2026</li>
                      <li>• 2FA: Enabled</li>
                    </ul>
                  </div>
                ),
                actions: [
                  { label: "Edit Profile", tone: "primary" },
                  { label: "Reset Password" },
                  { label: "View Leave History" },
                  { label: s.status === "Suspended" ? "Reinstate" : "Suspend", tone: "danger" },
                ],
              })}>
                <td className="font-medium">{s.name}</td>
                <td className="font-mono text-xs">{s.email}</td>
                <td>{s.branch}</td>
                <td>{s.verified ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <span className="text-muted-foreground text-xs">—</span>}</td>
                <td><div className="flex flex-wrap gap-1 max-w-[200px]">{s.roles.slice(0,2).map(r=><span key={r} className="pill-info text-[10px]">{r}</span>)}{s.roles.length>2 && <span className="pill-muted text-[10px]">+{s.roles.length-2}</span>}</div></td>
                <td><LevelPill level={s.level} /></td>
                <td><Pill tone={s.status==="Active"?"success":s.status==="Suspended"?"warning":"danger"}>{s.status}</Pill></td>
                <td className="text-xs text-muted-foreground">{s.lastLogin}</td>
                <td>{s.clockedIn ? <span className="status-dot status-live" /> : <span className="status-dot status-offline" />}</td>
                <td><ChevronRight className="h-4 w-4 text-muted-foreground" /></td>
              </tr>
            ))}</tbody>
          </table>
          <Pagination total={filtered.length} />
        </div>
      </Panel>
    </>
  );
}
