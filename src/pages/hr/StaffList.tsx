import { PageHeader, Panel, Pill, DataToolbar, Pagination, Tabs } from "@/components/shared/Toolbar";
import { LevelPill } from "@/components/shared/Pill";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { STAFF } from "@/data/staff";
import { useDrawer } from "@/components/shared/DetailDrawer";
import { useFormDialog } from "@/components/shared/FormDialog";
import { useState, useMemo } from "react";
import { KpiCard } from "@/components/shared/KpiCard";
import { NEW_USER_FIELDS, DEPARTMENTS } from "@/lib/forms";

export default function StaffList() {
  const drawer = useDrawer();
  const form = useFormDialog();
  const [tab, setTab] = useState("All");
  const [dept, setDept] = useState<string>("All");
  const [branch, setBranch] = useState<string>("All");
  const [q, setQ] = useState("");

  const branches = useMemo(() => Array.from(new Set(STAFF.map(s => s.branch))).sort(), []);

  const filtered = useMemo(() => STAFF.filter(s => {
    if (tab !== "All" && s.status !== tab) return false;
    if (dept !== "All" && !s.roles.some(r => r.toLowerCase().includes(dept.toLowerCase().split(" ")[0]))) return false;
    if (branch !== "All" && s.branch !== branch) return false;
    if (q && !(`${s.name} ${s.email} ${s.roles.join(" ")}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  }), [tab, dept, branch, q]);

  const counts = { All: STAFF.length, Active: STAFF.filter(s=>s.status==="Active").length, Suspended: STAFF.filter(s=>s.status==="Suspended").length, Terminated: STAFF.filter(s=>s.status==="Terminated").length };
  const clockedNow = STAFF.filter(s => s.clockedIn).length;

  const openNewUser = () => form.open({
    title: "New User / Staff Account",
    subtitle: "Provision a new staff member with role, level, branch and access.",
    fields: NEW_USER_FIELDS,
    size: "xl",
    submitLabel: "Create & Send Welcome Email",
    successMessage: "Staff account created — welcome email sent",
  });

  return (
    <>
      <PageHeader kicker="Section 7A · HR" title="Staff Directory — All 35" breadcrumb={["HR & Staff", "Staff List"]}
        actions={<button onClick={openNewUser} className="bg-target text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm">+ New User</button>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Total Staff"   value={STAFF.length} accent="navy" />
        <KpiCard label="Clocked In Now" value={clockedNow}  accent="success" sub="GPS verified" />
        <KpiCard label="Suspended"      value={counts.Suspended} accent="warn" />
        <KpiCard label="Branches Covered" value={branches.length} accent="gold" />
      </div>
      <Panel>
        <Tabs items={["All","Active","Suspended","Terminated"]} active={tab} onChange={setTab} counts={counts as any} />

        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button onClick={openNewUser} className="bg-target hover:bg-target-dark text-white text-xs font-semibold px-3.5 py-2 rounded-lg">+ New User</button>
          <select value={dept} onChange={e => setDept(e.target.value)} className="border border-border rounded-md px-3 py-2 text-xs bg-white">
            <option value="All">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={branch} onChange={e => setBranch(e.target.value)} className="border border-border rounded-md px-3 py-2 text-xs bg-white">
            <option value="All">All Branches</option>
            {branches.map(b => <option key={b}>{b}</option>)}
          </select>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, email, role…" className="ml-auto border border-border rounded-md px-3 py-2 text-xs w-64" />
          <span className="text-xs text-muted-foreground">{filtered.length} of {STAFF.length}</span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="data-table">
            <thead><tr><th>Full Name</th><th>Email</th><th>Branch</th><th>Verif.</th><th>Roles / Department</th><th>Level</th><th>Status</th><th>Last Login</th><th>Clock</th><th></th></tr></thead>
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
                <td><div className="flex flex-wrap gap-1 max-w-[220px]">{s.roles.slice(0,2).map(r=><span key={r} className="pill-info text-[10px]">{r}</span>)}{s.roles.length>2 && <span className="pill-muted text-[10px]">+{s.roles.length-2}</span>}</div></td>
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
