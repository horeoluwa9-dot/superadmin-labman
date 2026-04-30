import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill, fmtZAR } from "@/components/shared/Toolbar";

type G = { id: string; name: string; type: string; aidNo: string; outstanding: number; lives: number };
const ROWS: G[] = [
  { id: "GU-101", name: "Anglo American Mining", type: "Corporate", aidNo: "—", outstanding: 184200, lives: 12000 },
  { id: "GU-102", name: "SA Police Service",      type: "State",    aidNo: "POLMED", outstanding: 92410, lives: 510000 },
  { id: "GU-103", name: "City of Johannesburg",   type: "Municipal", aidNo: "GEMS Onyx", outstanding: 64210, lives: 38000 },
  { id: "GU-104", name: "MTN Group",              type: "Corporate", aidNo: "Discovery Classic", outstanding: 22480, lives: 19000 },
  { id: "GU-105", name: "Self-Pay (Cash)",        type: "Individual",aidNo: "—",        outstanding: 41280, lives: 0 },
];
const cols: Column<G>[] = [
  { header: "Code", cell: r => r.id, mono: true },
  { header: "Guarantor", cell: r => <span className="font-medium">{r.name}</span> },
  { header: "Type", cell: r => <span className="pill-info text-[10px]">{r.type}</span> },
  { header: "Aid Mapping", cell: r => r.aidNo, mono: true },
  { header: "Lives", cell: r => <span className="font-mono">{r.lives.toLocaleString()}</span> },
  { header: "Outstanding", cell: r => <span className="font-mono">{fmtZAR(r.outstanding)}</span> },
];
export default function Guarantors() {
  return <EntityList kicker="Section 5 · Administration" title="Guarantors" breadcrumb={["Administration","Guarantors"]}
    primaryLabel="New Guarantor" rows={ROWS} columns={cols}
    getDrawer={r => ({
      title: r.name, subtitle: r.id,
      meta: { Type: r.type, "Aid Mapping": r.aidNo, Lives: r.lives.toLocaleString(), Outstanding: fmtZAR(r.outstanding) },
      actions: [{ label: "Edit", tone: "primary" }, { label: "View Invoices" }],
    })}
  />;
}
