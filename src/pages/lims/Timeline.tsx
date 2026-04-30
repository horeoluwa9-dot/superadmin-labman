import { PageHeader, Panel, Pill, fmtZAR } from "@/components/shared/Toolbar";
import { FileText, MapPin, ScanBarcode, FlaskConical, FileSignature, Send, BellRing, TruckIcon } from "lucide-react";

const stages = [
  { i: 1, label: "Collection", actor: "Sister Naidoo · Phlebotomist",   t: "30/04/2026 06:42",  meta: "−26.205, 28.045 · Booysens",          icon: FileText, flag: null },
  { i: 2, label: "Driver Pickup", actor: "Driver J. Pieters",            t: "30/04/2026 07:05",  meta: "Vehicle CK 09 BH GP · Trip TS-44210", icon: TruckIcon, flag: null },
  { i: 3, label: "Pre-Lab Receipt", actor: "Patrick Magupya",            t: "30/04/2026 07:38",  meta: "Barcode 8842711",                     icon: ScanBarcode, flag: null },
  { i: 4, label: "Lab Processing", actor: "ms ntswaki maleke",           t: "30/04/2026 08:12",  meta: "Cobas 6000 · WS-30/04-CHEM-014",      icon: FlaskConical, flag: null },
  { i: 5, label: "Result Entry", actor: "ms ntswaki maleke (Manual)",    t: "30/04/2026 09:04",  meta: "Manual entry · K+ 7.2",               icon: FileText, flag: "amber" },
  { i: 6, label: "Pathologist Verification", actor: "Dr. M. Phakathi",   t: "30/04/2026 09:18",  meta: "Sig MP-PATH-204",                     icon: FileSignature, flag: null },
  { i: 7, label: "Result Release", actor: "mr Patrick Magupya",          t: "30/04/2026 09:31",  meta: "Channel: Doctor Portal + SMS",        icon: Send, flag: null },
  { i: 8, label: "Doctor Notification", actor: "SMS delivered to Dr. Phakathi", t: "30/04/2026 09:32", meta: "Acknowledged 09:35", icon: BellRing, flag: null },
];

export default function SpecimenTimeline() {
  return (
    <>
      <PageHeader kicker="Section 3E · VAR Mode" title="Specimen Timeline" breadcrumb={["Laboratory", "VAR Replay"]} />
      <Panel className="mb-4">
        <div className="flex items-center gap-2">
          <input
            placeholder="Search by Lab Number, Barcode, or Patient ID"
            defaultValue="TPL-2026-04-30-0142"
            className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-target/30 font-mono"
          />
          <button className="bg-target text-white text-xs font-semibold px-4 py-2 rounded-lg">Search</button>
        </div>
      </Panel>

      <Panel title="Specimen Journey · TPL-2026-04-30-0142 · Thandiwe Mokoena">
        <ol className="relative">
          {stages.map((s, idx) => {
            const Icon = s.icon;
            const last = idx === stages.length - 1;
            return (
              <li key={s.i} className="flex gap-4 pb-6 relative">
                {!last && <span className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />}
                <div className={`h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs ${
                  s.flag === "amber" ? "bg-amber-500" : "bg-navy"
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 rounded-lg border border-border p-3 bg-white">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="font-semibold text-navy">Stage {s.i} · {s.label}</div>
                    {s.flag === "amber" && <Pill tone="warning">Manual Entry · Audit Flag</Pill>}
                  </div>
                  <div className="text-sm mt-1">{s.actor}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono flex items-center gap-1">
                    <MapPin className="h-3 w-3" />{s.meta} · {s.t}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Panel>
    </>
  );
}
