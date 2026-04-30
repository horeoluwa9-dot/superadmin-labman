import { PageHeader, Panel, Pill, fmtZAR } from "@/components/shared/Toolbar";
import { KpiCard } from "@/components/shared/KpiCard";
import { useFormDialog } from "@/components/shared/FormDialog";
import { Users, MapPin, CalendarCheck, Banknote, TrendingUp, ShieldAlert, Truck, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { STAFF } from "@/data/staff";
import { NEW_USER_FIELDS } from "@/lib/forms";

export default function StaffOverview() {
  const form = useFormDialog();
  const total = STAFF.length;
  const clocked = STAFF.filter(s=>s.clockedIn).length;
  const susp = STAFF.filter(s=>s.status==="Suspended").length;

  return (
    <>
      <PageHeader kicker="Section 7 · Staff" title="Staff Overview" breadcrumb={["Staff","Overview"]}
        actions={<button onClick={() => form.open({ title: "New User", fields: NEW_USER_FIELDS, size: "xl", submitLabel: "Create & Send Invite" })} className="bg-target text-white text-xs font-semibold px-3.5 py-2 rounded-lg">+ New User</button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiCard label="Total Staff" value={total} accent="navy" icon={<Users className="h-4 w-4" />} />
        <KpiCard label="Clocked In Now" value={clocked} accent="success" icon={<MapPin className="h-4 w-4" />} sub="GPS verified" />
        <KpiCard label="Pending Leave" value={3} accent="warn" icon={<CalendarCheck className="h-4 w-4" />} />
        <KpiCard label="Payroll (this month)" value={fmtZAR(2840000)} accent="gold" icon={<Banknote className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="Department Breakdown">
          <ul className="space-y-2 text-sm">
            {[
              ["Pathologists",6,"info"], ["Lab Managers",4,"info"], ["Lab Technicians",5,"info"],
              ["Phlebotomists",3,"info"], ["Data Capturers",4,"info"], ["Drivers",3,"info"],
              ["Sales (Reps + Managers)",4,"info"], ["Administrators",3,"info"],
              ["Inventory Managers",1,"info"], ["Developers",4,"info"],
            ].map(([n,c,t]:any) => (
              <li key={n} className="flex justify-between border-b border-border pb-1">
                <span>{n}</span><Pill tone={t}>{c} staff</Pill>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Quick Links">
          <div className="grid grid-cols-2 gap-2">
            {[
              { to: "/staff/directory", label: "All Staff (35)", icon: Users },
              { to: "/staff/clock",     label: "Clock-In Map",   icon: MapPin },
              { to: "/staff/leave",     label: "Leave Mgmt",     icon: CalendarCheck },
              { to: "/staff/payroll",   label: "Payroll",        icon: Banknote },
              { to: "/staff/commission",label: "Commission",     icon: Award },
              { to: "/staff/drivers",   label: "Drivers & Trips",icon: Truck },
              { to: "/staff/sales",     label: "Sales Team",     icon: TrendingUp },
              { to: "/staff/discipline",label: "Disciplinary",   icon: ShieldAlert },
            ].map(({to, label, icon: Icon}) => (
              <Link key={to} to={to} className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted text-sm font-semibold text-navy">
                <Icon className="h-4 w-4 text-target" /> {label}
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Panel title="Pending Approvals (HR)">
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Sister A. Naidoo · Sick Leave</span><Pill tone="warning">3 days</Pill></li>
            <li className="flex justify-between"><span>J. Pieters · Annual Leave</span><Pill tone="warning">11 days</Pill></li>
            <li className="flex justify-between"><span>Makoane N. · Maternity</span><Pill tone="warning">92 days</Pill></li>
          </ul>
        </Panel>
        <Panel title="Disciplinary / Risk">
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>G. Rampa · Suspended</span><Pill tone="danger">Investigation</Pill></li>
            <li className="flex justify-between"><span>Polokwane · No Pathologist tomorrow</span><Pill tone="danger">Coverage gap</Pill></li>
            <li className="flex justify-between"><span>Welkom · Driver leave overlap</span><Pill tone="warning">Plan needed</Pill></li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
