import { PageHeader, Panel, Pill } from "@/components/shared/Toolbar";
import { MapPin, User } from "lucide-react";

const staff = [
  { n: "Sister A. Naidoo", role: "Phlebotomist", branch: "Booysens", time: "06:42", status: "in",  ip: "196.42.x.x" },
  { n: "J. Pieters",        role: "Driver",     branch: "Booysens", time: "07:05", status: "in",  ip: "196.42.x.x" },
  { n: "ms ntswaki maleke", role: "Data Capturer", branch: "Booysens", time: "07:38", status: "in", ip: "196.42.x.x" },
  { n: "Lab Tech 04",       role: "Lab Tech",   branch: "Pretoria", time: "08:01", status: "out-geo", ip: "41.21.x.x" },
  { n: "Lab Tech 12",       role: "Lab Tech",   branch: "Cape Town", time: "—",     status: "leave", ip: "—" },
];
const dot = (s: string) => s === "in" ? "bg-emerald-500" : s === "out-geo" ? "bg-amber-500" : "bg-slate-400";

export default function ClockInMap() {
  return (
    <>
      <PageHeader kicker="Section 7B · HR" title="Geospatial Clock-In Map" breadcrumb={["HR & Staff", "Clock-In Map"]} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel className="lg:col-span-2 !p-0 overflow-hidden">
          <div className="relative h-[480px] bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            {[
              { x: "30%", y: "40%", c: "bg-emerald-500", l: "Booysens · 4 staff" },
              { x: "55%", y: "32%", c: "bg-emerald-500", l: "JHB HQ · 8 staff" },
              { x: "62%", y: "28%", c: "bg-amber-500",   l: "Pretoria · 1 anomaly" },
              { x: "20%", y: "75%", c: "bg-emerald-500", l: "Cape Town · 6 staff" },
              { x: "75%", y: "60%", c: "bg-emerald-500", l: "Durban · 5 staff" },
              { x: "80%", y: "20%", c: "bg-red-500",     l: "Lagos · login anomaly" },
            ].map((p, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.x, top: p.y }}>
                <div className={`h-4 w-4 rounded-full ${p.c} ring-4 ring-white shadow-pop`} />
                <div className="absolute left-5 top-0 bg-white text-[10px] px-1.5 py-0.5 rounded shadow border border-border whitespace-nowrap">{p.l}</div>
              </div>
            ))}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur rounded-lg p-2 text-[11px] flex gap-3">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" />In geofence</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" />Outside</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" />Anomaly</span>
            </div>
          </div>
        </Panel>
        <Panel title="Currently Clocked In">
          <ul className="space-y-2">
            {staff.map((s) => (
              <li key={s.n} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/60 border border-border">
                <span className={`h-2 w-2 rounded-full ${dot(s.status)}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.n}</div>
                  <div className="text-[11px] text-muted-foreground">{s.role} · {s.branch} · {s.time}</div>
                </div>
                {s.status === "out-geo" && <Pill tone="warning">Outside</Pill>}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
