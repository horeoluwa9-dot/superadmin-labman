import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill } from "@/components/shared/Toolbar";
import { NEW_NOTIFIABLE_SIMPLE_FIELDS } from "@/lib/forms";

type N = { id: string; icd10: string; email: string; disabled?: boolean };
const ROWS: N[] = [
  { id: "ND-1", icd10: "B24",          email: "Hiv_Diseasemanagement@discovery.co.za" },
  { id: "ND-2", icd10: "B24",          email: "hiv@gems.gov.za" },
  { id: "ND-3", icd10: "E10.1",        email: "diabeticcare@bonitas.co.za" },
  { id: "ND-4", icd10: "Disabled B24", email: "results@lifesense.co.za", disabled: true },
  { id: "ND-5", icd10: "B24",          email: "pathresults@afadm.co.za" },
];
const cols: Column<N>[] = [
  { header: "Diagnosis code", cell: r => <span className={r.disabled ? "text-muted-foreground italic" : "font-medium"}>{r.icd10}</span> },
  { header: "Email address",  cell: r => <span className="text-blue-700">{r.email}</span> },
  { header: "Status",         cell: r => r.disabled ? <Pill tone="muted">Disabled</Pill> : <Pill tone="success">Active</Pill> },
];

export default function Notifiable() {
  return <EntityList kicker="Section 5G · Administration" title="Notifiable Diseases" breadcrumb={["Administration","Notifiable Diseases","List"]}
    primaryLabel="New notifiable disease" formFields={NEW_NOTIFIABLE_SIMPLE_FIELDS} formSize="md" rows={ROWS} columns={cols}
    intro="When a lab result matches one of the diagnosis codes below, an automatic notification is sent to the listed email — used for medical-aid disease management programs and statutory NDIC reporting."
    getDrawer={r => ({
      title: r.icd10, subtitle: r.email,
      meta: { "Diagnosis code": r.icd10, "Email address": r.email, Status: r.disabled ? "Disabled" : "Active" },
      body: <p className="text-xs text-muted-foreground">Triggered when an LIS result line matches this ICD-10 code. Each send is audit-logged with a recipient hash. Disable temporarily without losing history.</p>,
      actions: [{ label: "Edit", tone: "primary" }, { label: "Send Test Email" }, { label: r.disabled ? "Enable" : "Disable", tone: "danger" }],
    })}
  />;
}
