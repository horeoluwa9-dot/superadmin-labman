import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill } from "@/components/shared/Toolbar";

type L = { id: string; name: string; source: string; rep: string; value: number; stage: "New"|"Contacted"|"Meeting"|"Negotiation"|"Converted"|"Lost"; lossReason?: string };
const ROWS: L[] = [
  { id: "LD-401", name: "Dr. A. Botha (Cape Town)",     source: "Referral",  rep: "Carmen Angelica", value: 84000,  stage: "Negotiation" },
  { id: "LD-402", name: "Dr. K. Naidoo (Pinetown)",     source: "Campaign",  rep: "Ike Igbo MBA",    value: 56000,  stage: "Meeting" },
  { id: "LD-403", name: "Linksfield Medical Centre",     source: "Manual",    rep: "Patrick Magupya", value: 142000, stage: "Contacted" },
  { id: "LD-404", name: "Dr. M. Sibisi (Polokwane)",    source: "Disease Cat",rep: "Patrick Magupya",value: 38000,  stage: "New" },
  { id: "LD-405", name: "Dr. O. Kalu (Lagos VI)",       source: "Manual",    rep: "mr francis ike",  value: 188000, stage: "Converted" },
  { id: "LD-406", name: "Dr. R. Moyo (Harare)",         source: "Import",    rep: "P. Moyo",          value: 22000,  stage: "Lost", lossReason: "Competitor" },
];
const cols: Column<L>[] = [
  { header: "Ref",   cell: r => r.id, mono: true },
  { header: "Lead",  cell: r => <span className="font-medium">{r.name}</span> },
  { header: "Source",cell: r => <span className="pill-info text-[10px]">{r.source}</span> },
  { header: "Rep",   cell: r => r.rep },
  { header: "Est. Monthly Value", cell: r => "R "+r.value.toLocaleString() },
  { header: "Stage", cell: r => <Pill tone={r.stage==="Converted"?"success":r.stage==="Lost"?"danger":r.stage==="Negotiation"?"warning":"info"}>{r.stage}</Pill> },
];
export default function Leads() {
  return <EntityList kicker="Section 6C · Sales" title="Lead Management" breadcrumb={["Sales","Leads"]}
    primaryLabel="New Lead" rows={ROWS} columns={cols}
    tabs={{ items: ["New","Contacted","Meeting","Negotiation","Converted","Lost"], getStatus: r => r.stage }}
    getDrawer={r => ({
      title: r.name, subtitle: r.id,
      meta: { Source: r.source, Rep: r.rep, Value: "R "+r.value.toLocaleString(), Stage: r.stage, ...(r.lossReason ? { "Loss Reason": r.lossReason } : {}) },
      actions: [{ label: "Move Stage →", tone: "primary" }, { label: "Mark Lost", tone: "danger" }, { label: "Reassign Rep" }],
    })}
  />;
}
