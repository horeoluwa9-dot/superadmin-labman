import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill, fmtZAR } from "@/components/shared/Toolbar";

type MA = { id: string; name: string; admin: string; lives: number; outstanding: number; rejectRate: number; tariff: string };
const ROWS: MA[] = [
  { id: "MA-001", name: "Discovery Health",       admin: "Discovery Admin",   lives: 3700000, outstanding: 1842300, rejectRate: 4.1, tariff: "MedPrax 2026" },
  { id: "MA-002", name: "Bonitas",                 admin: "Bonitas Admin",      lives: 720000,  outstanding:  642100, rejectRate: 6.8, tariff: "MedPrax 2026" },
  { id: "MA-003", name: "GEMS",                    admin: "Metropolitan Health",lives: 2100000, outstanding: 1120800, rejectRate: 5.2, tariff: "GEMS A" },
  { id: "MA-004", name: "Polmed",                  admin: "Polmed Admin",       lives: 510000,  outstanding:  201400, rejectRate: 3.9, tariff: "Polmed Std" },
  { id: "MA-005", name: "Fedhealth",               admin: "Medscheme",          lives: 280000,  outstanding:  144000, rejectRate: 7.1, tariff: "MedPrax 2026" },
  { id: "MA-006", name: "Momentum",                admin: "Medscheme",          lives: 440000,  outstanding:  311900, rejectRate: 5.6, tariff: "MedPrax 2026" },
  { id: "MA-007", name: "PSMAS (Zim)",             admin: "PSMAS Direct",       lives: 850000,  outstanding:  482000, rejectRate: 8.4, tariff: "Zim PSMAS" },
  { id: "MA-008", name: "AXA Mansard (NG)",        admin: "AXA Direct",         lives: 220000,  outstanding:  198400, rejectRate: 9.1, tariff: "NG-Std" },
];
const cols: Column<MA>[] = [
  { header: "Code", cell: r => r.id, mono: true },
  { header: "Medical Aid", cell: r => <span className="font-medium">{r.name}</span> },
  { header: "Administrator", cell: r => r.admin },
  { header: "Lives",       cell: r => <span className="font-mono">{r.lives.toLocaleString()}</span> },
  { header: "Outstanding", cell: r => <span className="font-mono">{fmtZAR(r.outstanding)}</span> },
  { header: "Reject %",    cell: r => <Pill tone={r.rejectRate>7?"danger":r.rejectRate>5?"warning":"success"}>{r.rejectRate}%</Pill> },
  { header: "Tariff",      cell: r => <span className="pill-info text-[10px]">{r.tariff}</span> },
];
export default function MedicalAids() {
  return <EntityList kicker="Section 5D · Administration" title="Medical Aids" breadcrumb={["Administration","Medical Aids"]}
    primaryLabel="New Medical Aid" rows={ROWS} columns={cols}
    kpis={[
      { label: "Schemes",       value: ROWS.length, accent: "navy" },
      { label: "Total Lives",   value: (ROWS.reduce((s,r)=>s+r.lives,0)/1e6).toFixed(1)+"M", accent: "gold" },
      { label: "Outstanding (ZAR)", value: fmtZAR(ROWS.reduce((s,r)=>s+r.outstanding,0)), accent: "red" },
      { label: "Avg Reject Rate", value: (ROWS.reduce((s,r)=>s+r.rejectRate,0)/ROWS.length).toFixed(1)+"%", accent: "warn" },
    ]}
    getDrawer={r => ({
      title: r.name,
      subtitle: `${r.id} · ${r.admin}`,
      meta: { Lives: r.lives.toLocaleString(), Outstanding: fmtZAR(r.outstanding), "Reject Rate": r.rejectRate+"%", Tariff: r.tariff },
      body: <p className="text-muted-foreground">Tariff sync via MedPrax. Last sync: today 06:00. Variances over 8% trigger Super Admin approval.</p>,
      actions: [{ label: "Sync Tariffs Now", tone: "primary" }, { label: "View Claims" }, { label: "Reconciliation Report" }],
    })}
  />;
}
