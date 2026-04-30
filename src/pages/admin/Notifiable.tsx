import { EntityList, Column } from "@/components/shared/EntityList";
import { Pill } from "@/components/shared/Toolbar";

type N = { id: string; disease: string; patient: string; lab: string; reportedAt: string; ndic: "Submitted"|"Pending"|"Acknowledged"; severity: "High"|"Medium"|"Low" };
const ROWS: N[] = [
  { id: "ND-7741", disease: "Tuberculosis (Pulmonary)", patient: "PAT-009931", lab: "Booysens",  reportedAt: "30/04/2026 09:14", ndic: "Submitted",   severity: "High" },
  { id: "ND-7742", disease: "Hepatitis B (Acute)",      patient: "PAT-009942", lab: "Durban",    reportedAt: "30/04/2026 11:02", ndic: "Acknowledged",severity: "High" },
  { id: "ND-7743", disease: "Measles",                  patient: "PAT-008812", lab: "Polokwane", reportedAt: "29/04/2026 16:48", ndic: "Pending",     severity: "Medium" },
  { id: "ND-7744", disease: "Typhoid Fever",            patient: "PAT-009551", lab: "Lagos",     reportedAt: "29/04/2026 14:20", ndic: "Submitted",   severity: "Medium" },
  { id: "ND-7745", disease: "Cholera (Suspected)",      patient: "PAT-009601", lab: "Harare",    reportedAt: "30/04/2026 07:50", ndic: "Pending",     severity: "High" },
  { id: "ND-7746", disease: "Mpox",                     patient: "PAT-009620", lab: "Cape Town", reportedAt: "28/04/2026 10:10", ndic: "Acknowledged",severity: "Medium" },
  { id: "ND-7747", disease: "Listeriosis",              patient: "PAT-009631", lab: "JHB HQ",    reportedAt: "27/04/2026 13:30", ndic: "Submitted",   severity: "Low" },
];
const cols: Column<N>[] = [
  { header: "Ref",         cell: r => r.id, mono: true },
  { header: "Disease",     cell: r => <span className="font-medium">{r.disease}</span> },
  { header: "Patient",     cell: r => r.patient, mono: true },
  { header: "Lab",         cell: r => r.lab },
  { header: "Reported",    cell: r => r.reportedAt, mono: true },
  { header: "NDIC Status", cell: r => <Pill tone={r.ndic==="Acknowledged"?"success":r.ndic==="Submitted"?"info":"warning"}>{r.ndic}</Pill> },
  { header: "Severity",    cell: r => <Pill tone={r.severity==="High"?"danger":r.severity==="Medium"?"warning":"muted"}>{r.severity}</Pill> },
];
export default function Notifiable() {
  return <EntityList kicker="Section 5G · Administration" title="Notifiable Diseases" breadcrumb={["Administration","Notifiable"]}
    primaryLabel="New Notification" rows={ROWS} columns={cols}
    intro="Notifiable disease reporting is an ISO/WHO requirement. All cases auto-flag from the LIS and queue for NDIC submission."
    kpis={[
      { label: "Cases (MTD)", value: ROWS.length, accent: "navy" },
      { label: "Pending NDIC", value: ROWS.filter(r=>r.ndic==="Pending").length, accent: "warn" },
      { label: "High Severity", value: ROWS.filter(r=>r.severity==="High").length, accent: "red" },
      { label: "Submission SLA", value: "94%", accent: "success" },
    ]}
    getDrawer={r => ({
      title: r.disease, subtitle: `${r.id} · ${r.patient}`,
      meta: { Lab: r.lab, Reported: r.reportedAt, "NDIC Status": r.ndic, Severity: r.severity },
      body: <p className="text-muted-foreground">Auto-flagged from LIS test results. Submission to NDIC includes patient demographics + test details under POPIA-compliant transfer.</p>,
      actions: [{ label: "Submit to NDIC", tone: "primary" }, { label: "Resend Notification" }, { label: "Audit Trail" }],
    })}
  />;
}
