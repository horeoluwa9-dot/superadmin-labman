import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill } from "@/components/shared/Toolbar";

type A = { id: string; name: string; schemes: number; contact: string; status: "Live"|"Onboarding" };
const ROWS: A[] = [
  { id: "ADM-001", name: "Discovery Admin",      schemes: 1, contact: "ops@discovery.co.za",     status: "Live" },
  { id: "ADM-002", name: "Medscheme",            schemes: 12, contact: "labs@medscheme.com",      status: "Live" },
  { id: "ADM-003", name: "Metropolitan Health",  schemes: 4, contact: "gems@metropolitan.co.za", status: "Live" },
  { id: "ADM-004", name: "Universal Healthcare", schemes: 3, contact: "claims@universal.co.za",  status: "Live" },
  { id: "ADM-005", name: "Bonitas Admin",        schemes: 1, contact: "labs@bonitas.co.za",      status: "Live" },
  { id: "ADM-006", name: "Polmed Admin",         schemes: 1, contact: "labs@polmed.co.za",       status: "Live" },
  { id: "ADM-007", name: "PSMAS Direct",         schemes: 1, contact: "claims@psmas.co.zw",      status: "Live" },
  { id: "ADM-008", name: "AXA Direct (NG)",      schemes: 1, contact: "ops@axamansard.com",      status: "Onboarding" },
];
const cols: Column<A>[] = [
  { header: "Code",        cell: r => r.id, mono: true },
  { header: "Administrator",cell: r => <span className="font-medium">{r.name}</span> },
  { header: "Schemes",     cell: r => <span className="font-mono">{r.schemes}</span> },
  { header: "Contact",     cell: r => r.contact, mono: true },
  { header: "Status",      cell: r => <Pill tone={r.status==="Live"?"success":"warning"}>{r.status}</Pill> },
];
import { NEW_MA_ADMIN_FIELDS } from "@/lib/forms";
export default function MedicalAidAdmins() {
  return <EntityList kicker="Section 5D · Administration" title="Medical Aid Administrators" breadcrumb={["Administration","Medical Aid Admins"]}
    primaryLabel="New Administrator" formFields={NEW_MA_ADMIN_FIELDS} rows={ROWS} columns={cols}
    getDrawer={r => ({
      title: r.name, subtitle: r.id,
      meta: { Schemes: r.schemes, Contact: r.contact, Status: r.status },
      actions: [{ label: "Edit", tone: "primary" }, { label: "Open Claims Portal" }],
    })}
  />;
}
