import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill } from "@/components/shared/Toolbar";

type P = { id: string; lab: string; first: string; last: string; sex: "M"|"F"; dob: string; aid: string; aidNo: string; branch: string; visits: number };
const ROWS: P[] = [
  { id: "PAT-009921", lab: "LAB-2026-44012", first: "Thandi",  last: "Mokoena",  sex: "F", dob: "1989-04-12", aid: "Discovery",       aidNo: "1108-22-7841", branch: "Booysens", visits: 14 },
  { id: "PAT-009922", lab: "LAB-2026-44013", first: "Sipho",   last: "Dlamini",  sex: "M", dob: "1972-11-04", aid: "Bonitas",         aidNo: "0044-99-1120", branch: "JHB HQ",   visits: 9 },
  { id: "PAT-009923", lab: "LAB-2026-44014", first: "Helena",  last: "Botha",    sex: "F", dob: "1955-02-22", aid: "Cash",            aidNo: "—",            branch: "Cape Town",visits: 22 },
  { id: "PAT-009924", lab: "LAB-2026-44015", first: "Lerato",  last: "Khumalo",  sex: "F", dob: "1996-07-18", aid: "GEMS",            aidNo: "5570-11-3392", branch: "Pretoria", visits: 4 },
  { id: "PAT-009925", lab: "LAB-2026-44016", first: "Junaid",  last: "Khan",     sex: "M", dob: "1980-09-30", aid: "Fedhealth",       aidNo: "9912-44-0014", branch: "Durban",   visits: 7 },
  { id: "PAT-009926", lab: "LAB-2026-44017", first: "Adaeze",  last: "Okafor",   sex: "F", dob: "1991-12-05", aid: "AXA Mansard",     aidNo: "AXA-NG-7741", branch: "Lagos",    visits: 3 },
  { id: "PAT-009927", lab: "LAB-2026-44018", first: "Boitumelo",last:"Maimane",   sex: "F", dob: "1968-06-14", aid: "Polmed",          aidNo: "POL-1144",     branch: "Polokwane",visits: 18 },
  { id: "PAT-009928", lab: "LAB-2026-44019", first: "Tatenda", last: "Moyo",     sex: "M", dob: "1985-03-09", aid: "PSMAS",           aidNo: "PS-44712",     branch: "Harare",   visits: 6 },
];
const cols: Column<P>[] = [
  { header: "Lab #",   cell: r => r.lab, mono: true },
  { header: "Patient", cell: r => <span className="font-medium">{r.first} {r.last}</span> },
  { header: "Sex/DOB", cell: r => <span className="font-mono text-xs">{r.sex} · {r.dob}</span> },
  { header: "Medical Aid", cell: r => r.aid === "Cash" ? <span className="pill-muted text-[10px]">Cash</span> : <span className="pill-info text-[10px]">{r.aid}</span> },
  { header: "Aid #",   cell: r => r.aidNo, mono: true },
  { header: "Branch",  cell: r => r.branch },
  { header: "Visits",  cell: r => <span className="font-mono">{r.visits}</span> },
];
export default function Patients() {
  return <EntityList kicker="Section 5E · Administration" title="Patient Master" breadcrumb={["Administration","Patients"]}
    primaryLabel="New Patient" rows={ROWS} columns={cols}
    kpis={[
      { label: "Patients (active)", value: "12,481", accent: "navy" },
      { label: "New This Month", value: "342", accent: "success", sub: "+8% vs LM" },
      { label: "Cash patients", value: "31%", accent: "gold" },
      { label: "Duplicates flagged", value: "7", accent: "warn", sub: "Awaiting merge" },
    ]}
    getDrawer={r => ({
      title: `${r.first} ${r.last}`,
      subtitle: `${r.id} · Lab ${r.lab}`,
      meta: { Sex: r.sex, DOB: r.dob, "Medical Aid": r.aid, "Aid #": r.aidNo, Branch: r.branch, Visits: r.visits },
      body: <p className="text-muted-foreground">Patient profile is access-logged. Consent + POPIA scope checked on every view.</p>,
      actions: [{ label: "Open Patient File", tone: "primary" }, { label: "View Specimen Timeline" }, { label: "Merge Duplicate" }],
    })}
  />;
}
